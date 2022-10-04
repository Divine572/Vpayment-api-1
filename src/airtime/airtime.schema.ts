import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type AirtimeDocument = Airtime & Document;

@Schema()
export class Airtime {
  @Transform(({ value }) => value.toString())
  _id: string;
}

export const AirtimeSchema = SchemaFactory.createForClass(Airtime);
