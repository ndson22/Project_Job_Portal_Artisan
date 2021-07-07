import { Province } from './province';
import { User } from './user';

export class Company {
  constructor(
    public name: string,
    public short_name: string,
    public email: string,
    public address: string,
    public province_id: number,
    public location: string,
    public is_active: boolean,
    public jobPostAmount: number,
    public code: string,
    public id: number,
    public user_id: number,
    public phone_number: number,
    public created_at: string,
    public updated_at: string,
    public verified_at: string,
    public image: string,
    public description: string,
    public facebook: string,
    public website: string,
    public map_link: string,
    public branch: string,
    public province: Province,
    public user: User
  ) {}
}
