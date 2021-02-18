import { Module } from '@nestjs/common';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './currencies.controller';
import { DataModule } from 'src/data/data.module';
import { Currency, currencySchema } from './models';
import { CurrencyProfile } from './profiles';
import { MongooseModule } from '@nestjs/mongoose';

export const mongooseCurrenciesFeature = MongooseModule.forFeature([
	{ name: Currency.name, schema: currencySchema },
]);

@Module({
	providers: [CurrenciesService, CurrencyProfile],
	controllers: [CurrenciesController],
	imports: [
		DataModule.forFeature([
			{
				model: Currency,
				mongooseModule: mongooseCurrenciesFeature,
			},
		]),
	],
	exports: [CurrenciesService],
})
export class CurrenciesModule {}
