export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public email_verified_at?: boolean,
    public role_id?: string,
    public avatar?: string,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
