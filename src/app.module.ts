import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CurrenciesModule } from './currencies/currencies.module';
import { ConvertRatesModule } from './convert-rates/convert-rates.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/new-arch', {
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}),
		AutomapperModule.forRoot({
			options: [{ name: 'app', pluginInitializer: classes }],
			singular: true,
		}),
		CurrenciesModule,
		ConvertRatesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
