import { Module } from '@nestjs/common';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './currencies.controller';
import { CurrencyProfile } from './profiles';
import { CommonModule } from 'src/common/common.module';
import { Currency } from './models';

@Module({
	providers: [CurrenciesService, CurrencyProfile],
	controllers: [CurrenciesController],
	imports: [CommonModule.forFeature([Currency])],
	exports: [CurrenciesService],
})
export class CurrenciesModule {}
