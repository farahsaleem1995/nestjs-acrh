import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrencyProfile } from './profiles';
import { CommonModule } from 'src/common/common.module';
import { Currency } from './models';

@Module({
	imports: [CommonModule.forFeature([Currency])],
	providers: [CurrencyProfile],
	controllers: [CurrenciesController],
})
export class CurrenciesModule {}
