import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';

export interface IOperation<TModel extends BaseModel, TRes extends BaseModel | BaseModel[], TArgs> {
	apply(repository: BaseRepository<TModel>, args: TArgs): TRes | Promise<TRes>;
}
