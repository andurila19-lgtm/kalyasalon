export interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  date: string;
  serviceUsed?: string;
  verified?: boolean;
}
