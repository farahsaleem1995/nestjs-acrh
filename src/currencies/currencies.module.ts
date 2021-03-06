import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrencyProfile } from './profiles';
import { CommonModule } from 'src/common/common.module';
import { Currency } from './models';
import { CrudController } from 'src/common/controllers';
import { CreateCurrencyDto, CurrencyDto, CurrencyQueryDto, UpdateCurrencyDto } from './dtos';

@Module({
	imports: [CommonModule.forFeature([Currency])],
	providers: [CurrencyProfile],
	controllers: [CurrenciesController],
})
export class CurrenciesModule {}
