import { Module } from '@nestjs/common';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './currencies.controller';
import { DataModule } from 'src/data/data.module';
import { Currency, currencyModel } from './models';
import { CurrencyProfile } from './profiles';

@Module({
	providers: [CurrenciesService, CurrencyProfile],
	controllers: [CurrenciesController],
	imports: [
		DataModule.forFeature('currencyDateModule', {
			model: Currency,
			mongooseModule: currencyModel,
		}),
	],
	exports: [CurrenciesService],
})
export class CurrenciesModule {}
