import { CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto, CurrencyQueryDto } from './dtos';
import { Currency } from './models';
import { CrudController } from 'src/common/controllers';

export class CurrenciesController extends CrudController('currencies', {
	model: Currency,
	dto: CurrencyDto,
	findAll: { dto: CurrencyQueryDto },
	create: { dto: CreateCurrencyDto },
	update: { dto: UpdateCurrencyDto },
}) {}
