import { DynamicModule, Module } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { Service } from './services';
import { createServiceProviders } from './utils/service-providers';

@Module({})
export class CommonModule {
	public static forFeature(models: ClassConstructor<BaseModel>[]): DynamicModule {
		const serviceProviders = createServiceProviders(models);

		const module: DynamicModule = {
			module: CommonModule,
			providers: [Service, ...serviceProviders],
			exports: [Service, ...serviceProviders],
		};

		return module;
	}
}
