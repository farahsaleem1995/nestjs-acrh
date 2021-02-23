import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InjectService, MapArrayResponse, MapResponse } from 'src/common/decorators';
import { Operations } from 'src/common/enums';
import { CreateArgs, GetAllArgs, GetByIdArgs } from 'src/common/operations';
import { UpdateArgs } from 'src/common/operations/update.operation';
import { BaseService } from 'src/common/services';
import { InputValidationPipe } from 'src/data/pipes';
import { CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto } from './dtos';
import { Currency } from './models';

@Controller('currencies')
export class CurrenciesController {
	constructor(
		@InjectService(Currency.name) private readonly currencyService: BaseService<Currency>,
	) {}

	@Get()
	@MapArrayResponse(CurrencyDto, Currency)
	async getAll(): Promise<Currency[]> {
		return await this.currencyService.apply<Currency[], GetAllArgs>(Operations.GetAll, {});
	}

	@Post()
	@MapResponse(CurrencyDto, Currency)
	async create(@Body() createDto: CreateCurrencyDto): Promise<Currency> {
		return await this.currencyService.apply<Currency, CreateArgs<Currency, CreateCurrencyDto>>(
			Operations.Create,
			{ createDto },
		);
	}

	@Get(':id')
	@MapResponse(CurrencyDto, Currency)
	async getById(@Param('id') id: string): Promise<Currency> {
		return await this.currencyService.apply<Currency, GetByIdArgs>(Operations.GetById, { id });
	}

	@Put(':id')
	@MapResponse(CurrencyDto, Currency)
	async update(
		@Param('id') id: string,
		@Body(new InputValidationPipe(UpdateCurrencyDto)) updateDto: UpdateCurrencyDto,
	): Promise<Currency> {
		return await this.currencyService.apply<Currency, UpdateArgs<Currency, UpdateCurrencyDto>>(
			Operations.Update,
			{ id, updateDto },
		);
	}
}
