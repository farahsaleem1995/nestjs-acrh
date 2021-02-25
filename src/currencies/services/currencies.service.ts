import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'src/data/decorators';
import { BaseRepository } from 'src/data/repositories';
import { DataQuery } from 'src/data/types';
import { CreateCurrencyDto, UpdateCurrencyDto } from '../dtos';
import { CurrencyDto } from '../dtos/currency.dto';
import { Currency } from '../models';

@Injectable()
export class CurrenciesService {
	constructor(
		@InjectMapper() private mapper: Mapper,
		@InjectRepository(Currency.name)
		private readonly currenciesRepository: BaseRepository<Currency>,
	) {}

	async getAll(query: DataQuery<Currency> = {}): Promise<Currency[]> {
		return await this.currenciesRepository.findAll(query);
	}

	async getById(id: string): Promise<Currency> {
		return await this.currenciesRepository.findById(id);
	}

	async create(createDto: CreateCurrencyDto): Promise<Currency> {
		return await this.currenciesRepository.create(createDto);
	}

	async update(id: string, updateDto: UpdateCurrencyDto): Promise<Currency> {
		return await this.currenciesRepository.update(id, updateDto);
	}
}
