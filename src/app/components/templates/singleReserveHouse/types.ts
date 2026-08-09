export interface Passenger {
  _id?: string;

  name: string;

  family: string;

  gender: "male" | "female" | "";

  nationalId: string;

  birthDate: string;

  phone?: string;

  email?: string;
}
