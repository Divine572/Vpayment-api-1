import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

import * as Joi from 'joi';
import { CardsModule } from './cards/cards.module';
import { AirtimeModule } from './airtime/airtime.module';
import mongodbConfig from './shared/config/mongodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongodbConfig],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/vpayment'),
    CardsModule,
    AirtimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
