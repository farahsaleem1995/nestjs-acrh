import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { ALLOWED_RESOURCES } from '../utils';

export function Resource() {
	return function (ctr: ClassConstructor<BaseModel>) {
		const modelName = ctr.name;

		ALLOWED_RESOURCES.push(modelName);
	};
}
