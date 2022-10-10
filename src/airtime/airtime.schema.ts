import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type AirtimeDocument = Airtime & Document;

@Schema()
export class Airtime {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  amount: number;

  @Prop()
  operatorId: number;

  @Prop()
  recipientPhone: number;

  @Prop({ default: true })
  useLocalAmount: boolean;
}

export const AirtimeSchema = SchemaFactory.createForClass(Airtime);
