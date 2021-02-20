import { Module } from '@nestjs/common';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './currencies.controller';
import { CurrencyProfile } from './profiles';

@Module({
	providers: [CurrenciesService, CurrencyProfile],
	controllers: [CurrenciesController],
	imports: [],
	exports: [CurrenciesService],
})
export class CurrenciesModule {}
