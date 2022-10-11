import { Injectable } from '@nestjs/common';
import { PayBillsDto } from './dto/utility.dto';}
import { AirtimeDto } from './dto/airtime.dto'
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

const TEST_URL = 'https://topups-sandbox.reloadly.com/';
const URL = 'https://topups.reloadly.com/';

@Injectable()
export class BillService {
  constructor(
    // @InjectModel(Airtime.name) private airtimeModel: Model<AirtimeDocument>,
    private configService: ConfigService,
  ) { }
  async getOperatorsID() {
    const { data } = await axios.request({
      method: 'POST',
      url: TEST_URL + "operators/ountries/NG",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.get(
          'RELOADLY_ACCESS_TOKEN',
        )}`,
      },
    })

    const transformedData = data.map(function(item, index) {
      return {
        operatorId: item.id,
        item.name,
        item.logoUrls,
        item.data,
        item.fixedAmounts,
        item.fixedAmountsDescriptions
      }
    })

    return transformedData
  }

  async buyAirtimeOrData(dto: AirtimeDto) {
    const { data } = await axios.request({
      method: 'POST',
      url: TEST_URL + "topups",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.get(
          'RELOADLY_AIRTIME_ACCESS_TOKEN',
        )}`,
      },
      data: {
        operatorId: dto.operatorId,
        amount: dto.amount,
        useLocalAmount: true,
        recipientPhone: {
          countryCode: 'NG',
          number: dto.recipientPhone,
        },
      },
    });

    return {
      data.status,
      data.recipientPhoneNumber,
      data.operatorName,
      data.deliveredAmount

    }
  }

  async getBillers() {
    const { data } = await axios.request({
      method: 'POST',
      url: "https://utilities.reloadly.com/billers?serviceType=PREPAID",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.get(
          'RELOADLY_UTILITIES_ACCESS_TOKEN',
        )}`,
      },
    })

    const transformedData = data.map(function(item, index) {
      return {
        billerid: item.id,
        item.name,
        item.type,
        item.data,
        item.minLocalTransactionAmount,
        item.maxLocalTransactionAmount

      }
    })
    return transformedData
  }
  async payUtilityBills(dto: PayBillsDto) {
    const { data } = await axios.request({
      method: 'POST',
      url: "https://utilities-sandbox.reloadly.com/pay",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.get(
          'RELOADLY_ACCESS_TOKEN',
        )}`,
      },
      data: {
        subscriberAccountNumber: dto.subscribersAccountNumber,
        amount: dto.amount,
        billerId: dto.billerId,
        useLocalAmount: null,
      },
    });

    console.log(data);
    return data
  }
}
