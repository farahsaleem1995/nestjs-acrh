import { Injectable, Scope } from '@nestjs/common';
import { BaseModel } from 'src/data/models';
import { BaseRepository } from 'src/data/repositories';
import { CreateOneParamDto, FindAllParamDto, UpdateOneParamDto } from '../types';

@Injectable({ scope: Scope.TRANSIENT })
export class BaseService<TModel extends BaseModel> {
	private _repository: BaseRepository<TModel>;

	setRepository(repository: BaseRepository<TModel>): void {
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
