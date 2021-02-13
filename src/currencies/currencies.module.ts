import { Module } from '@nestjs/common';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './currencies.controller';
import { SharedModule } from 'src/shared/shared.module';
import { Currency, currencySchema } from './models';
import { CurrencyProfile } from './profiles';

@Module({
	providers: [Currency, CurrenciesService, CurrencyProfile],
	controllers: [CurrenciesController],
	imports: [SharedModule.forFeature([{ model: Currency, schema: currencySchema }])],
})
export class CurrenciesModule {}
