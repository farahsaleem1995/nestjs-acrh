import { InternalServerErrorException } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Types, Model, UpdateQuery, FilterQuery } from 'mongoose';
import { BaseDocument, BaseModel } from '../models';

export abstract class BaseRepository<TModel extends BaseModel> {
	protected constructor(protected readonly model: Model<BaseDocument<TModel>>) {}

	protected static throwMongoError(err: MongoError): void {
		throw new InternalServerErrorException(err, err.errmsg);
	}

	protected static toObjectId(id: string): Types.ObjectId {
		try {
			return Types.ObjectId(id);
		} catch (e) {
			this.throwMongoError(e);
		}
	}

	createModel(doc?: Partial<TModel>): BaseDocument<TModel> {
		return new this.model(doc);
	}

	async findAll(filter: FilterQuery<BaseDocument<TModel>>): Promise<TModel[]> {
		try {
			return await this.model.find(filter).exec();
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async findOne(filter: FilterQuery<BaseDocument<TModel>>): Promise<TModel> {
		try {
			return await this.model.findOne(filter).exec();
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async findById(id: string): Promise<TModel> {
		try {
			return await this.model.findById(BaseRepository.toObjectId(id)).exec();
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async create(item: TModel): Promise<TModel> {
		const doc = this.createModel(item);

		try {
			return await doc.save();
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async update(id: string, item: UpdateQuery<BaseDocument<TModel>>): Promise<TModel> {
		try {
			return await this.model
				.findByIdAndUpdate(BaseRepository.toObjectId(id), item, { new: true })
				.exec();
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async delete(id: string): Promise<TModel> {
		try {
			return await this.model.findByIdAndDelete(BaseRepository.toObjectId(id)).exec();
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}
}
