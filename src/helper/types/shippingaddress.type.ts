export type ShippingAddress = {
  _id: string; 
  full_name: string;
  phone: string;
  province_city: string;
  district: string;
  ward_commune: string;
  specific_address: string;
  is_default: boolean;
  user_id: string;
};
export interface ApiResponse {
  message: string;
  status: number;
  metadata: ShippingAddress[];
}