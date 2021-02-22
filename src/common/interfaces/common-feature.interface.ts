import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';

export interface CommonFeature {
	model: ClassConstructor<BaseModel>;
	mapInterceptors: CommonInterceptor;
}

export interface CommonInterceptor {
	provide: string;
	mapTo: ClassConstructor<any>;
}
