import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrencyProfile } from './profiles';
import { CurrenciesService } from './services';

@Module({
	providers: [CurrenciesService, CurrencyProfile],
	controllers: [CurrenciesController],
})
export class CurrenciesModule {}
