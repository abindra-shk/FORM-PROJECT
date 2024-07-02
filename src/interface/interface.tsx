import { Dayjs } from "dayjs";

export interface FormItem {
  index?: number;
  _id: string;
  name: string;
  email: string;
  address: string;
  ratePerHour: number;
  hours: number;
  total: number;
  startDate: Dayjs | null;
  endDate:Dayjs | null;
  days: number;
}
