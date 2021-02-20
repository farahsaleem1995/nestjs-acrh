import { InternalServerErrorException } from '@nestjs/common';
import { Schema } from 'mongoose';
import { BaseModel } from '../models';

export type Ref<T extends BaseModel> = T | Schema.Types.ObjectId;
