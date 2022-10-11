import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.schema';
import axios from 'axios';
import { AccountDto, CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private configService: ConfigService,
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  headers = {
    accept: 'application/json',
    'mono-sec-key': this.configService.get('MONO_SECRET_KEY'),
    'content-type': 'application/json',
  };
  async create(dto: CreateAccountDto) {
    const options = {
      method: 'POST',
      url: 'https://api.withmono.com/issuing/v1/accountholders',
      headers: this.headers,
      data: {
        address: {
          address_line1: dto.addressLine,
          lga: dto.lga,
          city: dto.city,
          state: dto.state,
        },
        identity: {
          type: dto.identityType,
          number: dto.numberID,
          url: dto.identityUrl,
        },
        entity: dto.entity,
        first_name: dto.firstname,
        last_name: dto.lastname,
        bvn: dto.bvn,
        phone: dto.phoneNumber,
      },
    };

    const response = await axios.request(options);
    const newAccount = new this.accountModel({
      name: dto.firstname + '' + dto.lastname,
      accountID: response.data.data.id,
    });
    newAccount.save();
    return newAccount;
  }

  async findOne(dto: AccountDto) {
    const options = {
      method: 'GET',
      url: `https://api.withmono.com/issuing/v1/accountholders/${dto.accountID}`,
      headers: this.headers,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  update(id, dto: UpdateAccountDto) {
    const options = {
      method: 'PATCH',
      url: `https://api.withmono.com/issuing/v1/accountholders/${id}`,
      headers: this.headers,
      data: {
        address: {
          address_line1: dto.addressLine,
          lga: dto.lga,
          city: dto.city,
          state: dto.state,
        },
        identity: {
          type: dto.identityType,
          number: dto.numberID,
          url: dto.identityUrl,
        },
        entity: dto.entity,
        first_name: dto.firstname,
        last_name: dto.lastname,
        bvn: dto.bvn,
        phone: dto.phoneNumber,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async deleteAccount(id: string) {
    const options = {
      method: 'DELETE',
      url: `https://api.withmono.com/issuing/v1/accountholders/${id}`,
      headers: this.headers,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
