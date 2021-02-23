import { AutoMap } from '@automapper/classes';
import { Expose } from 'class-transformer';

export class BaseDto {
	@AutoMap()
	@Expose()
	id: string;

	@AutoMap()
	@Expose()
	createdAt: string;

	@AutoMap()
	@Expose()
	updatedAt: string;
}
