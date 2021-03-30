import { Abstract, Inject, mixin, NotFoundException, Type } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { InjectRepository } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import {
	ICreateStrategy,
	ICrudService,
	IDeleteStrategy,
	IGetAllStrategy,
	IGetByIdStrategy,
	IUpdateStrategy,
} from '../interfaces';
import { FindAllParamDto, CreateOneParamDto, UpdateOneParamDto } from '../types';

export interface ICrudServiceConfig<TModel extends BaseModel> {
	createStrategy?: string | symbol | ClassConstructor<TModel> | Type<any> | Abstract<any>;
	getAllStrategy?: string | symbol | ClassConstructor<TModel> | Type<any> | Abstract<any>;
	getByIdStrategy?: string | symbol | ClassConstructor<TModel> | Type<any> | Abstract<any>;
	updateStrategy?: string | symbol | ClassConstructor<TModel> | Type<any> | Abstract<any>;
	deleteStrategy?: string | symbol | ClassConstructor<TModel> | Type<any> | Abstract<any>;
}

export function CrudService<TModel extends BaseModel>(
	model: ClassConstructor<TModel>,
	config: ICrudServiceConfig<TModel>,
) {
	const {
		createStrategy,
		getAllStrategy,
		getByIdStrategy,
		updateStrategy,
		deleteStrategy,
	} = config;

	console.log(config);

	class CrudService implements ICrudService<TModel> {
		constructor(
			@InjectRepository(model) private readonly repository: Repository<TModel>,
			@Inject(createStrategy) private readonly createStrategy: ICreateStrategy<TModel>,
			@Inject(getAllStrategy) private readonly getAllStrategy: IGetAllStrategy<TModel>,
			@Inject(getByIdStrategy) private readonly getByIdStrategy: IGetByIdStrategy<TModel>,
			@Inject(updateStrategy) private readonly updateStrategy: IUpdateStrategy<TModel>,
			@Inject(deleteStrategy) private readonly deleteStrategy: IDeleteStrategy<TModel>,
		) {}

		public getAll(query: FindAllParamDto<TModel>): TModel[] | Promise<TModel[]> {
			return this.getAllStrategy.getAll(query);
		}

		public getById(id: string): TModel | Promise<TModel> {
			return this.getByIdStrategy.getById(id);
		}

		public create(createDto: CreateOneParamDto<TModel>): TModel | Promise<TModel> {
			return this.createStrategy.create(createDto);
		}

		public update(id: string, updateDto: UpdateOneParamDto<TModel>): TModel | Promise<TModel> {
			return this.updateStrategy.update(id, updateDto);
		}

		public delete(id: string): TModel | Promise<TModel> {
			const deletedModel = this.deleteStrategy.delete(id);

			if (!deletedModel) {
				throw new NotFoundException(`Not Found`);
			}

			return deletedModel;
		}
	}

	return mixin(CrudService);
}
