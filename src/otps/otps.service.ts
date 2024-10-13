import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { OtpRepository } from './infrastructure/persistence/otp.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Otp } from './domain/otp';
import dayjs from 'dayjs';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OtpsService {
  constructor(
    private readonly otpRepository: OtpRepository,
    private MailService: MailService,
  ) {}

  async create(createOtpDto: CreateOtpDto) {
    const findUser = await this.otpRepository.findByUser(createOtpDto.user);
    const codeGenerator = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = dayjs().add(createOtpDto.expiresTime, 'second').toDate();

    if (!findUser?.id) {
      throw new BadRequestException({
        message: 'User not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    if (!findUser) {
      await this.otpRepository.create({
        ...createOtpDto,
        code: codeGenerator,
        expiresAt,
      });
    } else {
      await this.update(findUser!.id, {
        code: codeGenerator,
        expiresAt,
      });
    }

    await this.MailService.confirmOtp({
      to: findUser?.user.email || '',
      data: {
        code: codeGenerator,
        email: findUser?.user.email || '',
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
}
