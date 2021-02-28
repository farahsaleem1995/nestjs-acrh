import { Module } from '@nestjs/common';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './currencies.controller';
import { CurrencyProfile } from './profiles';
import { CommonModule } from 'src/common/common.module';
import { Currency } from './models';

@Module({
	imports: [CommonModule.forFeature([Currency])],
	providers: [CurrenciesService, CurrencyProfile],
	controllers: [CurrenciesController],
	exports: [CurrenciesService],
})
export class CurrenciesModule {}
