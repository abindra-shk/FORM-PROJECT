export interface FormItem {
  index?: number;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  ratePerHour: number;
  hours: number;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: string;
}
