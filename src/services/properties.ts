import api from './api';

export interface Property {
  id: number;
  title: string;
  description: string;
  operation_type: 'alquiler' | 'compra' | 'temporal';
  property_type: string;
  property_subtype?: string;
  price: number;
  price_currency: 'USD' | 'ARS';
  price_per_m2?: number;
  expenses?: number;
  expenses_currency?: 'USD' | 'ARS';
  total_surface?: number;
  covered_surface?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  floor_number?: number;
  is_new?: boolean;
  property_age?: string;
  disposition?: string;
  orientation?: string;
  address?: string;
  province?: string;
  city?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  is_featured?: boolean;
  featured_type?: string;
  advertiser_type?: 'inmobiliaria' | 'dueno_directo';
  views_count?: number;
  contacts_count?: number;
  images: Array<{
    id: number;
    image_url: string;
    is_main: boolean;
    sort_order: number;
  }>;
  amenities?: string[];
  characteristics?: string[];
  services?: string[];
  room_types?: string[];
  branch_name?: string;
  advertiser_logo?: string;
  advertiser_name?: string;
  branch_phone?: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilters {
  operation?: string;
  property_type?: string;
  property_subtype?: string;
  price_min?: number;
  price_max?: number;
  price_currency?: 'USD' | 'ARS';
  surface_min?: number;
  surface_max?: number;
  rooms_min?: number;
  rooms_max?: number;
  bedrooms_min?: number;
  bedrooms_max?: number;
  bathrooms_min?: number;
  bathrooms_max?: number;
  garages_min?: number;
  garages_max?: number;
  amenities?: number[];
  characteristics?: number[];
  services?: number[];
  disposition?: string;
  advertiser_type?: string;
  age?: string;
  province?: string;
  city?: string;
  neighborhood?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  sort?: 'price_asc' | 'price_desc' | 'm2_asc' | 'm2_desc' | 'newest';
  page?: number;
  limit?: number;
}

interface PropertyListResponse {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const propertyService = {
  async list(filters: PropertyFilters = {}): Promise<PropertyListResponse | { error: string }> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          params.append(key, value.join(','));
        } else {
          params.append(key, String(value));
        }
      }
    });

    const queryString = params.toString();
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<PropertyListResponse>(endpoint);
    
    if (response.error) {
      return { error: response.error };
    }
    
    return response.data as PropertyListResponse;
  },

  async getById(id: number): Promise<Property | { error: string }> {
    const response = await api.get<Property>(`/properties/${id}`);
    
    if (response.error) {
      return { error: response.error };
    }
    
    return response.data as Property;
  },

  async create(data: Partial<Property>): Promise<Property | { error: string }> {
    const response = await api.post<Property>('/properties', data);
    
    if (response.error) {
      return { error: response.error };
    }
    
    return response.data as Property;
  },

  async update(id: number, data: Partial<Property>): Promise<Property | { error: string }> {
    const response = await api.put<Property>(`/properties/${id}`, data);
    
    if (response.error) {
      return { error: response.error };
    }
    
    return response.data as Property;
  },

  async delete(id: number): Promise<{ success: boolean } | { error: string }> {
    const response = await api.delete<{ message: string }>(`/properties/${id}`);
    
    if (response.error) {
      return { error: response.error };
    }
    
    return { success: true };
  },

  async getSimilar(id: number): Promise<Property[] | { error: string }> {
    const response = await api.get<Property[]>(`/properties/${id}/similar`);
    
    if (response.error) {
      return { error: response.error };
    }
    
    return response.data as Property[];
  },

  async report(id: number, reason: string, description?: string): Promise<{ success: boolean } | { error: string }> {
    const response = await api.post<{ message: string }>(`/properties/${id}/report`, { reason, description });
    
    if (response.error) {
      return { error: response.error };
    }
    
    return { success: true };
  },
};

export default propertyService;
