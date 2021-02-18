import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CurrenciesService } from 'src/currencies/services/currencies.service';
import { InjectRepository } from 'src/data/decorators';
import { BaseRepository } from 'src/data/repositories';
import { ModelRefs } from 'src/data/types';
import { ConvertRateDto } from '../dtos';
import { CreateConvertRateDto } from '../dtos/create-convert-rate.dto';
import { ConvertRate } from '../models';

@Injectable()
export class ConvertRatesService {
	constructor(
		@InjectMapper() private mapper: Mapper,
		@InjectRepository(ConvertRate)
		private readonly convertRateRepository: BaseRepository<ConvertRate, ModelRefs<ConvertRate>>,
		@Inject(CurrenciesService)
		private readonly currenciesService: CurrenciesService,
	) {}

	async getAll(): Promise<ConvertRateDto[]> {
		const currencies = await this.convertRateRepository.findAll(
			{},
			{
				fromCurrency: true,
				toCurrency: true,
			},
		);

		return this.mapper.mapArray(currencies, ConvertRateDto, ConvertRate);
	}

	async create(createDto: CreateConvertRateDto): Promise<ConvertRateDto> {
		const createdConvertRate = await this.convertRateRepository.create(createDto);

		console.log(createdConvertRate);

		return this.mapper.map(createdConvertRate, ConvertRateDto, ConvertRate);
	}

	private async _checkCurrency(currencyId: string): Promise<void> {
		const currency = await this.currenciesService.getById(currencyId);

		if (!currency) {
			throw new BadRequestException('Currency not found');
		}
	}
}
