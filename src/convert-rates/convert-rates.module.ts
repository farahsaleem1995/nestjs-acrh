import { Module } from '@nestjs/common';
import { ConvertRateProfile } from './profiles';
import { ConvertRatesController } from './convert-rates.controller';
import {
	ConvertRatesService,
	createConvertRatesStrategyToken,
	deleteConvertRatesStrategyToken,
	getAllConvertRatesStrategyToken,
	getByIdConvertRatesStrategyToken,
	updateConvertRatesStrategyToken,
} from './services';
import {
	CreateStrategy,
	DeleteStrategy,
	GetAllStrategy,
	GetByIdStrategy,
	UpdateStrategy,
} from 'src/common/services';
import { ConvertRate } from './models';

@Module({
	providers: [
		ConvertRatesService,
		ConvertRateProfile,
		{
			provide: createConvertRatesStrategyToken,
			useClass: CreateStrategy(ConvertRate),
		},
		{
			provide: getAllConvertRatesStrategyToken,
			useClass: GetAllStrategy(ConvertRate),
		},
		{
			provide: getByIdConvertRatesStrategyToken,
			useClass: GetByIdStrategy(ConvertRate),
		},
		{
			provide: updateConvertRatesStrategyToken,
			useClass: UpdateStrategy(ConvertRate),
		},
		{
			provide: deleteConvertRatesStrategyToken,
			useClass: DeleteStrategy(ConvertRate),
		},
	],
	controllers: [ConvertRatesController],
})
export class ConvertRatesModule {}
