export class Role {
  constructor(
    public id: number,
    public name: string,
    public slug: string,
    public description: string,
    public created_at: string,
    public updated_at: Date
  ) {}
}
