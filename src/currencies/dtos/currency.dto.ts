import { AutoMap } from '@automapper/classes';

export class CurrencyDto {
	@AutoMap()
	id: string;

	@AutoMap()
	name: string;

	@AutoMap()
	code: string;

	@AutoMap()
	symbol: string;

	@AutoMap()
	createdAt: string;

	@AutoMap()
	updatedAt: string;
}
