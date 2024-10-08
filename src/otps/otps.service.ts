import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { OtpRepository } from './infrastructure/persistence/otp.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Otp } from './domain/otp';

@Injectable()
export class OtpsService {
  constructor(private readonly otpRepository: OtpRepository) {}

  create(createOtpDto: CreateOtpDto) {
    return this.otpRepository.create(createOtpDto);
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
