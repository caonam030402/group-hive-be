import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OtpsService } from './otps.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Otp } from './domain/otp';

import { FindAllOtpsDto } from './dto/find-all-otps.dto';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../utils/infinity-pagination';

@ApiTags('Otps')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'otps',
  version: '1',
})
export class OtpsController {
  constructor(private readonly otpsService: OtpsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Otp,
  })
  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpsService.create(createOtpDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Otp),
  })
  async findAll(
    @Query() query: FindAllOtpsDto,
  ): Promise<InfinityPaginationResponseDto<Otp>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.otpsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Otp,
  })
  findOne(@Param('id') id: string) {
    return this.otpsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Otp,
  })
  update(@Param('id') id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpsService.update(id, updateOtpDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.otpsService.remove(id);
  }
}
