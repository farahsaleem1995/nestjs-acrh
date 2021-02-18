import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/data/dtos';

export class CurrencyDto extends BaseDto {
	@AutoMap()
	name: string;

	@AutoMap()
	code: string;

	@AutoMap()
	symbol: string;
}
