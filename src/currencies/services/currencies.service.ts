import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'src/data/decorators';
import { BaseRepository } from 'src/data/repositories';
import { FindAllQuery } from 'src/data/types';
import { CreateCurrencyDto, UpdateCurrencyDto } from '../dtos';
import { Currency } from '../models';

@Injectable()
export class CurrenciesService {
	constructor(
		@InjectRepository(Currency)
		private readonly currenciesRepository: BaseRepository<Currency>,
	) {}

	async getAll(query: FindAllQuery<Currency> = {}): Promise<Currency[]> {
		return await this.currenciesRepository.findAll(query);
	}

	async getById(id: string): Promise<Currency> {
		return await this.currenciesRepository.findById(id);
	}

	async create(createDto: CreateCurrencyDto): Promise<Currency> {
		return await this.currenciesRepository.create(createDto);
	}

	async update(id: string, updateDto: UpdateCurrencyDto): Promise<Currency> {
		return await this.currenciesRepository.updateById(id, updateDto);
	}
}
