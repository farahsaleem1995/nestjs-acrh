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

@Module({})
export class DataModule {
	static forFeature(dataFeatures: DataFeature[]): DynamicModule {
		const models = dataFeatures.map((feature) => feature.model);
		const mongooseModules = dataFeatures.map((feature) => feature.mongooseModule);

		const repositoryProviders = createRepositoryProviders(models);

		return {
			module: DataModule,
			imports: [...mongooseModules],
			providers: [InputValidationPipe, BaseRepository, ...repositoryProviders],
			exports: [InputValidationPipe, BaseRepository, ...repositoryProviders],
		};
	}
}
