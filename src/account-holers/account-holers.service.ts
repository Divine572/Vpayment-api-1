import { Injectable } from '@nestjs/common';
import axios from 'axios';

const URL = 'https://api.withmono.com/issuing/v1/accountholder';

@Injectable()
export class AccountHolersService {
  async create() {
    const response = await axios.post(URL, {
      data: {
        first_name: 'ifeoluwa',
        last_name: 'olanipekun',
        bvn: '00000000',
        phone: '2348209840585',
        entity: 'INDIVIDUAL',
        email: 'ife111@gmail.com', //optional
        address: {
          address_line1: '12 banana island',
          lga: 'lag',
          city: 'lagos',
          state: 'lagos',
        }, // optional
        dob: {
          date: '22-10-1991', // the format is dd-mm-yyyy e.g 01-12-1960
        }, // required only if the identity type is a DRIVERS_LICENSE
        identity: {
          type: 'INTERNATIONAL_PASSPORT',
          number: '00000000',
        },
      },
    });
  }
}
