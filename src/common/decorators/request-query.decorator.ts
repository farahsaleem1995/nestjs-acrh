import { PipeTransform, Query, Type } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { QueryTransformPipe } from '../pipes';

export function TransformQuery(
	queryModelCtr: ClassConstructor<any>,
	...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]
) {
	return Query(QueryTransformPipe(queryModelCtr), ...pipes);
}
