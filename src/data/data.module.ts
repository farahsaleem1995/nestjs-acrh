import { DynamicModule, Module } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
import { ClassConstructor } from 'class-transformer';
import { Currency } from 'src/currencies/models';
import { BaseModel } from './models';
import { InputValidationPipe } from './pipes';
import { BaseRepository } from './repositories';
import { createRepositoryProviders } from './utils';

@Module({})
export class DataModule {
	static forFeature(
		models: ClassConstructor<BaseModel>[],
		mongooseFeatureModule: DynamicModule,
	): DynamicModule {
		const repositoryProviders = createRepositoryProviders(models);

		return {
			module: DataModule,
			imports: [mongooseFeatureModule],
			providers: [InputValidationPipe, BaseRepository, ...repositoryProviders],
			exports: [InputValidationPipe, BaseRepository, ...repositoryProviders],
		};
	}
}
