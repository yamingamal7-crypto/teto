export type CategoryId = 
  | 'all'
  | 'brakes'
  | 'engine'
  | 'suspension'
  | 'lighting'
  | 'filters'
  | 'cooling'
  | 'electrical';

export interface VehicleCompatibility {
  make: string;
  model: string;
  years: number[];
  engine?: string;
}

export interface Part {
  id: string;
  nameAr: string;
  nameEn: string;
  oemNumber: string;
  brand: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  inStock: number;
  rating: number;
  reviewsCount: number;
  condition: 'أصلي وكالة (OEM)' | 'أداء رياضي معتمد' | 'درجة أولى ألماني' | 'معتمد ياباني';
  warranty: string;
  origin: string;
  image: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  compatibleVehicles: VehicleCompatibility[];
  tags: string[];
  featured?: boolean;
}

export interface SelectedVehicle {
  make: string;
  model: string;
  year: number;
  engine?: string;
  vin?: string;
}

export interface CartItem {
  part: Part;
  quantity: number;
  includeInstallation: boolean;
}

export interface DiagnosticSymptom {
  id: string;
  titleAr: string;
  descriptionAr: string;
  likelyCauseAr: string;
  recommendedCategory: CategoryId;
  recommendedPartIds: string[];
}
