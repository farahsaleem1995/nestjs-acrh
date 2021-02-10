import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto } from '../dtos';
import { Currency } from '../models';

@Injectable()
export class CurrencyProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	mapProfile() {
		return (mapper: Mapper) => {
			mapper.createMap(Currency, CurrencyDto);
		};
	}
}
