import { applyDecorators } from '@nestjs/common';
import { plugin } from '@typegoose/typegoose';
import * as autoPopulate from 'mongoose-autopopulate';
import * as leanVirtuals from 'mongoose-lean-virtuals';

export function UseMongoosePlugin() {
	return applyDecorators(plugin(autoPopulate as any), plugin(leanVirtuals));
}
