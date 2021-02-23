import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { Operations } from './enums';
import { CommonFeature } from './interfaces';
import { CreateOperation } from './operations';
import { GetAllOperation } from './operations/get-all.operation';
import { BaseService } from './services';
import { getOperationToken, OperationFactory } from './utils';
import { createServiceProviders } from './utils/service-provider';

@Module({})
export class CommonModule {
	static forFeature(commonFeatures: CommonFeature[]): DynamicModule {
		const operationProviders: Provider<any>[] = [];

		const models = commonFeatures.map((feature) => {
			const featureModelName = feature.modelName;

			feature.useDefaults.forEach((defaultOperation) => {
				operationProviders.push({
					provide: getOperationToken(featureModelName, defaultOperation),
					useClass: this.getDefaultOperationClass(defaultOperation),
				});
			});

			return featureModelName;
		});

		const serviceProviders = createServiceProviders(models);

		return {
			module: CommonModule,
			providers: [OperationFactory, BaseService, ...serviceProviders, ...operationProviders],
			exports: [...serviceProviders, ...operationProviders],
		};
	}

	private static getDefaultOperationClass(operation: Operations): ClassConstructor<any> {
		switch (operation) {
			case Operations.Create:
				return CreateOperation;
			case Operations.GetAll:
				return GetAllOperation;
		}
	}
}
