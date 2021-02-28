import { Module } from '@nestjs/common';
import { ConvertRateProfile } from './profiles';
import { ConvertRatesController } from './convert-rates.controller';
import { CommonModule } from 'src/common/common.module';
import { ConvertRate } from './models';

@Module({
	imports: [CommonModule.forFeature([ConvertRate])],
	providers: [ConvertRateProfile],
	controllers: [ConvertRatesController],
})
export class ConvertRatesModule {}
