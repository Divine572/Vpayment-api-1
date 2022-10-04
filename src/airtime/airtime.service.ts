import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Airtime, AirtimeDocument } from './airtime.schema';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { fetch } from 'node-fetch';

const URL = 'https://topups-sandbox.reloadly.com/topups';

@Injectable()
export class AirtimeService {
  constructor(
    @InjectModel(Airtime.name) private airtimeModel: Model<AirtimeDocument>,
    private configService: ConfigService,
  ) {}

  async getToken() {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://auth.reloadly.com/oauth/token',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          client_id: this.configService.get('RELOADLY_TEST_API_CLIENT_ID'),
          client_secret: this.configService.get(
            'RELOADLY_TEST_API_CLIENT_SECRET',
          ),
          grant_type: 'client_credentials',
          audience: 'https://topups.reloadly.com',
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  async buyAirtime() {
    const response = await axios({
      method: 'post',
      url: URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.get(
          'RELOADLY_ACCESS_TOKEN',
        )}`,
      },
      data: {
        operatorId: 1100,
        amount: 832,
        useLocalAmount: false,
        customIdentifier: 'airtime-top-up',
        recipientEmail: 'jeanb@reloadly.com',
        recipientPhone: {
          countryCode: 'NG',
          number: '0503971821',
        },
        senderPhone: {
          countryCode: 'CA',
          number: '11231231231',
        },
      },
    });

    console.log(response);
  }
}
