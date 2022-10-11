import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto, FetchTransactionsDto, FundCardDto } from './card.dto';
import axios from 'axios';
import { Card, CardDocument } from './card.schema';
import { Account, AccountDocument } from 'src/account/account.schema';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name)
    private readonly cardModel: Model<CardDocument>,
    private configService: ConfigService,
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  headers = {
    accept: 'application/json',
    'mono-sec-key': this.configService.get('MONO_SECRET_KEY'),
    'content-type': 'application/json',
  };
  async createVirtualCard(dto: CreateCardDto) {
    const options = {
      method: 'POST',
      url: 'https://api.withmono.com/issuing/v1/cards/virtual',
      headers: this.headers,
      data: {
        account_holder: dto.accountHolderId,
        currency: dto.currency,
        amount: dto.amount,
        fund_source: 'ngn',
      },
    };

    const response = await axios.request(options);
    const account: any = await this.accountModel
      .find({ accountID: dto.accountHolderId })
      .exec();
    const newCard = new this.cardModel({
      cardId: response.data.data.id,
      ownerAccount: account,
    });

    newCard.save();

    await this.accountModel.updateOne(
      { _id: account._id },
      {
        $push: { virtualCards: newCard },
      },
    );

    return newCard;
  }

  async fundVirtualCard(fundCardDto: FundCardDto) {
    const options = {
      method: 'POST',
      url: `https://api.withmono.com/issuing/v1/cards/${fundCardDto.cardID}/fund`,
      headers: this.headers,
      data: {
        amount: fundCardDto.amount,
        fund_source: 'ngn',
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

  async fetchCardDetails(id: string) {
    const options = {
      method: 'GET',
      url: `https://api.withmono.com/issuing/v1/cards/${id}/`,
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

  async fetchCardTransactions(fetchTransactionsDto: FetchTransactionsDto) {
    const options = {
      method: 'GET',
      url: `https://api.withmono.com/issuing/v1/cards/${fetchTransactionsDto.id}/transactions?page=${fetchTransactionsDto.page}&from=${fetchTransactionsDto.from}&to=${fetchTransactionsDto.to}`,
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
        return error;
      });
  }

  async deleteVirtualCard(id: string) {
    const options = {
      method: 'DELETE',
      url: `https://api.withmono.com/issuing/v1/cards/${id}/`,
      headers: this.headers,
    };

    const response = await axios.request(options);
    const deletedCard = await this.cardModel
      .findOneAndDelete({ cardId: id })
      .exec();
    await this.accountModel.findOneAndUpdate(
      {
        cardId: {
          $in: [deletedCard],
        },
      },
      {
        $pullAll: { virtualCards: [deletedCard] },
      },
    );
    return response.data;
  }
}
