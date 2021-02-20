import { DynamicModule, Module } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
import { ClassConstructor } from 'class-transformer';
import { features } from 'process';
import { Currency } from 'src/currencies/models';
import { BaseModel } from './models';
import { InputValidationPipe } from './pipes';
import { BaseRepository } from './repositories';
import { createRepositoryProviders } from './utils';

export interface DataFeature {
	model: ClassConstructor<BaseModel>;
	mongooseModule: DynamicModule;
}

export type DataModuleInstances = { [key: string]: DynamicModule };

@Module({})
export class DataModule {
	private static instances: DataModuleInstances = {};

	static getInstance(...keys: string[]): DynamicModule[] {
		const result: DynamicModule[] = [];

		keys.forEach((key) => {
			result.push(this.instances[key]);
		});

		return result;
	}

	static forFeature(moduleKey: string, dataFeature: DataFeature): DynamicModule {
		const model = dataFeature.model;
		const mongooseModules = dataFeature.mongooseModule;

		const repositoryProviders = createRepositoryProviders([model]);

		const module: DynamicModule = {
			module: DataModule,
			imports: [mongooseModules],
			providers: [InputValidationPipe, BaseRepository, ...repositoryProviders],
			exports: [...repositoryProviders],
		};

		this.instances[moduleKey] = module;

		return module;
	}
}
