import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/shared/repositories/base.repository';
import { Currency, CurrencyDocument } from '../models';

export class CurrenciesRepository extends BaseRepository<Currency> {
	constructor(
		@InjectModel(Currency.name) private readonly currencyModel: Model<CurrencyDocument>,
	) {
		super(currencyModel, Currency);
	}
}
