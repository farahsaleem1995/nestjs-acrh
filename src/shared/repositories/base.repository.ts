import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToClass, ClassConstructor, plainToClassFromExist } from 'class-transformer';
import { MongoError } from 'mongodb';
import { Types, Model, UpdateQuery, FilterQuery } from 'mongoose';
import { BaseDocument, BaseModel } from '../models';

@Injectable()
export abstract class BaseRepository<TModel extends BaseModel> {
	protected constructor(
		protected readonly model: Model<BaseDocument<TModel>>,
		protected readonly modelType: ClassConstructor<TModel>,
	) {}

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

	protected toClassObject(obj: any): TModel {
		return plainToClassFromExist(new this.modelType(), obj);
	}

	protected toClassArray(obj: any[]): TModel[] {
		return plainToClass(this.modelType, obj);
	}

	createModel(doc?: Partial<TModel>): BaseDocument<TModel> {
		return new this.model(doc);
	}

	async findAll(filter: FilterQuery<BaseDocument<TModel>>): Promise<TModel[]> {
		try {
			const model = await this.model.find(filter).exec();

			return this.toClassArray(model);
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async findOne(filter: FilterQuery<BaseDocument<TModel>>): Promise<TModel> {
		try {
			const model = await this.model.findOne(filter).exec();

			return this.toClassObject(model.toObject());
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async findById(id: string): Promise<TModel> {
		try {
			const model = await this.model.findById(BaseRepository.toObjectId(id)).exec();

			return this.toClassObject(model.toObject());
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async create(item: TModel): Promise<TModel> {
		const doc = this.createModel(item);

		try {
			const model = await doc.save();

			return this.toClassObject(model.toObject());
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async update(id: string, item: UpdateQuery<BaseDocument<TModel>>): Promise<TModel> {
		try {
			const model = await this.model
				.findByIdAndUpdate(BaseRepository.toObjectId(id), item, { new: true })
				.exec();

			return this.toClassObject(model.toObject());
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}

	async delete(id: string): Promise<TModel> {
		try {
			const model = await this.model.findByIdAndDelete(BaseRepository.toObjectId(id)).exec();

			return this.toClassObject(model.toObject());
		} catch (e) {
			BaseRepository.throwMongoError(e);
		}
	}
}
