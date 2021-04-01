import { NotFoundException } from '@nestjs/common';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import { FindAllParamDto, CreateOneParamDto, UpdateOneParamDto } from '../types';

export abstract class CrudService<TModel extends BaseModel> {
	constructor(protected readonly repository: Repository<TModel>) {}

	public getAll(query: FindAllParamDto<TModel>): TModel[] | Promise<TModel[]> {
		return this.repository.findAll(query);
	}

	public getById(id: string): TModel | Promise<TModel> {
		return this.repository.findById(id);
	}

	public create(createDto: CreateOneParamDto<TModel>): TModel | Promise<TModel> {
		return this.repository.create(createDto);
	}

	public update(id: string, updateDto: UpdateOneParamDto<TModel>): TModel | Promise<TModel> {
		return this.repository.updateById(id, updateDto);
	}

	public delete(id: string): TModel | Promise<TModel> {
		const deletedModel = this.repository.deleteById(id);

		if (!deletedModel) {
			throw new NotFoundException(`Not Found`);
		}

		return deletedModel;
	}
}
