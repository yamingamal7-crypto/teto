export type ProductCategory = 
  | 'Brakes'       // فرامل
  | 'Engine'       // محرك وسير
  | 'Suspension'   // عفشة ومساعدات
  | 'Cooling'      // تبريد ورديتر
  | 'Electrical'   // كهرباء وحساسات
  | 'Filters'      // فلاتر وزيوت
  | 'Body';        // صاج وإكسسوارات وفوانيس

export interface Product {
  id: string;               // كود الصنف الفريد (مثل: T2-PH-056)
  name: string;             // اسم قطعة الغيار
  nameAr?: string;          // الاسم بالعربية
  partCode: string;         // كود الرف / الكتالوج (T2-PH-XXX)
  brand: string;            // الشركة الصانعة (مثل: Bosch, Brembo, Gates, GM, CTR)
  carBrand: 'Chevrolet' | 'Opel' | 'MG' | 'Esperanza' | 'Universal'; // ماركة السيارة
  carModel: string;         // موديل السيارة (مثل: نيو أوبترا، كروز، أسترا، كابتيفا)
  category: ProductCategory;// قسم القطعة
  price: number;            // سعر البيع (ج.م أو ر.س)
  costPrice?: number;       // سعر التكلفة (للمدير)
  stock: number;            // الكمية الحالية بالمخزن
  reorderLevel: number;     // حد الطلب
  imageUrl: string;         // رابط أو مسار صورة القطعة
  description: string;      // وصف فني وملاحظات التركيب
  barcode?: string;         // الباركود الدولي
  isOriginal: boolean;      // أصلي وكالة أم درجة أولى معتمد
}
