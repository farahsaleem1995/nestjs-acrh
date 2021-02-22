import { Injectable, Scope } from '@nestjs/common';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { IOperation } from '../interfaces';

@Injectable({ scope: Scope.TRANSIENT })
export class GetAllOperation<TModel extends BaseModel> implements IOperation<TModel, TModel[]> {
	async apply(repository: BaseRepository<TModel>): Promise<TModel[]> {
		const models = await repository.findAll({});

		return models;
	}
}
