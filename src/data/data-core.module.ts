import { DynamicModule, Global, Module } from '@nestjs/common';
import { mongooseFeatures } from './decorators';
import { BaseRepository } from './repositories';
import { createRepositoryProviders } from './utils';

@Global()
@Module({})
export class DataCoreModule {
	static forRoot(): DynamicModule {
		const repositoryProviders = createRepositoryProviders();

		const module: DynamicModule = {
			module: DataCoreModule,
			imports: [...mongooseFeatures.map((feature) => feature.module)],
			providers: [BaseRepository, ...repositoryProviders],
			exports: [BaseRepository, ...repositoryProviders],
		};

		return module;
	}
}
