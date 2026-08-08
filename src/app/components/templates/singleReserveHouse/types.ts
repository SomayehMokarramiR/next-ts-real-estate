export interface Passenger {
  _id?: string;

  name: string;
  family: string;
  gender: string;
  nationalId: string;
  birthDate: string;

  phone?: string;
  email?: string;
}
