import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MapArrayResponse, MapResponse } from 'src/common/decorators';
import { InputValidationPipe } from 'src/data/pipes';
import { DataQuery } from 'src/data/types';
import { QueryTransform } from 'src/common/pipes';
import { CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto } from './dtos';
import { CurrencyQueryDto } from './dtos/currency-query.dto';
import { Currency } from './models';
import { CurrenciesService } from './services/currencies.service';

@Controller('currencies')
export class CurrenciesController {
	constructor(private readonly currenciesService: CurrenciesService) {}

	@Get()
	@MapArrayResponse(CurrencyDto, Currency)
	async getAll(
		@Query(QueryTransform(CurrencyQueryDto)) query: DataQuery<Currency>,
	): Promise<Currency[]> {
		return await this.currenciesService.getAll(query);
	}

	@Post()
	@MapResponse(CurrencyDto, Currency)
	async create(@Body() createDto: CreateCurrencyDto): Promise<Currency> {
		return await this.currenciesService.create(createDto);
	}

	@Get(':id')
	@MapResponse(CurrencyDto, Currency)
	async getById(@Param('id') id: string): Promise<Currency> {
		return await this.currenciesService.getById(id);
	}

	@Put(':id')
	@MapResponse(CurrencyDto, Currency)
	async update(
		@Param('id') id: string,
		@Body(new InputValidationPipe(UpdateCurrencyDto)) updateDto: UpdateCurrencyDto,
	): Promise<Currency> {
		return await this.currenciesService.update(id, updateDto);
	}
}
