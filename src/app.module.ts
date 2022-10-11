import { ConfigModule, ConfigService } from '@nestjs/config';

import { BillsModule } from './airtime/bills.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { INestApplication, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards/cards.module';
import { AccountModule } from './account/account.module';

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
    AccountModule,
    CardsModule,
    BillsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('SERVER_PORT');
  }

  static getBaseUrl(app: INestApplication): string {
    let baseUrl = app.getHttpServer().address().address;
    if (baseUrl === '0.0.0.0' || baseUrl === '::') {
      return (baseUrl = 'localhost');
    }
  }
}

//mongodb+srv://divine:$xzZeimPmCzW3sWZr@cluster0.mycdq4k.mongodb.net/?retryWrites=true&w=majority
// docker run --name mongo -p 27017:27017 -d mongo:latest
