import { Module } from '@nestjs/common';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './currencies.controller';
import { DataModule } from 'src/data/data.module';
import { Currency, currencySchema } from './models';
import { CurrencyProfile } from './profiles';

@Module({
	providers: [Currency, CurrenciesService, CurrencyProfile],
	controllers: [CurrenciesController],
	imports: [DataModule.forFeature([{ model: Currency, schema: currencySchema }])],
})
export class CurrenciesModule {}
