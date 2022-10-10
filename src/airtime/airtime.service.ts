import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Airtime, AirtimeDocument } from './airtime.schema';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { fetch } from 'node-fetch';

const TEST_URL = 'https://topups-sandbox.reloadly.com/topups';
const URL = 'https://topups.reloadly.com/topups';

@Injectable()
export class AirtimeService {
  constructor(
    // @InjectModel(Airtime.name) private airtimeModel: Model<AirtimeDocument>,
    private configService: ConfigService,
  ) {}

  async buyAirtime() {
    const response = await axios({
      method: 'post',
      url: TEST_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.get(
          'RELOADLY_ACCESS_TOKEN',
        )}`,
      },
      data: {
        // operatorId: 1100,
        amount: 832,
        useLocalAmount: true,
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
