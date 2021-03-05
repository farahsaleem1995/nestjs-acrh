import { Controller, Get, Post, Put } from '@nestjs/common';
import {
	GetById,
	InjectService,
	MapArrayResponse,
	MapResponse,
	TransformQuery,
	ValidateBody,
	ValidateById,
} from 'src/common/decorators';
import { CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto, CurrencyQueryDto } from './dtos';
import { Currency } from './models';
import { FindAllQuery } from 'src/data/types';
import { Service } from 'src/common/services';

@Controller('currencies')
export class CurrenciesController {
	constructor(@InjectService(Currency) private readonly currenciesService: Service<Currency>) {}

	@Get()
	@MapArrayResponse(CurrencyDto, Currency)
	async getAll(
		@TransformQuery(CurrencyQueryDto) query: FindAllQuery<Currency>,
	): Promise<Currency[]> {
		return await this.currenciesService.getAll(query);
	}

	@Post()
	@MapResponse(CurrencyDto, Currency)
	async create(@ValidateBody(CreateCurrencyDto) createDto: CreateCurrencyDto): Promise<Currency> {
		return await this.currenciesService.create(createDto);
	}

	@Get(':id')
	@MapResponse(CurrencyDto, Currency)
	async getById(@GetById(Currency) currency: Currency): Promise<Currency> {
		return currency;
	}

	@Put(':id')
	@MapResponse(CurrencyDto, Currency)
	async update(
		@ValidateById(Currency) id: string,
		@ValidateBody(UpdateCurrencyDto) updateDto: UpdateCurrencyDto,
	): Promise<Currency> {
		return await this.currenciesService.update(id, updateDto);
	}
}
