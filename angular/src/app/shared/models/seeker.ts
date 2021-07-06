import { SeekerExperience } from './seeker-experience';
import { Gender } from "./gender";

export class Seeker {
  constructor(
    public id: number,
    public name: string,
    public gender: Gender,
    public birthday: Date,
    public email: string,
    public phone_number: number,
    public facebook: string,
    public address: string,
    public image: string,
    public seekerExperience: SeekerExperience,
  ) {}
}
