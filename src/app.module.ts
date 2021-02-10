import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { SharedModule } from './shared/shared.module';
import { CurrenciesModule } from './currencies/currencies.module';

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
		SharedModule,
		CurrenciesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
