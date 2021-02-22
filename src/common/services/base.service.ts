import { Injectable, Scope } from '@nestjs/common';
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

	async apply<TRes extends TModel | TModel[], TArgs = any>(
		operation: string,
		args: TArgs,
	): Promise<TRes> {
		const operationInstance = await this.operationFactory.resolve<TModel, TRes, TArgs>(
			operation,
		);

		return await operationInstance.apply(this._repository, args);
	}
}
