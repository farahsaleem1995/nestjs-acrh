import { BadRequestException, ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { Currency } from 'src/currencies/models';
import { InjectRepository } from 'src/data/decorators';
import { Repository } from 'src/data/repositories';
import { CreateConvertRateDto } from '../dtos/create-convert-rate.dto';
import { ConvertRate } from '../models';

@Injectable()
export class CreateConvertRatePipe
	implements PipeTransform<CreateConvertRateDto, Promise<CreateConvertRateDto>> {
	private _messages: { [key: string]: string } = {
		notFoundCurrencyError: 'Currency not found.',
		currenciesCannotBeTheSameError: 'Convert rate currencies cannot be the same currency',
		alreadyExistConvertRateError: 'Convert rate already exist.',
	};

	constructor(
		@InjectRepository(ConvertRate)
		private readonly convertRateRepository: Repository<ConvertRate>,
		@InjectRepository(Currency) private readonly currencyRepository: Repository<Currency>,
	) {}

	async transform(value: CreateConvertRateDto): Promise<CreateConvertRateDto> {
		const { fromCurrency: fromCurrencyId, toCurrency: toCurrencyId } = value;

		const exist = await this.convertRateRepository.findOne({
			fromCurrency: fromCurrencyId,
			toCurrency: toCurrencyId,
		});

		if (fromCurrencyId === toCurrencyId) {
			throw new BadRequestException(this._messages.currenciesCannotBeTheSameError);
		}

		if (exist) {
			throw new ConflictException(this._messages.alreadyExistConvertRateError);
		}

		const fromCurrency = await this.currencyRepository.findById(fromCurrencyId);
		if (!fromCurrency) {
			throw new BadRequestException(this._messages.notFoundCurrencyError);
		}

		const toCurrency = await this.currencyRepository.findById(toCurrencyId);
		if (!toCurrency) {
			throw new BadRequestException(this._messages.notFoundCurrencyError);
		}

		return value;
	}
}
