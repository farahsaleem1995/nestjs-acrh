import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Inject, Injectable } from '@nestjs/common';
import { CreateCurrencyDto, UpdateCurrencyDto } from '../dtos';
import { CurrencyDto } from '../dtos/currency.dto';
import { Currency } from '../models';
import { CurrenciesRepository } from '../repositories';

@Injectable()
export class CurrenciesService {
	constructor(
		@InjectMapper() private mapper: Mapper,
		@Inject(CurrenciesRepository) private readonly currenciesRepository: CurrenciesRepository,
	) {}

	async getAll(): Promise<CurrencyDto[]> {
		const currencies = await this.currenciesRepository.findAll({});

		return this.mapper.mapArray(currencies, CurrencyDto, Currency);
	}

	async getById(id: string): Promise<CurrencyDto> {
		const currency = await this.currenciesRepository.findById(id);

		return this.mapper.map(currency, CurrencyDto, Currency);
	}

	async create(createDto: CreateCurrencyDto): Promise<CurrencyDto> {
		const createdCurrencey = await this.currenciesRepository.create(createDto);

		return this.mapper.map(createdCurrencey, CurrencyDto, Currency);
	}

	async update(id: string, updateDto: UpdateCurrencyDto): Promise<CurrencyDto> {
		const updatedCurrencey = await this.currenciesRepository.update(id, updateDto);

		return this.mapper.map(updatedCurrencey, CurrencyDto, Currency);
	}
}