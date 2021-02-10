import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { InputValidationPipe } from 'src/shared/pipes';
import { CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto } from './dtos';
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

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body(new InputValidationPipe(UpdateCurrencyDto)) updateDto: UpdateCurrencyDto,
	): Promise<CurrencyDto> {
		return await this.currenciesService.update(id, updateDto);
	}
}