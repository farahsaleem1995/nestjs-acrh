import { Module } from '@nestjs/common';
import { ConvertRateProfile } from './profiles';
import { ConvertRatesService } from './services';
import { ConvertRatesController } from './convert-rates.controller';

@Module({
	providers: [ConvertRatesService, ConvertRateProfile],
	controllers: [ConvertRatesController],
	imports: [],
})
export class ConvertRatesModule {}
