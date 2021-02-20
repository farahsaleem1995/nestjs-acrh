import { MongooseModule } from '@nestjs/mongoose';
import { ClassConstructor } from 'class-transformer';
import { Schema, Model, Document } from 'mongoose';

export * from './inject-repoistory.decorator';
export * from './sort-key.decorator';
export * from './sort-direction.decorator';
export * from './query-page.decorator';
export * from './query-page-size.decorator';

// export function testDecorator(schema: Schema<Document<any>, Model<Document<any>>>) {
// 	return function (ctr: ClassConstructor<any>) {
// 		MongooseModule.forFeature([{ name: ctr.name, schema: schema }]);
// 	};
// }
