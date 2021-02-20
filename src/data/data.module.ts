import { DynamicModule, Module } from '@nestjs/common';
import { DataCoreModule } from './data-core.module';

@Module({})
export class DataModule {
	static forRoot(): DynamicModule {
		return {
			module: DataModule,
			imports: [DataCoreModule.forRoot()],
		};
	}
}
