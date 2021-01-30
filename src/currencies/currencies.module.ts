import { Module } from '@nestjs/common';
import { CurrenciesRepository } from './repositories/currencies.repository';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './currencies.controller';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, currencySchema } from './models';
import { CurrencyProfile } from './profiles';

@Module({
	providers: [CurrenciesRepository, CurrenciesService, CurrencyProfile],
	controllers: [CurrenciesController],
	imports: [
		SharedModule,
		MongooseModule.forFeature([{ name: Currency.name, schema: currencySchema }]),
	],
})
export class CurrenciesModule {}
