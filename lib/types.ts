export interface Shop {
  id: string;
  name: string;
  address: string;
  suburb: string;
  state: string;
  phone: string;
  email: string;
  photo: string;
  rating: number;
  minPrice: number;
  services: string[];
  approved?: boolean;
}

export interface Quote {
  id: string;
  shopId: string;
  name: string;
  email: string;
  phone: string;
  vehicleInfo: string;
  serviceNeeded: string;
  message: string;
  createdAt: string;
}
