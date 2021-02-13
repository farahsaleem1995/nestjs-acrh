import { DiscriminatorOptions } from '@nestjs/mongoose';
import { ClassConstructor } from 'class-transformer';
import { BaseModel } from '../models';

export declare type DataFeatue = {
	model: ClassConstructor<BaseModel>;
	schema: any;
	collection?: string;
	discriminators?: DiscriminatorOptions[];
};
