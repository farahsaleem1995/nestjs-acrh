import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CurrenciesModule } from './currencies/currencies.module';
import { DataModule } from './data/data.module';

@Module({
	imports: [
		DataModule.forRoot(),
		AutomapperModule.forRoot({
			options: [{ name: 'app', pluginInitializer: classes }],
			singular: true,
		}),
		CurrenciesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
