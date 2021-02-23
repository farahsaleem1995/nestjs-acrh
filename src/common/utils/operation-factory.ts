import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseModel } from 'src/data/models';
import { IOperation } from '../interfaces';

@Injectable()
export class OperationFactory {
	constructor(private readonly moduleRef: ModuleRef) {}

	async resolve<TModel extends BaseModel, TRes extends BaseModel | BaseModel[], TArgs = any>(
		modelName: string,
		operation: string,
	): Promise<IOperation<TModel, TRes, TArgs>> {
		const operationToken = getOperationToken(modelName, operation);
		const operationInstance = await this.moduleRef.resolve<IOperation<TModel, TRes, TArgs>>(
			operationToken,
		);

		return operationInstance;
	}
}

export const operationTokenKeyword = 'Operation';

export function getOperationToken(modelName: string, operation: string): string {
	return `${modelName}${operation}${operationTokenKeyword}`;
}
