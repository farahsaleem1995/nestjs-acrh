import { Document } from 'mongoose';
import { BaseModel } from '../models';

export declare type BaseDocument<TModel extends BaseModel> = TModel & Document;
