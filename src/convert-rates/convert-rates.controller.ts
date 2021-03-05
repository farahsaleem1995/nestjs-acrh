import { Controller, Get, Post } from '@nestjs/common';
import {
	GetById,
	InjectService,
	MapArrayResponse,
	MapResponse,
	ValidateBody,
} from 'src/common/decorators';
import { Service } from 'src/common/services';
import { ConvertRateDto } from './dtos';
import { CreateConvertRateDto } from './dtos/create-convert-rate.dto';
import { ConvertRate } from './models';
import { CreateConvertRatePipe } from './pipes';

@Controller('convert-rates')
export class ConvertRatesController {
	constructor(
		@InjectService(ConvertRate) private readonly convertRatesService: Service<ConvertRate>,
	) {}

	@Get()
	@MapArrayResponse(ConvertRateDto, ConvertRate)
	async getAll(): Promise<ConvertRate[]> {
		return this.convertRatesService.getAll({});
	}

	@Post()
	@MapResponse(ConvertRateDto, ConvertRate)
	async create(
		@ValidateBody(CreateConvertRateDto, CreateConvertRatePipe) createDto: CreateConvertRateDto,
	): Promise<ConvertRate> {
		return this.convertRatesService.create(createDto);
	}

	@Get(':id')
	@MapResponse(ConvertRateDto, ConvertRate)
	async getById(@GetById(ConvertRate) convertRate: ConvertRate): Promise<ConvertRate> {
		return convertRate;
	}
}
