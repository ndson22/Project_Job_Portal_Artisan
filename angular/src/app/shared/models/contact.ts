import { Seeker } from './seeker';
import { User } from './user';
import { Company } from './company';
import { Gender } from './gender';
export class Contact {
    constructor(
      public id: number,
      public name: string,
      public email: string,
      public phone_number: number,
      public message: string,
      public gender: Gender,
      public birthday: Date,
      public company: Company,
      public created_at: Date,
      public facebook: string,
      public address: string,
      public image: string,
      public user_id: number,
    ) { }
  }
