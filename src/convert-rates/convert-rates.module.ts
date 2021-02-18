import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrenciesModule, mongooseCurrenciesFeature } from 'src/currencies/currencies.module';
import { DataModule } from 'src/data/data.module';
import { ConvertRate, convertRateSchema } from './models';
import { ConvertRateProfile } from './profiles';
import { ConvertRatesService } from './services';
import { ConvertRatesController } from './convert-rates.controller';
import { Currency } from 'src/currencies/models';

const mongooseConvertRateFeature = MongooseModule.forFeature([
	{ name: ConvertRate.name, schema: convertRateSchema },
]);

@Module({
	providers: [ConvertRatesService, ConvertRateProfile],
	controllers: [ConvertRatesController],
	imports: [
		DataModule.forFeature([
			{
				model: ConvertRate,
				mongooseModule: mongooseConvertRateFeature,
			},
			{
				model: Currency,
				mongooseModule: mongooseCurrenciesFeature,
			},
		]),
	],
})
export class ConvertRatesModule {}
