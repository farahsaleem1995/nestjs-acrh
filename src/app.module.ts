import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CurrenciesModule } from './currencies/currencies.module';
import { ConvertRatesModule } from './convert-rates/convert-rates.module';
import { DataModule } from './data/data.module';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
	imports: [
		TypegooseModule.forRoot('mongodb://localhost:27017/new-arch', {
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}),
		AutomapperModule.forRoot({
			options: [{ name: 'app', pluginInitializer: classes }],
			singular: true,
		}),
		DataModule.forRoot(),
		CurrenciesModule,
		ConvertRatesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
