import { Injectable, Scope } from '@nestjs/common';
import { BaseModel } from 'src/data/models';
import { Repository } from 'src/data/repositories';
import { CreateOneParamDto, FindAllParamDto, UpdateOneParamDto } from '../types';

@Injectable({ scope: Scope.TRANSIENT })
export class Service<TModel extends BaseModel> {
	private _repository: Repository<TModel>;

	setRepository(repository: Repository<TModel>): void {
		if (this._repository) {
			throw Error('Repository reset is not allowed');
		}

		this._repository = repository;
	}

	public async getAll(query: FindAllParamDto<TModel>): Promise<TModel[]> {
		return this._repository.findAll(query);
	}

	public async getById(id: string): Promise<TModel> {
		return this._repository.findById(id);
	}

	public async create(createDto: CreateOneParamDto<TModel>): Promise<TModel> {
		return this._repository.create(createDto);
	}

	public async update(id: string, updateDto: UpdateOneParamDto<TModel>): Promise<TModel> {
		return this._repository.updateById(id, updateDto);
	}

	public async delete(id: string): Promise<TModel> {
		return this._repository.deleteById(id);
	}
}
