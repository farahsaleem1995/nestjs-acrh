import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { ClassConstructor } from 'class-transformer';
import { Model } from 'mongoose';
import { BaseDocument, BaseModel } from '../models';
import { BaseRepository } from '../repositories';

export const repositoryProvider = <TModel extends BaseModel>(
	model: ClassConstructor<TModel>,
): Provider<BaseRepository<TModel>> => {
	const token = model.name;

	return {
		provide: `${token}Repository`,
		useFactory: (model: Model<BaseDocument<TModel>>) => {
			return new BaseRepository<TModel>(model);
		},
		inject: [getModelToken(token)],
	};
};
