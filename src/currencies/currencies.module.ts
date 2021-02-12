import { Module } from '@nestjs/common';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './currencies.controller';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, currencySchema } from './models';
import { CurrencyProfile } from './profiles';
import { repositoryProvider } from 'src/shared/utils/repository-provideor';

@Module({
	providers: [Currency, CurrenciesService, CurrencyProfile, repositoryProvider(Currency)],
	controllers: [CurrenciesController],
	imports: [
		SharedModule,
		MongooseModule.forFeature([{ name: Currency.name, schema: currencySchema }]),
	],
})
export class CurrenciesModule {}
