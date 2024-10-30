import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpEntity } from '../entities/otp.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Otp } from '../../../../domain/otp';
import { OtpRepository } from '../../otp.repository';
import { OtpMapper } from '../mappers/otp.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OtpRelationalRepository implements OtpRepository {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
  ) {}

  async create(data: Otp): Promise<Otp> {
    const persistenceModel = OtpMapper.toPersistence(data);
    const newEntity = await this.otpRepository.save(
      this.otpRepository.create(persistenceModel),
    );
    return OtpMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Otp[]> {
    const entities = await this.otpRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OtpMapper.toDomain(entity));
  }

  async findById(id: Otp['id']): Promise<NullableType<Otp>> {
    const entity = await this.otpRepository.findOne({
      where: { id },
    });

    return entity ? OtpMapper.toDomain(entity) : null;
  }

  async findByUser(user: Otp['user']): Promise<NullableType<Otp>> {
    const entity = await this.otpRepository.findOne({
      where: { user: { id: user.id } },
    });

    return entity ? OtpMapper.toDomain(entity) : null;
  }

  async update(id: Otp['id'], payload: Partial<Otp>): Promise<Otp> {
    const entity = await this.otpRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.otpRepository.save(
      this.otpRepository.create(
        OtpMapper.toPersistence({
          ...OtpMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OtpMapper.toDomain(updatedEntity);
  }

  async remove(id: Otp['id']): Promise<void> {
    await this.otpRepository.delete(id);
  }
}
