export class Job {
  constructor(
    public name: string,
    public id: number,
    public title: string,
    public user_id: number,
    public company_id: number,
    public jobTypes: string,
    public from_salary: number,
    public to_salary: number,
    public employeePositions: string,
    public experience: number,
    public typeOfEmployments: string,
    public expire: Date,
    public description: string,
    public employee_quantity: number,
    public genders: string,
    public address: string,
    public is_active: number,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}
