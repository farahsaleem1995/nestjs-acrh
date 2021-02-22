import { MapInterceptor } from '@automapper/nestjs';
import { Body, Controller, Get, Inject, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { InjectService, MapResponse } from 'src/common/decorators';
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
	async getAll(): Promise<CurrencyDto[]> {
		return this.currenciesService.getAll();
	}

	@MapResponse(CurrencyDto, Currency)
	@Post()
	async create(@Body() createDto: CreateCurrencyDto): Promise<Currency> {
		return this.currencyService.apply<CreateCurrencyDto, Currency>(
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
