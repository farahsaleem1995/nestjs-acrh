import { MapInterceptor } from '@automapper/nestjs';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { TransformInterceptor } from '../interceptors';

export function MapResponse(destination: ClassConstructor<any>, source: ClassConstructor<any>) {
	return applyDecorators(
		UseInterceptors(MapInterceptor(destination, source), TransformInterceptor(destination)),
	);
}

export function MapArrayResponse(
	destination: ClassConstructor<any>,
	source: ClassConstructor<any>,
) {
	return applyDecorators(
		UseInterceptors(
			MapInterceptor(destination, source, { isArray: true }),
			TransformInterceptor(destination),
		),
	);
}
