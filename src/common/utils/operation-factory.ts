import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseDto } from 'src/data/dtos';
import { BaseModel } from 'src/data/models';
import { IOperation } from '../interfaces';

@Injectable()
export class OperationFactory {
	constructor(private readonly moduleRef: ModuleRef) {}

	async resolve<TModel extends BaseModel, TArgs, TResultType extends BaseModel | BaseModel[]>(
		operation: string,
	): Promise<IOperation<TModel, TArgs, TResultType>> {
		const operationToken = getOperationToken(operation);
		const operationInstance = await this.moduleRef.resolve<
			IOperation<TModel, TArgs, TResultType>
		>(operationToken);

		return operationInstance;
	}
}

export const operationTokenKeyword = 'Operation';

export function getOperationToken(operation: string): string {
	return `${operation}${operationTokenKeyword}`;
}
