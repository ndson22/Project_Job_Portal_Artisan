export class Job {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public company_name: string,
    public location: string,
    public is_active: boolean,
    public description: string,
    public created_at: string
  ) {}
}
