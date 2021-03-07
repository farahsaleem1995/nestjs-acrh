import { ClassConstructor } from 'class-transformer';
import { BaseModel } from 'src/data/models';
import { ALLOWED_CASL_SUBJECTS } from '../utils';

export function CaslSubject() {
	return function (ctr: ClassConstructor<BaseModel>) {
		const modelName = ctr.name;

		ALLOWED_CASL_SUBJECTS.push(modelName);
	};
}
