import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { InjectService, MapArrayResponse, MapResponse } from 'src/common/decorators';
import { Operations } from 'src/common/enums';
import { BaseService } from 'src/common/services';
import { InputValidationPipe } from 'src/data/pipes';
import { CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto } from './dtos';
import { Currency } from './models';
import { CurrenciesService } from './services/currencies.service';

@Controller('currencies')
export class CurrenciesController {
	constructor(
		@Inject(CurrenciesService) private readonly currenciesService: CurrenciesService,
		@InjectService(Currency) private readonly currencyService: BaseService<Currency>,
	) {}

	@Get()
	@MapArrayResponse(CurrencyDto, Currency)
	async getAll(): Promise<Currency[]> {
		return this.currencyService.apply<Currency[]>(Operations.GetAll, {});
	}

	@Post()
	@MapResponse(CurrencyDto, Currency)
	async create(@Body() createDto: CreateCurrencyDto): Promise<Currency> {
		return this.currencyService.apply<Currency, CreateCurrencyDto>(
			Operations.Create,
			createDto,
		);
	}

	@Get(':id')
	async getById(@Param('id') id: string): Promise<CurrencyDto> {
		return this.currenciesService.getById(id);
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body(new InputValidationPipe(UpdateCurrencyDto)) updateDto: UpdateCurrencyDto,
	): Promise<CurrencyDto> {
		return await this.currenciesService.update(id, updateDto);
	}
}
