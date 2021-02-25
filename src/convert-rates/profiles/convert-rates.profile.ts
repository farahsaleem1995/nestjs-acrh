import { mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { ConvertRateDto } from '../dtos/convert-rate.dto';
import { ConvertRate } from '../models';

@Injectable()
export class ConvertRateProfile extends AutomapperProfile {
	constructor(@InjectMapper() mapper: Mapper) {
		super(mapper);
	}

	mapProfile() {
		return (mapper: Mapper) => {
			mapper.createMap(ConvertRate, ConvertRateDto);
		};
	}
}
