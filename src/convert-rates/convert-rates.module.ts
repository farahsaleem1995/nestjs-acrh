import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { DataModule } from 'src/data/data.module';
import { ConvertRate, convertRateSchema } from './models';
import { ConvertRateProfile } from './profiles';
import { ConvertRatesService } from './services';
import { ConvertRatesController } from './convert-rates.controller';

const mongooseConvertRateModule = MongooseModule.forFeature([
	{ name: ConvertRate.name, schema: convertRateSchema },
]);

@Module({
	providers: [ConvertRatesService, ConvertRateProfile],
	controllers: [ConvertRatesController],
	imports: [DataModule.forFeature([ConvertRate], mongooseConvertRateModule), CurrenciesModule],
})
export class ConvertRatesModule {}
