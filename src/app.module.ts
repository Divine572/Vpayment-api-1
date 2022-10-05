import { ConfigModule, ConfigService } from '@nestjs/config';

import { AirtimeModule } from './airtime/airtime.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
    }),
    CardsModule,
    AirtimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
