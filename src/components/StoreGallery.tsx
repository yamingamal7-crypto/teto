import React, { useState } from 'react';
import { 
  Camera, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  ExternalLink, 
  Maximize2, 
  X, 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { Product } from '../types/product';

interface StorePhotoItem {
  id: string;
  code: string;
  title: string;
  carBrand: 'Chevrolet' | 'Opel' | 'MG' | 'Esperanza' | 'Universal';
  carModel: string;
  category: 'Engine' | 'Brakes' | 'Suspension' | 'Cooling' | 'Electrical' | 'Body';
  imagePath: string;
  oemNumber?: string;
  price: number;
  stock: number;
  description: string;
}

export const STORE_GALLERY_PHOTOS: StorePhotoItem[] = [
  {
    id: 'sg-01',
    code: 'T2-PH-018',
    title: 'ماسورة مياه تبريد حديد نيو أوبترا بكيس الوكالة',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا (New Optra)',
    category: 'Cooling',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__25__acf26c25.jpeg',
    oemNumber: 'GM 23876059',
    price: 420,
    stock: 12,
    description: 'صورة حية لقطع الغيار الأصلية GM مغلفة بالباركود وكود المصنع 23876059 ماسورة مياه حديد تبريد محرك أوبترا.',
  },
  {
    id: 'sg-02',
    code: 'T2-PH-014',
    title: 'ضفيرة محرك كهربائية كاملة وفيش الحساسات GM',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا (New Optra) / كروز',
    category: 'Electrical',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__24__b9bbfce3.jpeg',
    oemNumber: 'GM 23921370',
    price: 1850,
    stock: 4,
    description: 'صورة ضفيرة الأسلاك الأصلية لنيو أوبترا مع فيش الرشاشات وحساس الكرنك وكود GM 23921370.',
  },
  {
    id: 'sg-03',
    code: 'T2-PH-052',
    title: 'جوان وش سلندر معدني مقوى + علامة شبكة شيفروليه ذهبية',
    carBrand: 'Chevrolet',
    carModel: 'كروز (Cruze) / نيو أوبترا',
    category: 'Engine',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__17__8011ccbc.jpeg',
    oemNumber: 'GM 55568529',
    price: 680,
    stock: 9,
    description: 'جوان رأس محرك متعدد الطبقات MLS أصلي لمنع خلط الزيت بالماء وعلامة شيفروليه معدنية أصلية.',
  },
  {
    id: 'sg-04',
    code: 'T2-PH-041',
    title: 'مقاس زيت محرك شيفروليه أوبترا بمقبض حراري أصفر',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا / كروز',
    category: 'Engine',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__21__7b236054.jpeg',
    oemNumber: 'GM 96415065',
    price: 160,
    stock: 22,
    description: 'سيخ قياس مستوى زيت المحرك من الإستانلس ستيل المعالج حرارياً.',
  },
  {
    id: 'sg-05',
    code: 'T2-PH-045',
    title: 'شخال طلمبة زيت ألومنيوم مع شبكة تنقية وقواعد تثبيت',
    carBrand: 'Chevrolet',
    carModel: 'أوبترا / كروز / أفيو',
    category: 'Engine',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__18__761cbd8e.jpeg',
    oemNumber: 'GM 96350159',
    price: 520,
    stock: 7,
    description: 'مصفاة سحب الزيت مع شبكة فولاذية وقواعد تثبيت سبائكية صلبة تمنع انسداد دائرة التزييت.',
  },
  {
    id: 'sg-06',
    code: 'T2-PH-029',
    title: 'مارش وبندكس تشغيل مع ترس حذافة المحرك',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا (New Optra)',
    category: 'Electrical',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__19__eef52afa.jpeg',
    oemNumber: 'Valeo / GM 96952005',
    price: 1650,
    stock: 5,
    description: 'مارش أصلي كامل 12V مع بندكس وموبينة وبكرات مساعدة لعزم تدوير سلس وفوري.',
  },
  {
    id: 'sg-07',
    code: 'T2-PH-023',
    title: 'حامل شكمان وميزان عفشة أمامي ألومنيوم مقسى',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا / أفيو',
    category: 'Suspension',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__23__1b2bad47.jpeg',
    oemNumber: 'GM 96444919',
    price: 190,
    stock: 18,
    description: 'قفزان وحوامل ميزان العفشة من سبيكة الألومنيوم المقاومة للكسر والاهتزاز.',
  },
  {
    id: 'sg-08',
    code: 'T2-PH-033',
    title: 'فلنجة وقربة عوّامة طرمبة بنزين نيو أوبترا بالخراطيم',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا (New Optra)',
    category: 'Engine',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__22__e1f39473.jpeg',
    oemNumber: 'GM 96447642',
    price: 490,
    stock: 8,
    description: 'فلنجة علوية كاملة لخزان الوقود مع مواسير الضغط والراجع وفيش الحساسات.',
  },
  {
    id: 'sg-09',
    code: 'T2-PH-020',
    title: 'عدادات سرعة وتابلوه نيو أوبتra أصلي',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا (New Optra)',
    category: 'Electrical',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__20__99ff36af.jpeg',
    oemNumber: 'GM 96452912',
    price: 2400,
    stock: 3,
    description: 'مجموعة عدادات سرعة و RPM وشاشات الرحلات الرقمية نيو أوبترا وكالة.',
  },
  {
    id: 'sg-10',
    code: 'T2-PH-026',
    title: 'سير كاتينة أصلي Gates أوبل أسترا وشيفروليه كروز',
    carBrand: 'Opel',
    carModel: 'أسترا (Astra G/H/J)',
    category: 'Engine',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__1__7cb70c74.jpeg',
    oemNumber: 'Gates 5414465102604',
    price: 650,
    stock: 11,
    description: 'سير كاتينة بلجيكي الصنع مقاوم للحرارة العالية معزز بألياف الأراميد.',
  },
  {
    id: 'sg-11',
    code: 'T2-PH-056',
    title: 'تيل فرامل خلفي نيو أوبترا سيراميك عالي التحمل',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا (New Optra)',
    category: 'Brakes',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__2__ebd69d9d.jpeg',
    oemNumber: 'GM 96405130',
    price: 480,
    stock: 15,
    description: 'طقم تيل فرامل خلفي سيراميك مانع للتآكل السريع ولا يصدر صفير.',
  },
  {
    id: 'sg-12',
    code: 'T2-PH-065',
    title: 'كولر ومبرد زيت محرك ألومنيوم شيفروليه كروز وكابتيفا',
    carBrand: 'Chevrolet',
    carModel: 'كروز (Cruze) / كابتيفا',
    category: 'Cooling',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__3__47d66f46.jpeg',
    oemNumber: 'GM 55355603',
    price: 1350,
    stock: 6,
    description: 'وحدة مبرد زيت ألومنيوم لعلاج خلط الزيت مع مياه التبريد بمحركات الإيكوتيك.',
  },
  {
    id: 'sg-13',
    code: 'T2-PH-071',
    title: 'طقم مساعدين أمامي هيدروليك غاز MG 5 و MG ZS',
    carBrand: 'MG',
    carModel: 'MG 5 / MG ZS',
    category: 'Suspension',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__4__7b34b496.jpeg',
    oemNumber: 'SAIC 10398210',
    price: 1980,
    stock: 8,
    description: 'مساعدين أمامي أصليين من شركة SAIC المالكة لـ MG بنظام ضغط النيتروجين الثنائي.',
  },
  {
    id: 'sg-14',
    code: 'T2-PH-083',
    title: 'طلمبة مياه تبريد إسبيرانزا A516 وتيجو محرك شيري',
    carBrand: 'Esperanza',
    carModel: 'A516 / تيجو (Tiggo)',
    category: 'Cooling',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__5__af7bdd2f.jpeg',
    oemNumber: 'Chery 481H-1307010',
    price: 490,
    stock: 14,
    description: 'طلمبة تبريد محرك أكتيكو مع ريش سحب معدنية مقاومة للكسر ومانع تسريب سيليكوني.',
  },
  {
    id: 'sg-15',
    code: 'T2-PH-092',
    title: 'طقم تيل فرامل أمامي أوبل أسترا J وإنسيجنيا',
    carBrand: 'Opel',
    carModel: 'أسترا (Astra J) / إنسيجنيا',
    category: 'Brakes',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__6__aa423a15.jpeg',
    oemNumber: 'Opel GM 13301207',
    price: 890,
    stock: 10,
    description: 'تيل فرامل أمامي أصلي مع حساس تآكل إلكتروني يرسل إشارة لتابلوه السيارة.',
  },
  {
    id: 'sg-16',
    code: 'T2-PH-001',
    title: 'بدال بنزين إلكتروني وحساس نيو أوبترا GM',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا (New Optra)',
    category: 'Electrical',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__7__2855a510.jpeg',
    oemNumber: 'GM 96424732',
    price: 1150,
    stock: 6,
    description: 'بدال دعسة وقود إلكتروني متكامل مع حساس TPS لقراءة زاوية الدعسة دون تأخير.',
  },
  {
    id: 'sg-17',
    code: 'T2-PH-058',
    title: 'شداد سير ومجموعة بكرة نيو أوبترا وكروز أوتوماتيك',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا / كروز',
    category: 'Engine',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__8__d7b191c3.jpeg',
    oemNumber: 'INA 534014710',
    price: 540,
    stock: 9,
    description: 'شداد سير أصلي ألماني يمنع صفير السيور ويحافظ على ثبات دوران الدينامو والتكييف.',
  },
  {
    id: 'sg-18',
    code: 'T2-PH-060',
    title: 'قربة مساحات وموتور رشاشات مياه الزجاج نيو أوبترا',
    carBrand: 'Chevrolet',
    carModel: 'نيو أوبترا (New Optra)',
    category: 'Cooling',
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__9__6bc87795.jpeg',
    oemNumber: 'GM 96476655',
    price: 290,
    stock: 16,
    description: 'قربة مياه زجاج أمامية من البلاستيك المقوى مع موتور رشاش مياه عالي الضغط.',
  },
];

interface StoreGalleryProps {
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const StoreGallery: React.FC<StoreGalleryProps> = ({ onAddToCart }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<StorePhotoItem | null>(null);

  // Filtered store photos
  const filteredPhotos = STORE_GALLERY_PHOTOS.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCode = item.code.toLowerCase().includes(q);
      const matchOem = item.oemNumber?.toLowerCase().includes(q) || false;
      const matchModel = item.carModel.toLowerCase().includes(q);
      if (!matchTitle && !matchCode && !matchOem && !matchModel) return false;
    }
    if (selectedBrand !== 'all' && item.carBrand !== selectedBrand) {
      return false;
    }
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleAddPhotoItemToCart = (item: StorePhotoItem) => {
    const productAdapter: Product = {
      id: item.code,
      name: item.title,
      nameAr: item.title,
      partCode: item.code,
      brand: item.oemNumber || item.carBrand,
      carBrand: item.carBrand,
      carModel: item.carModel,
      category: item.category,
      price: item.price,
      costPrice: Math.round(item.price * 0.75),
      stock: item.stock,
      reorderLevel: 3,
      imageUrl: item.imagePath,
      description: item.description,
      barcode: item.oemNumber ? item.oemNumber.replace(/[^0-9]/g, '') : '622100000000',
      isOriginal: true,
    };
    onAddToCart(productAdapter, 1);
  };

  return (
    <section id="store-gallery" className="py-12 bg-neutral-950 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-l from-neutral-900 to-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-10 mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-white mb-3 uppercase tracking-wider">
              <Camera className="w-4 h-4 text-red-500" />
              <span>معرض ومخازن TITO STORE الفعلي | POWERED BY ZEUS</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
              ألبوم صور قطع الغيار الحقيقية من رفوف المحل
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
              المالك: <span className="text-white font-bold">طاهر تيتو</span> · مدير المحل: <span className="text-white font-bold">أحمد</span> · تليفون: <span className="text-white font-mono font-bold">01020272266</span> · 📍 <span className="text-neutral-300">الحرفيين، السلام، القاهرة - شارع المرسيدس</span>
              <br />
              معاينة قطع الغيار الفعلية داخل كراتينها وأكياس التوكيل الأصلية (GM, Opel, MG, Chery) مع كود المحل <span className="font-mono text-white font-bold">T2-PH</span> وأرقام الـ OEM وكود الباركود.
            </p>

            {/* Catalog PDF Action Card */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/assets/aistudio/TITO_Official_Brand_Catalog_Review__1__213032e4.pdf"
                target="_blank"
                rel="noreferrer"
                download="TITO_Official_Brand_Catalog_Review.pdf"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>تحميل كتالوج المحل المعتمد (PDF)</span>
              </a>

              <a
                href="/assets/aistudio/TITO_Official_Brand_Catalog_Review__1__213032e4.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors border border-neutral-700"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>فتح واستعراض الكتالوج مباشرة</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>

              <span className="text-xs text-neutral-400">
                * كتالوج شامل لـ 87 صنف نيو أوبترا وكروز وأسترا و MG وإسبيرانزا
              </span>
            </div>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بكود التخزين T2-PH أو اسم القطعة أو رقم الوكالة..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pr-9 pl-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Brand Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            {[
              { id: 'all', label: 'جميع الماركات' },
              { id: 'Chevrolet', label: 'شيفروليه' },
              { id: 'Opel', label: 'أوبل' },
              { id: 'MG', label: 'MG' },
              { id: 'Esperanza', label: 'إسبيرانزا' },
            ].map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedBrand === brand.id
                    ? 'bg-red-600 text-white font-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {brand.label}
              </button>
            ))}
          </div>

        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col shadow-lg"
            >
              {/* Photo Area with overlay & badge */}
              <div className="relative aspect-4/3 bg-neutral-950 overflow-hidden cursor-pointer" onClick={() => setSelectedPhotoModal(item)}>
                <img
                  src={item.imagePath}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // graceful fallback
                    (e.currentTarget as HTMLImageElement).src = '/src/assets/images/part_engine_turbocharger_1793629993738.jpg';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                  <span className="px-2.5 py-1 bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-white font-mono text-[11px] font-bold rounded-lg shadow-sm">
                    {item.code}
                  </span>
                  {item.oemNumber && (
                    <span className="px-2 py-0.5 bg-neutral-900/90 text-neutral-300 font-mono text-[10px] rounded border border-neutral-700">
                      {item.oemNumber}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold text-[11px] text-white bg-neutral-950/80 px-2 py-0.5 rounded backdrop-blur-sm border border-neutral-800">
                    {item.carModel}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-300 bg-neutral-950/70 px-2 py-0.5 rounded backdrop-blur-sm">
                    <Eye className="w-3.5 h-3.5" />
                    <span>معاينة</span>
                  </div>
                </div>
              </div>

              {/* Information Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-400 font-medium">سعر البيع</span>
                    <span className="text-base font-extrabold text-white font-mono tabular-nums">
                      {item.price} <span className="text-xs font-normal text-neutral-400 font-sans">ج.م</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPhotoModal(item)}
                      className="p-2 text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                      title="تكبير الصورة والتفاصيل"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleAddPhotoItemToCart(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-all shadow-md shadow-red-600/30 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>إضافة للفاتورة</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            <Camera className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">لا توجد صور مطابقة لبحثك</h3>
            <p className="text-xs text-neutral-400 mt-1">
              جرب تغيير الكود أو اختيار ماركة أخرى.
            </p>
          </div>
        )}

      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md animate-fade-in text-right">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Image viewer */}
            <div className="md:w-1/2 bg-black flex items-center justify-center relative min-h-[300px]">
              <img
                src={selectedPhotoModal.imagePath}
                alt={selectedPhotoModal.title}
                className="max-h-[460px] w-full object-contain p-2"
              />
              <div className="absolute top-3 right-3 bg-neutral-950/80 px-2.5 py-1 rounded-lg text-white font-mono text-xs font-bold border border-neutral-800">
                {selectedPhotoModal.code}
              </div>
            </div>

            {/* Info Column */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>قطعة أصلية ومصورة من المعرض</span>
                  </span>
                  <button
                    onClick={() => setSelectedPhotoModal(null)}
                    className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {selectedPhotoModal.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {selectedPhotoModal.description}
                </p>

                <div className="space-y-2 bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800/80 text-xs mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">السيارة المتوافقة:</span>
                    <span className="text-white font-medium">{selectedPhotoModal.carModel}</span>
                  </div>
                  {selectedPhotoModal.oemNumber && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">رقم القطعة OEM:</span>
                      <span className="font-mono text-white">{selectedPhotoModal.oemNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-400">الرصيد بالمحل:</span>
                    <span className="text-emerald-400 font-bold tabular-nums">{selectedPhotoModal.stock} قطع متوفرة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">السعر شامل الضريبة:</span>
                    <span className="text-white font-extrabold text-sm tabular-nums font-mono">{selectedPhotoModal.price} ج.م</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
                <button
                  onClick={() => {
                    handleAddPhotoItemToCart(selectedPhotoModal);
                    setSelectedPhotoModal(null);
                  }}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>إضافة للفاتورة</span>
                </button>

                <a
                  href={`https://wa.me/201020272266?text=${encodeURIComponent(
                    `مرحباً TITO STORE، أريد الاستفسار عن القطعة كود: ${selectedPhotoModal.code} (${selectedPhotoModal.title}) لسيارة ${selectedPhotoModal.carModel}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>طلب واتساب</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
