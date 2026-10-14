export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  imageUrl: string;
  customerRating: number;
  country: string;
  countryCode: string;
  totalSales: number;
  targetSales: number;
  discontinued: boolean;
}
