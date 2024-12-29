import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { OtpRepository } from './infrastructure/persistence/otp.repository';
import { Otp } from './domain/otp';
import dayjs from 'dayjs';
import { MailService } from '../mail/mail.service';
import { ConfirmOtpDto } from './dto/confirm-otp';
import { IPaginationOptions } from '../../utils/types/pagination-options';

@Injectable()
export class OtpsService {
  constructor(
    private readonly otpRepository: OtpRepository,
    private MailService: MailService,
  ) {}

  async create(createOtpDto: CreateOtpDto, _isNew: boolean = false) {
    const findUser = await this.otpRepository.findByUser(createOtpDto.user);
    const codeGenerator = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = dayjs().add(createOtpDto.expiresTime, 'second').toDate();
    const numberOfSubmissions = findUser?.numberOfSubmissions || 0 + 1;
    if (numberOfSubmissions > 5) {
      throw new BadRequestException({
        message: 'Too many requests try again in 5 min',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    if (!findUser?.id && !_isNew) {
      throw new BadRequestException({
        message: 'User not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    if (!findUser && _isNew) {
      await this.otpRepository.create({
        ...createOtpDto,
        code: codeGenerator,
        expiresAt,
        numberOfSubmissions,
      });
    } else {
      await this.update(findUser!.id, {
        code: codeGenerator,
        expiresAt,
        numberOfSubmissions,
      });
    }

    await this.MailService.confirmOtp({
      to: findUser?.user.email || createOtpDto.user.email || '',
      data: {
        code: codeGenerator,
        email: findUser?.user.email || createOtpDto.user.email || '',
        expires: createOtpDto.expiresTime,
      },
    });

    return {
      expiresAt,
    };
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.otpRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Otp['id']) {
    return this.otpRepository.findById(id);
  }

  update(id: Otp['id'], updateOtpDto: UpdateOtpDto) {
    return this.otpRepository.update(id, updateOtpDto);
  }

  remove(id: Otp['id']) {
    return this.otpRepository.remove(id);
  }

  async confirm(confirmOtpDto: ConfirmOtpDto) {
    const findUser = await this.otpRepository.findByUser(confirmOtpDto.user);
    console.log(confirmOtpDto);
    if (!findUser) {
      throw new BadRequestException({
        message: 'User not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    if (findUser.code !== confirmOtpDto.code) {
      throw new BadRequestException({
        message: 'Invalid code',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    if (findUser.expiresAt <= dayjs().toDate()) {
      throw new BadRequestException({
        message: 'Code expired',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return {
      user: findUser.user,
    };
  }
}
