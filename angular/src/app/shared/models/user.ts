import { Role } from './role';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public email_verified_at: boolean,
    public role_id: number,
    public avatar: string,
    public created_at: string,
    public updated_at: string,
    public role: Role
  ) {}
}
