import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Inject, Injectable } from '@nestjs/common';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { CreateCurrencyDto } from '../dtos';
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
		console.log(currency);

		return this.mapper.map(currency, CurrencyDto, Currency);
	}

	async create(createDto: CreateCurrencyDto): Promise<CurrencyDto> {
		const currency = this.mapper.map(createDto, Currency, CreateCurrencyDto);

		const createdCurrencey = await this.currenciesRepository.create(currency);

		console.log(createdCurrencey);

		const res = this.mapper.map(createdCurrencey, CurrencyDto, Currency);

		console.log(res);

		return res;
	}
}
