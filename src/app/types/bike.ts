export interface BikeItem {
  bike_id: string;
  lat: number;
  lon: number;
  is_reserved: number;
  is_disabled: number;
  vehicle_type: string;
  total_bookings: number;
}

export interface BikeResponse {
  last_updated: number;
  ttl: number;
  total_count: number;
  nextPage: boolean;
  data: {
    // bike or bikes
    [x: string]: BikeItem[] | BikeItem | null;
  };
}
