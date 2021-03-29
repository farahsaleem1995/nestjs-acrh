import { CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto, CurrencyQueryDto } from './dtos';
import { Currency } from './models';
import { CrudController } from 'src/common/controllers';
import { CurrenciesService } from './services/currencies.service';
import { Inject } from '@nestjs/common';

export class CurrenciesController extends CrudController('currencies', {
	model: Currency,
	dto: CurrencyDto,
	findAll: { dto: CurrencyQueryDto },
	create: { dto: CreateCurrencyDto },
	update: { dto: UpdateCurrencyDto },
}) {
	constructor(@Inject(CurrenciesService) private readonly currenciesService: CurrenciesService) {
		super(currenciesService);
	}
}
