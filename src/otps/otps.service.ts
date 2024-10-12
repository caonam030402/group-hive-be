import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { OtpRepository } from './infrastructure/persistence/otp.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Otp } from './domain/otp';
import dayjs from 'dayjs';

@Injectable()
export class OtpsService {
  constructor(private readonly otpRepository: OtpRepository) {}

  async create(createOtpDto: CreateOtpDto) {
    const findUser = await this.otpRepository.findByUser(createOtpDto.user);
    const codeGenerator = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = dayjs().add(createOtpDto.expiresTime, 'second').toDate();

    if (!findUser) {
      await this.otpRepository.create({
        ...createOtpDto,
        code: codeGenerator,
        expiresAt,
      });
      return {
        expiresAt,
      };
    }

    await this.update(findUser.id, {
      code: codeGenerator,
      expiresAt,
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
