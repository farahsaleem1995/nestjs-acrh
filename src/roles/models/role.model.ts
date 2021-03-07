import { AutoMap } from '@automapper/classes';
import { prop } from '@typegoose/typegoose';
import { Exclude, Expose } from 'class-transformer';
import { UseMongoosePlugin } from 'src/common/decorators';
import { ColumnSizes } from 'src/data/constants';
import { ForFeature } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Permission } from 'src/permissions/models';
import { CaslSubject } from '../decorators';

@ForFeature()
@CaslSubject()
@UseMongoosePlugin()
@Exclude()
export class Role extends BaseModel {
	@Expose()
	@prop({
		required: true,
		minlength: ColumnSizes.Length4,
		maxlength: ColumnSizes.Length32,
	})
	@AutoMap()
	name: string;

	@Expose()
	@prop({
		required: true,
		ref: () => Permission,
		autopopulate: true,
	})
	@AutoMap()
	permissions: Permission[];
}
