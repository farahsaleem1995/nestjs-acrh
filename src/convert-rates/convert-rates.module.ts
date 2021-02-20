import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { ConvertRate, convertRateModel } from './models';
import { ConvertRateProfile } from './profiles';
import { ConvertRatesService } from './services';
import { ConvertRatesController } from './convert-rates.controller';

@Module({
	providers: [ConvertRatesService, ConvertRateProfile],
	controllers: [ConvertRatesController],
	imports: [
		DataModule.forFeature('convertRateDateModule', {
			model: ConvertRate,
			mongooseModule: convertRateModel,
		}),
		...DataModule.getInstance('currencyDateModule'),
	],
})
export class ConvertRatesModule {}
