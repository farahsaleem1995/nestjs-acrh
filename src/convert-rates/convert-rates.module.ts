import { Module } from '@nestjs/common';
import { ConvertRateProfile } from './profiles';
import { ConvertRatesController } from './convert-rates.controller';
import { ConvertRatesService } from './services';

@Module({
	providers: [ConvertRatesService, ConvertRateProfile],
	controllers: [ConvertRatesController],
})
export class ConvertRatesModule {}
