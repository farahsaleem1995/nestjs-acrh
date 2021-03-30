import { Module } from '@nestjs/common';
import {
	CreateStrategy,
	DeleteStrategy,
	GetAllStrategy,
	GetByIdStrategy,
	UpdateStrategy,
} from 'src/common/services';
import { CurrenciesController } from './currencies.controller';
import { Currency } from './models';
import { CurrencyProfile } from './profiles';
import {
	createCurrenciesStrategyToken,
	CreateCurrencyStrategy,
	CurrenciesService,
	deleteCurrenciesStrategyToken,
	getAllCurrenciesStrategyToken,
	getByIdCurrenciesStrategyToken,
	updateCurrenciesStrategyToken,
} from './services';

@Module({
	providers: [
		CurrenciesService,
		CurrencyProfile,
		CreateCurrencyStrategy,
		{
			provide: createCurrenciesStrategyToken,
			useClass: CreateCurrencyStrategy,
		},
		{
			provide: getAllCurrenciesStrategyToken,
			useClass: GetAllStrategy(Currency),
		},
		{
			provide: getByIdCurrenciesStrategyToken,
			useClass: GetByIdStrategy(Currency),
		},
		{
			provide: updateCurrenciesStrategyToken,
			useClass: UpdateStrategy(Currency),
		},
		{
			provide: deleteCurrenciesStrategyToken,
			useClass: DeleteStrategy(Currency),
		},
	],
	controllers: [CurrenciesController],
})
export class CurrenciesModule {}
