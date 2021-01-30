import { mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos';
import { CurrencyDto } from '../dtos/currency.dto';
import { Currency } from '../models';

@Injectable()
export class CurrencyProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	mapProfile() {
		return (mapper: Mapper) => {
			mapper.createMap(CreateCurrencyDto, Currency);

			mapper.createMap(Currency, CurrencyDto).forMember(
				(dest) => dest.name,
				mapFrom((src) => {
					console.log(src);
					return src.name;
				}),
			);
		};
	}
}
