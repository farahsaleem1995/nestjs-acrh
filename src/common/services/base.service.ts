import { Injectable, Scope } from '@nestjs/common';
import { BaseDto } from 'src/data/dtos';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { OperationFactory } from '../utils';

@Injectable({ scope: Scope.TRANSIENT })
export class BaseService<TModel extends BaseModel> {
	private _repository: BaseRepository<TModel>;

	constructor(private readonly operationFactory: OperationFactory) {}

	setRepository(repository: BaseRepository<TModel>): void {
		this._repository = repository;
	}

	async apply<TArgs, TResultType extends TModel | TModel[]>(
		operation: string,
		args: TArgs,
	): Promise<TResultType> {
		const operationInstance = await this.operationFactory.resolve<TModel, TArgs, TResultType>(
			operation,
		);

		return await operationInstance.apply(this._repository, args);
	}
}
