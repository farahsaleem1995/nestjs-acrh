import { AutoMap } from '@automapper/classes';
import { prop } from '@typegoose/typegoose';
import { Exclude, Expose } from 'class-transformer';
import { UseMongoosePlugin } from 'src/common/decorators';
import { ColumnSizes } from 'src/data/constants';
import { ForFeature } from 'src/data/decorators';
import { BaseModel } from 'src/data/models';
import { Resource } from '../decorators';
import { RolePrivilege } from './role-privilege.model';

@ForFeature()
@Resource()
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
		_id: false,
		required: true,
		minlength: ColumnSizes.Length4,
		maxlength: ColumnSizes.Length16,
		ref: () => RolePrivilege,
		autopopulate: true,
	})
	@AutoMap()
	privilege: RolePrivilege[];
}
