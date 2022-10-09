import { ConfigModule, ConfigService } from '@nestjs/config';

import { AirtimeModule } from './airtime/airtime.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    CardsModule,
    AirtimeModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//mongodb+srv://divine:$xzZeimPmCzW3sWZr@cluster0.mycdq4k.mongodb.net/?retryWrites=true&w=majority
// docker run --name mongo -p 27017:27017 -d mongo:latest
