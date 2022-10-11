import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Card } from 'src/cards/card.schema';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop()
  name: string;

  @Prop()
  accountID: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cards' }] })
  virtualCards: Card[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
