import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from 'src/account/account.schema';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop()
  cardId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  ownerAccount: Account;
}

export const CardSchema = SchemaFactory.createForClass(Card);
