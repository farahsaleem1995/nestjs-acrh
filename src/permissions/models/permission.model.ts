import { AutoMap } from '@automapper/classes';
import { prop } from '@typegoose/typegoose';
import { Exclude, Expose } from 'class-transformer';
import { ColumnSizes } from 'src/data/constants';
import { ForFeature } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { CaslSubject } from 'src/permissions/decorators';
import { ALLOWED_CASL_SUBJECTS } from 'src/permissions/utils';
import { permissionActions } from '../constants';

@ForFeature()
@CaslSubject(permissionActions)
@Exclude()
export class Permission extends BaseModel {
	@prop({
		required: true,
		minlength: ColumnSizes.Length4,
		maxlength: ColumnSizes.Length32,
	})
	@Expose()
	@AutoMap()
	name: string;

	@prop({
		required: true,
	})
	@Expose()
	@AutoMap()
	subject: string;

	@prop({
		required: true,
		validate: (value) => {
			if (!ALLOWED_CASL_SUBJECTS.includes(value)) {
				return false;
			}
			return true;
		},
	})
	@Expose()
	@AutoMap()
	action: string;
}
