import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConvertRateDto } from './dtos';
import { CreateConvertRateDto } from './dtos/create-convert-rate.dto';
import { ConvertRatesService } from './services';

@Controller('convert-rates')
export class ConvertRatesController {
	constructor(private readonly convertRateService: ConvertRatesService) {}

	@Get()
	async getAll(): Promise<ConvertRateDto[]> {
		return this.convertRateService.getAll();
	}

	@Post()
	async create(@Body() createDto: CreateConvertRateDto): Promise<ConvertRateDto> {
		return this.convertRateService.create(createDto);
	}
}
