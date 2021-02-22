import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseModel } from 'src/data/models';
import { IOperation } from '../interfaces';

@Injectable()
export class OperationFactory {
	constructor(private readonly moduleRef: ModuleRef) {}

	async resolve<TModel extends BaseModel, TRes extends BaseModel | BaseModel[], TArgs = any>(
		operation: string,
	): Promise<IOperation<TModel, TRes, TArgs>> {
		const operationToken = getOperationToken(operation);
		const operationInstance = await this.moduleRef.resolve<IOperation<TModel, TRes, TArgs>>(
			operationToken,
		);

		return operationInstance;
	}
}

export const operationTokenKeyword = 'Operation';

export function getOperationToken(operation: string): string {
	return `${operation}${operationTokenKeyword}`;
}
