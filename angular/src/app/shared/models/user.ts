import { Company } from './company';
import { Role } from './role';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public email_verified_at: Date,
    public role_id: number,
    public avatar: string,
    public created_at: Date,
    public updated_at: Date,
    public role: Role,
    public company: Company
  ) {}
}
