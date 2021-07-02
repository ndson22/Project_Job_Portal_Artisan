export class Company {
  constructor(
    public name: string,
    public short_name: string,
    public email: string,
    public address: string,
    public province_id: number,
    public location: string,
    public jobPostAmount: number,
    public id?: number,
    public user_id?: number,
    public code?: string,
    public created_at?: string,
    public updated_at?: string,
    public image?: string,
    public description?: string,
  ) {}
}
