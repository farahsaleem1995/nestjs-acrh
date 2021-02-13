import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { MongoError } from 'mongodb';
import { Types, Model, UpdateQuery, FilterQuery } from 'mongoose';
import { BaseModel } from '../models';
import { BaseDocument } from '../types';

@Injectable({ scope: Scope.TRANSIENT })
export class BaseRepository<TModel extends BaseModel> {
	private _modelType: ClassConstructor<TModel>;
	private _model: Model<BaseDocument<TModel>>;

	setModel(model: Model<BaseDocument<TModel>>): void {
		this._model = model;
	}

	private static _throwMongoError(err: MongoError): void {
		throw new InternalServerErrorException(err, err.errmsg);
	}

	private static _toObjectId(id: string): Types.ObjectId {
		try {
			return Types.ObjectId(id);
		} catch (e) {
			this._throwMongoError(e);
		}
	}

	private _toClassObject(obj: any): TModel {
		return plainToClass(this._modelType, obj);
	}

	private _toClassArray(obj: any[]): TModel[] {
		return plainToClass(this._modelType, obj);
	}

	createModel(doc?: Partial<TModel>): BaseDocument<TModel> {
		return new this._model(doc);
	}

	async findAll(filter: FilterQuery<BaseDocument<TModel>>): Promise<TModel[]> {
		try {
			const model = await this._model.find(filter).exec();

			return this._toClassArray(model);
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async findOne(filter: FilterQuery<BaseDocument<TModel>>): Promise<TModel> {
		try {
			const model = await this._model.findOne(filter).exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async findById(id: string): Promise<TModel> {
		try {
			const model = await this._model.findById(BaseRepository._toObjectId(id)).exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async create(item: TModel): Promise<TModel> {
		const doc = this.createModel(item);

		try {
			const model = await doc.save();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async update(id: string, item: UpdateQuery<BaseDocument<TModel>>): Promise<TModel> {
		try {
			const model = await this._model
				.findByIdAndUpdate(BaseRepository._toObjectId(id), item, { new: true })
				.exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}

	async delete(id: string): Promise<TModel> {
		try {
			const model = await this._model
				.findByIdAndDelete(BaseRepository._toObjectId(id))
				.exec();

			return this._toClassObject(model.toObject());
		} catch (e) {
			BaseRepository._throwMongoError(e);
		}
	}
}
