import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateCurrencyDto } from './dtos';
import { CurrencyDto } from './dtos/currency.dto';
import { CurrenciesService } from './services/currencies.service';

@Controller('currencies')
export class CurrenciesController {
	constructor(@Inject(CurrenciesService) private readonly currenciesService: CurrenciesService) {}

	@Get()
	async getAll(): Promise<CurrencyDto[]> {
		return this.currenciesService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string): Promise<CurrencyDto> {
		return this.currenciesService.getById(id);
	}

	@Post()
	async create(@Body() createDto: CreateCurrencyDto): Promise<CurrencyDto> {
		return this.currenciesService.create(createDto);
	}
}
