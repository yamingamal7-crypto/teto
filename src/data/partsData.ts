import { Part, DiagnosticSymptom } from '../types/parts';

export const SHOWROOM_HERO_IMAGE = '/src/assets/images/hero_auto_parts_showroom_1793629992714.jpg';

export const CATEGORIES_LIST = [
  { id: 'all', nameAr: 'جميع القطع', icon: 'Grid' },
  { id: 'brakes', nameAr: 'المكابح والفرامل', icon: 'Disc' },
  { id: 'engine', nameAr: 'المحرك والتيربو', icon: 'Gauge' },
  { id: 'suspension', nameAr: 'التعليق والمساعدات', icon: 'Sliders' },
  { id: 'lighting', nameAr: 'الإضاءة والشمعات', icon: 'Sun' },
  { id: 'cooling', nameAr: 'التبريد والرديتر', icon: 'Thermometer' },
  { id: 'filters', nameAr: 'الفلاتر والزيوت', icon: 'Droplet' },
  { id: 'electrical', nameAr: 'الكهرباء والحساسات', icon: 'Zap' },
] as const;

export const POPULAR_MAKES = [
  {
    name: 'شيفروليه (Chevrolet)',
    models: [
      'نيو أوبترا (New Optra)',
      'كروز (Cruze)',
      'كابتيفا (Captiva)',
      'أفيو (Aveo)',
      'لانوس (Lanos)',
      'سبارك (Spark)'
    ],
  },
  {
    name: 'أوبل (Opel)',
    models: [
      'أسترا (Astra G/H/J)',
      'إنسيجنيا (Insignia)',
      'كورسا (Corsa)',
      'فيكترا (Vectra B/C)',
      'موكا (Mokka)'
    ],
  },
  {
    name: 'إم جي (MG)',
    models: [
      'MG 5',
      'MG 6',
      'MG ZS',
      'MG RX5',
      'MG HS',
      'MG 4'
    ],
  },
  {
    name: 'إسبيرانزا (Esperanza)',
    models: [
      'A516',
      'A113',
      'A620',
      'تيجو (Tiggo)',
      'M11',
      'A213'
    ],
  },
];

export const SAMPLE_PARTS: Part[] = [
  {
    id: 'part-01',
    nameAr: 'شاحن توربيني رياضي فائق الأداء Garrett GTX3582R Gen II',
    nameEn: 'Garrett GTX3582R Gen II Turbocharger Assembly',
    oemNumber: 'GTX-3582R-856801-5068S',
    brand: 'Garrett Motion',
    category: 'engine',
    price: 4850,
    originalPrice: 5400,
    inStock: 4,
    rating: 4.9,
    reviewsCount: 38,
    condition: 'أداء رياضي معتمد',
    warranty: 'سنتان شاملة العيوب المصنعية',
    origin: 'الولايات المتحدة الأمريكية',
    image: '/src/assets/images/part_engine_turbocharger_1793629993738.jpg',
    description: 'توربين جيريت أصلي من الجيل الثاني Gen II مزود بعجلة ضغط ألمنيوم CNC تيتانيوم مطروقة وكرات سيراميك مزدوجة Dual Ceramic Ball Bearing، يرفع القوة الحصانية إلى ما يقارب 850 حصان مع استجابة عزم دوران فورية وثبات حراري متقدم.',
    features: [
      'محامل كريات سيراميك مزدوجة لعمر افتراضي مضاعف',
      'عجلة ضغط بتقنية Point Milling لزيادة تدفق الهواء بنسبة 20%',
      'غطاء توربيني مصبوب من فولاذ مقاوم للحرارة العالية حتى 1050°C',
      'مستشعر سرعة الدوران المدمج ومنافذ تبريد مائي متقدمة'
    ],
    specifications: {
      'نوع المحمل': 'Ceramic Ball Bearing مزدوج',
      'قطر عجلة الضاغط (Inducer)': '66 mm',
      'قطر عجلة الضاغط (Exducer)': '82 mm',
      'قطر التوربين': '68 mm',
      'نطاق القوة المدعومة': '450 - 850 حصان',
      'نوع التبريد': 'تبريد زيت وماء مزدوج'
    },
    compatibleVehicles: [
      { make: 'تويوتا (Toyota)', model: 'لاند كروزر (Land Cruiser)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024], engine: '4.0L Twin-Turbo / 3.5L V6' },
      { make: 'نيسان (Nissan)', model: 'باترول (Patrol)', years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engine: '5.6L V8 VVEL' },
      { make: 'فورد (Ford)', model: 'F-150', years: [2019, 2020, 2021, 2022, 2023, 2024], engine: '3.5L EcoBoost V6' },
      { make: 'بي إم دبليو (BMW)', model: '3 Series (G20)', years: [2019, 2020, 2021, 2022, 2023], engine: 'B58 3.0L Turbo' }
    ],
    tags: ['تيربو', 'محرك', 'قوة حصانية', 'تعديل رياضي', 'Garrett'],
    featured: true,
  },
  {
    id: 'part-02',
    nameAr: 'طقم أقراص فرامل كاربون سيراميك وكليبر 6 مكابس Brembo GT-R',
    nameEn: 'Brembo GT-R 6-Piston Carbon Ceramic Big Brake Kit',
    oemNumber: 'BRM-1N1-9004A2-CCM',
    brand: 'Brembo Racing',
    category: 'brakes',
    price: 3600,
    originalPrice: 4100,
    inStock: 6,
    rating: 5.0,
    reviewsCount: 52,
    condition: 'أداء رياضي معتمد',
    warranty: 'سنة أو 30,000 كم ضد التقفع والتلف',
    origin: 'إيطاليا',
    image: '/src/assets/images/part_ceramic_brake_rotor_1793629994097.jpg',
    description: 'نظام كبح فائق من بريمبو الإيطالية مزود بهوب مقاس 380 مم مخرم ومخطط من مركب الكربون سيراميك لتبديد الحرارة اللحظي ومنع تلاشي الفرملة Fade، مع كليبر ألمنيوم مشكّل بـ 6 بساتم بلون قرمزي حراري وفحمات سيراميك منخفضة الغبار.',
    features: [
      'أقراص فرامل مخرمة ومفرزة لتشتيت الغازات والحرارة فورياً',
      'كليبر مونوبلوك من سبيكة ألمنيوم الفضاء بـ 6 مكابس متعاكسة',
      'فحمات سيراميك هادئة لا تصدر صفير وتقلل تراكم غبار الكبح',
      'خراطيم فرامل فولاذية مجدولة مقاومة لانتفاخ الضغط الهيدروليكي'
    ],
    specifications: {
      'قطر الهوب': '380 mm × 34 mm',
      'عدد المكابس': '6 Pistons Monobloc',
      'مادة القرص': 'Carbon-Ceramic Composite Matrix',
      'مقاومة الحرارة': 'تصل إلى 850 درجة مئوية',
      'مستوى الضجيج': 'فائق الهدوء بدون صرير (Anti-Chirp Technology)'
    },
    compatibleVehicles: [
      { make: 'مرسيدس (Mercedes-Benz)', model: 'C-Class (W205/W206)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024], engine: 'C43 / C63 AMG / C300' },
      { make: 'مرسيدس (Mercedes-Benz)', model: 'E-Class (W213)', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'بي إم دبليو (BMW)', model: '5 Series (G30)', years: [2018, 2019, 2020, 2021, 2022, 2023] },
      { make: 'لكزس (Lexus)', model: 'ES350', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'تويوتا (Toyota)', model: 'لاند كروزر (Land Cruiser)', years: [2021, 2022, 2023, 2024] }
    ],
    tags: ['فرامل', 'هوبات', 'كليبر', 'سيراميك', 'Brembo'],
    featured: true,
  },
  {
    id: 'part-03',
    nameAr: 'طقم مساعدات تعليق رياضي قابل للتعديل بالكامل Bilstein B16 PSS10',
    nameEn: 'Bilstein B16 PSS10 Adjustable Coilover Suspension Kit',
    oemNumber: 'BIL-48-228298-PRO',
    brand: 'Bilstein Germany',
    category: 'suspension',
    price: 2950,
    originalPrice: 3300,
    inStock: 5,
    rating: 4.8,
    reviewsCount: 29,
    condition: 'درجة أولى ألماني',
    warranty: '18 شهر ضمان استبدال',
    origin: 'ألمانيا',
    image: '/src/assets/images/part_suspension_coilover_1793629994576.jpg',
    description: 'نظام تعليق كويل أوفر ألماني الصنع يوفر 10 مستويات ضبط لقساوة الارتداد والضغط بنقرة ميكانيكية دقيقة، مع خفض مدروس لارتفاع المركبة لتحسين الثبات أثناء المنعطفات والتسارع على السرعات العالية دون التضحية براحة الركوب اليومية.',
    features: [
      '10 وضعيات قابلة للتعديل يدوياً من الراحة الناعمة إلى الحلبات',
      'طلاء ثلاثي بأسطوانة Triple-C-Technology المقاوم للأملاح والتآكل',
      'يايات تدريجية Progressive Rate Springs محسوبة ديناميكياً',
      'محامل كروية علوية بطلاء ذهبي مؤكسد لمنع الاهتزاز'
    ],
    specifications: {
      'نطاق تخفيض الارتفاع': '30 mm إلى 50 mm',
      'عدد إعدادات التخميد': '10 نقرات متمايزة (Rebound & Bump)',
      'تقنية المساعد': 'Monotube Gas Pressure Technology',
      'الشهادة': 'معتمد من هيئة الفحص الفني الألمانية TÜV'
    },
    compatibleVehicles: [
      { make: 'بي إم دبليو (BMW)', model: '3 Series (G20)', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'مرسيدس (Mercedes-Benz)', model: 'C-Class (W205/W206)', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'تويوتا (Toyota)', model: 'كامري (Camry)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'هيونداي (Hyundai)', model: 'سوناتا (Sonata)', years: [2020, 2021, 2022, 2023, 2024] }
    ],
    tags: ['مساعدات', 'تعليق', 'كويل أوفر', 'ثبات', 'Bilstein'],
    featured: true,
  },
  {
    id: 'part-04',
    nameAr: 'طقم شمعات إضاءة أمامية ليزر ماتركس LED تفاعلية مع عدسات بروجكتور',
    nameEn: 'Adaptive Laser Matrix LED Headlight Assembly Unit',
    oemNumber: 'OEM-6311-9481-801',
    brand: 'Hella Automotive OEM',
    category: 'lighting',
    price: 2450,
    originalPrice: 2800,
    inStock: 8,
    rating: 4.9,
    reviewsCount: 44,
    condition: 'أصلي وكالة (OEM)',
    warranty: 'سنة كاملة مع ضمان عدم دخول الرطوبة',
    origin: 'ألمانيا',
    image: '/src/assets/images/part_led_headlight_assembly_1793629994795.jpg',
    description: 'شمعة أمامية أصلية بتقنية المصفوفة الذكية Matrix LED مع شعاع ليزر بعيد المدى يصل إلى 600 متر. تتضمن إشارات انعطاف متحركة ديناميكية وميزة تفادي إبهار السائقين المقابلين تلقائياً مع زجاج مقوى بطبقة حماية من الخدوش والاصفرار.',
    features: [
      'مدى إضاءة ليزري يصل حتى 600 متر في الطرق المظلمة',
      'إشارات تتابعية متدفقة Sequential Turn Signals',
      'عازل سيليكوني محكم يمنع الرطوبة وتكاثف البخار بالداخل نهائياً',
      'تركيب Plug & Play مباشر على أفياش الوكالة بدون تجريح أسلاك'
    ],
    specifications: {
      'نوع المصباح': 'Matrix Adaptive Laser + LED',
      'درجة حرارة اللون': '6000K Pure White Daylight',
      'الجهد والقدرة': '12V / 55W High Efficiency',
      'المعيار': 'DOT / SAE / E-Mark Compliant'
    },
    compatibleVehicles: [
      { make: 'مرسيدس (Mercedes-Benz)', model: 'E-Class (W213)', years: [2018, 2019, 2020, 2021, 2022] },
      { make: 'بي إم دبليو (BMW)', model: '5 Series (G30)', years: [2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: 'لكزس (Lexus)', model: 'ES350', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'تويوتا (Toyota)', model: 'كامري (Camry)', years: [2021, 2022, 2023, 2024] }
    ],
    tags: ['شمعات', 'إضاءة', 'ليد', 'ليزر', 'Hella'],
    featured: true,
  },
  {
    id: 'part-05',
    nameAr: 'طقم بواجي ليزر إيريديوم عالية الأداء NGK Laser Iridium (4 قطع)',
    nameEn: 'NGK Laser Iridium Spark Plugs Set of 4',
    oemNumber: 'NGK-SILZKR7B11-9723',
    brand: 'NGK Spark Plugs',
    category: 'engine',
    price: 240,
    originalPrice: 290,
    inStock: 25,
    rating: 4.9,
    reviewsCount: 88,
    condition: 'معتمد ياباني',
    warranty: 'سنة أو 100,000 كم كفاءة اشتعال',
    origin: 'اليابان',
    image: '/src/assets/images/part_engine_turbocharger_1793629993738.jpg',
    description: 'بواجي أصلية برأس قطب فائق الدقة 0.6 مم من الإيريديوم وقرص بلاتينيوم على القطب الأرضي، لتحقيق أفضل شرارة احتراق داخل غرف المحرك، خفض استهلاك البنزين بنسبة تصل إلى 8%، وتحسين استجابة الدعسة.',
    features: [
      'طرف إيريديوم ملحوم بالليزر لأقصى استقرار بالاشتعال',
      'عمر تشغيلي طويل يصل إلى 100,000 كم قبل الاستبدال',
      'حلقات ثلاثية تمنع تسرب ضغط غازات غرفة الاحتراق'
    ],
    specifications: {
      'قطر سن البوجي': '12 mm',
      'طول السن': '26.5 mm',
      'المدى الحراري': '7 (Optimal Heat Dissipation)'
    },
    compatibleVehicles: [
      { make: 'تويوتا (Toyota)', model: 'كامري (Camry)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'تويوتا (Toyota)', model: 'كورولا (Corolla)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'هيونداي (Hyundai)', model: 'النترا (Elantra)', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'هيونداي (Hyundai)', model: 'سوناتا (Sonata)', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'نيسان (Nissan)', model: 'التيما (Altima)', years: [2019, 2020, 2021, 2022, 2023, 2024] }
    ],
    tags: ['بواجي', 'محرك', 'كهرباء', 'NGK', 'شمعات احتراق'],
    featured: false,
  },
  {
    id: 'part-06',
    nameAr: 'رديتر ماء تبريد محرك ألمنيوم ثنائي النواة Mishimoto Performance',
    nameEn: 'Mishimoto Dual-Core Aluminum High-Flow Radiator',
    oemNumber: 'MM-RAD-LNC-1823',
    brand: 'Mishimoto',
    category: 'cooling',
    price: 1450,
    originalPrice: 1700,
    inStock: 7,
    rating: 4.7,
    reviewsCount: 31,
    condition: 'أداء رياضي معتمد',
    warranty: 'ضمان مفتوح مدى الحياة من المصنع',
    origin: 'الولايات المتحدة الأمريكية',
    image: '/src/assets/images/part_engine_turbocharger_1793629993738.jpg',
    description: 'رديتر ألمنيوم TIG-welded ملحوم يدوياً بنسبة 100% يوفر سعة تبريد إضافية بنسبة 35% مقارنة بالرديتر البلاستيكي التجاري، مخصص للمناخ الصحراوي الحار وأحمال السحب والقيادة الشاقة.',
    features: [
      'هيكل ألمنيوم طيران خفيف مع خزانات ملحومة بالروبوت',
      'طبة تفريغ مغناطيسية تجمع ذرات الصدأ المعدنية',
      'يركب مكان رديتر الوكالة مباشرة بنفس قواعد المروحة'
    ],
    specifications: {
      'سمك النواة': '48 mm Dual Core',
      'سعة السائل': 'زيادة 1.8 لتر عن رديتر المصنع',
      'الضغط المسموح': '1.3 Bar High Pressure Cap'
    },
    compatibleVehicles: [
      { make: 'تويوتا (Toyota)', model: 'لاند كروزر (Land Cruiser)', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: 'نيسان (Nissan)', model: 'باترول (Patrol)', years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'لكزس (Lexus)', model: 'LX600 / LX570', years: [2018, 2019, 2020, 2021, 2022, 2023] }
    ],
    tags: ['رديتر', 'تبريد', 'حرارة المحرك', 'Mishimoto'],
    featured: false,
  },
  {
    id: 'part-07',
    nameAr: 'طقم فحمات فرامل أمامية وخلفية سيراميك منخفضة الغبار Akebono Pro-ACT',
    nameEn: 'Akebono Pro-ACT Ultra-Premium Ceramic Brake Pads',
    oemNumber: 'ACT-1210-ACT-1211',
    brand: 'Akebono Japan',
    category: 'brakes',
    price: 490,
    originalPrice: 580,
    inStock: 18,
    rating: 4.9,
    reviewsCount: 76,
    condition: 'معتمد ياباني',
    warranty: 'سنة أو 25,000 كم',
    origin: 'اليابان',
    image: '/src/assets/images/part_ceramic_brake_rotor_1793629994097.jpg',
    description: 'فحمات أكيبونو اليابانية المورد الرسمي لكبرى الشركات اليابانية، تعتمد تركيبة سيراميك متطورة توفر كبحاً متماسكاً فورياً دون أي اهتزاز أو أصوات صرير مع الحفاظ على لمعان الجنوط ونظافتها من السواد.',
    features: [
      'شرائح عزل صوتي متطورة للتخلص من الصفير',
      'صفر غبار أسود يلتصق بالجنوط',
      'لطيفة على أقراص الفرامل وتطيل عمر الهوب'
    ],
    specifications: {
      'التركيبة': 'Ultra-Premium Ceramic Friction Formula',
      'الحساسات': 'تتضمن حساسات تآكل ميكانيكية وكهربائية'
    },
    compatibleVehicles: [
      { make: 'تويوتا (Toyota)', model: 'كامري (Camry)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'لكزس (Lexus)', model: 'ES350', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'هيونداي (Hyundai)', model: 'سوناتا (Sonata)', years: [2020, 2021, 2022, 2023, 2024] },
      { make: 'تويوتا (Toyota)', model: 'كورولا (Corolla)', years: [2019, 2020, 2021, 2022, 2023, 2024] }
    ],
    tags: ['فحمات', 'فرامل', 'سيراميك', 'Akebono'],
    featured: false,
  },
  {
    id: 'part-08',
    nameAr: 'مضخة وقود عالية الضغط لمحركات الحقن المباشر Bosch High-Pressure Fuel Pump',
    nameEn: 'Bosch High-Pressure Fuel Pump (HPFP) Direct Injection',
    oemNumber: 'BOS-0261520289-OEM',
    brand: 'Bosch Automotive',
    category: 'engine',
    price: 1820,
    originalPrice: 2100,
    inStock: 5,
    rating: 4.8,
    reviewsCount: 22,
    condition: 'درجة أولى ألماني',
    warranty: 'سنة ضمان ضد خلل الضغط',
    origin: 'ألمانيا',
    image: '/src/assets/images/part_engine_turbocharger_1793629993738.jpg',
    description: 'مضخة بوش الأصلية لضغط الوقود المرتفع لمحركات GDI وTSI، تضمن تغذية منتظمة للمسارات حتى 200 بار لمنع التفتفة، تقطيع البنزين أثناء التسارع، وظهور كود فحص المحرك P0087.',
    features: [
      'بيستون داخلي مقسى بطبقة DLC ضد الاحتكاك والوقود الجاف',
      'بلف تحكم كهرومغناطيسي عالي الاستجابة',
      'مطابقة تامة لمواصفات وتوصيلات محركات السيارات الألمانية واليابانية الحديثة'
    ],
    specifications: {
      'الضغط الأقصى': '200 Bar / 2900 PSI',
      'نظام التشغيل': 'Mechanical Cam Driven'
    },
    compatibleVehicles: [
      { make: 'مرسيدس (Mercedes-Benz)', model: 'C-Class (W205/W206)', years: [2018, 2019, 2020, 2021, 2022] },
      { make: 'بي إم دبليو (BMW)', model: '3 Series (G20)', years: [2019, 2020, 2021, 2022, 2023] },
      { make: 'فورد (Ford)', model: 'F-150', years: [2018, 2019, 2020, 2021, 2022, 2023] },
      { make: 'هيونداي (Hyundai)', model: 'النترا (Elantra)', years: [2021, 2022, 2023, 2024] }
    ],
    tags: ['طرمبة بنزين', 'حقن مباشر', 'محرك', 'Bosch'],
    featured: false,
  },
  {
    id: 'part-09',
    nameAr: 'طقم أذرعة ومقصات تعليق أمامية ألماني ممتص للصدمات Lemförder Control Arm Set',
    nameEn: 'Lemförder Front Suspension Lower Control Arms Pair',
    oemNumber: 'LEM-38290-01-PR',
    brand: 'Lemförder (ZF Group)',
    category: 'suspension',
    price: 1150,
    originalPrice: 1350,
    inStock: 9,
    rating: 4.9,
    reviewsCount: 36,
    condition: 'درجة أولى ألماني',
    warranty: 'سنة أو 20,000 كم',
    origin: 'ألمانيا',
    image: '/src/assets/images/part_suspension_coilover_1793629994576.jpg',
    description: 'مقصات تعليق أصلية من مجموعة ZF الألمانية بجلب هيدروليكية مطاطية وجوزات مقساة تقضي على طقة المنعطفات وانحراف ميزان السيارة واهتزاز عجلة القيادة مع المطبات والحفر.',
    features: [
      'جلب هيدروليكية ممتصة للاهتزازات الدقيقة للطريق',
      'جوزات كروية محمية بأغطية سيليكونية تمنع دخول الأتربة والماء',
      'هيكل ألومنيوم معالج حرارياً خفيف الوزن وقوي التحمل'
    ],
    specifications: {
      'الموقع': 'المحور الأمامي السفلي (يمين + يسار)',
      'المادة': 'Forged Aluminum Alloy'
    },
    compatibleVehicles: [
      { make: 'مرسيدس (Mercedes-Benz)', model: 'E-Class (W213)', years: [2018, 2019, 2020, 2021, 2022, 2023] },
      { make: 'بي إم دبليو (BMW)', model: '5 Series (G30)', years: [2018, 2019, 2020, 2021, 2022, 2023] },
      { make: 'تويوتا (Toyota)', model: 'لاند كروزر (Land Cruiser)', years: [2019, 2020, 2021, 2022, 2023] },
      { make: 'نيسان (Nissan)', model: 'باترول (Patrol)', years: [2018, 2019, 2020, 2021, 2022, 2023] }
    ],
    tags: ['مقصات', 'أذرعة', 'تعليق', 'ميزان', 'Lemförder'],
    featured: false,
  },
  {
    id: 'part-10',
    nameAr: 'حساس تدفق الهواء الشامل الأصلي Denso Mass Air Flow Sensor (MAF)',
    nameEn: 'Denso Mass Airflow Sensor (MAF)',
    oemNumber: 'DEN-22204-0V010',
    brand: 'Denso OEM Japan',
    category: 'electrical',
    price: 380,
    originalPrice: 450,
    inStock: 14,
    rating: 4.8,
    reviewsCount: 41,
    condition: 'أصلي وكالة (OEM)',
    warranty: 'سنة ضد عيوب القراءة الكهربائية',
    origin: 'اليابان',
    image: '/src/assets/images/part_engine_turbocharger_1793629993738.jpg',
    description: 'حساس إيرماس أصلي من دينسو اليابانية يقيس بدقة بالغة كمية الهواء الداخلة لمانيفولد المحرك، ينهي مشكلة خنقة المحرك وضعف التسارع، ويضبط خليط الهواء والبنزين للحصول على عزم كامل.',
    features: [
      'سلك بلاتينيوم دقيق للغاية بحساسية استجابة أجزاء من الثانية',
      'شريحة معالجة إلكترونية مدمجة تقاوم اهتزازات المحرك',
      'تجهيز أصلي 100% مطابق لمقاس فيش الوكالة'
    ],
    specifications: {
      'نوع الحساس': 'Hot-Wire Air Flow Meter',
      'فولطية التشغيل': '12V DC'
    },
    compatibleVehicles: [
      { make: 'تويوتا (Toyota)', model: 'كامري (Camry)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'تويوتا (Toyota)', model: 'لاند كروزر (Land Cruiser)', years: [2018, 2019, 2020, 2021, 2022, 2023] },
      { make: 'لكزس (Lexus)', model: 'ES350', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'لكزس (Lexus)', model: 'RX350', years: [2018, 2019, 2020, 2021, 2022] }
    ],
    tags: ['حساس هواء', 'كهرباء', 'حساسات', 'Denso'],
    featured: false,
  },
  {
    id: 'part-11',
    nameAr: 'فلتر هواء رياضي عالي التدفق قابل للغسيل K&N Drop-in Air Filter',
    nameEn: 'K&N High-Flow Washable Engine Air Filter',
    oemNumber: 'KN-33-2480-PRO',
    brand: 'K&N Engineering',
    category: 'filters',
    price: 320,
    originalPrice: 380,
    inStock: 20,
    rating: 4.9,
    reviewsCount: 65,
    condition: 'أداء رياضي معتمد',
    warranty: 'ضمان مليون ميل (قابل للغسيل وإعادة الاستخدام)',
    origin: 'الولايات المتحدة الأمريكية',
    image: '/src/assets/images/part_engine_turbocharger_1793629993738.jpg',
    description: 'فلتر هواء محرك رياضي مصمم لزيادة تدفق الهواء بنسبة تصل إلى 50% مع توفير حماية فائقة للمحرك من أتربة الصحراء الدقيقة. قابل لإعادة الغسيل والتزييت دون الحاجة لتغيير الفلتر لسنوات.',
    features: [
      'نسيج قطني متعدد الطبقات معالج بزيت ترشيح ميكروي',
      'يزيد استجابة دعسة البنزين ونغمة صوت المحرك الرياضية',
      'صديق للبيئة وموفر لتكاليف الصيانة الدورية'
    ],
    specifications: {
      'نوع المادة': 'Multi-layer Cotton Gauze with Wire Mesh',
      'طريقة التنظيف': 'غسيل بمحلول تنظيف وتزييت كل 50,000 كم'
    },
    compatibleVehicles: [
      { make: 'تويوتا (Toyota)', model: 'لاند كروزر (Land Cruiser)', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'نيسان (Nissan)', model: 'باترول (Patrol)', years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'فورد (Ford)', model: 'F-150', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] }
    ],
    tags: ['فلتر هواء', 'فلاتر', 'صيانة', 'K&N'],
    featured: false,
  },
  {
    id: 'part-12',
    nameAr: 'زيت محرك استير تخليقي 100% بالكامل Motul 300V Motorsport 5W-40 (كرتون 4 لتر)',
    nameEn: 'Motul 300V Competition 100% Synthetic Ester Oil 5W-40',
    oemNumber: 'MOT-300V-5W40-4L',
    brand: 'Motul Racing',
    category: 'filters',
    price: 290,
    originalPrice: 340,
    inStock: 30,
    rating: 5.0,
    reviewsCount: 112,
    condition: 'أداء رياضي معتمد',
    warranty: 'أصلي ومضمون بالباركود ورقم التشغيلة',
    origin: 'فرنسا',
    image: '/src/assets/images/part_engine_turbocharger_1793629993738.jpg',
    description: 'زيت السباقات الفرنسي الشهير المعتمد على تكنولوجيا ESTER Core®، يمنح المحرك فيلم تزييت متين يقاوم درجات الحرارة الشديدة حتى في أصعب ظروف القيادة الصيفية والضغط العالي دون انخفاض لزوجة الزيت.',
    features: [
      'طبقة حماية فورية تمنع احتكاك المحرك عند بدء التشغيل البارد',
      'استقرار ضغط الزيت حتى في سرعات الدوران العالية RPM',
      'يقلل ترسبات الكربون داخل مجاري البلوف والتيربو'
    ],
    specifications: {
      'اللزوجة': 'SAE 5W-40',
      'الحجم': 'عبوة 4 لتر معدنية أصلية',
      'التكنولوجيا': '100% Synthetic Ester Core'
    },
    compatibleVehicles: [
      { make: 'مرسيدس (Mercedes-Benz)', model: 'C-Class (W205/W206)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'بي إم دبليو (BMW)', model: '3 Series (G20)', years: [2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'تويوتا (Toyota)', model: 'لاند كروزر (Land Cruiser)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: 'نيسان (Nissan)', model: 'باترول (Patrol)', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] }
    ],
    tags: ['زيوت', 'تخليقي', 'صيانة دورية', 'Motul'],
    featured: false,
  }
];

export const DIAGNOSTIC_SYMPTOMS: DiagnosticSymptom[] = [
  {
    id: 'sym-01',
    titleAr: 'صوت صرير أو تصفير حاد عند الضغط على دواسة الفرامل',
    descriptionAr: 'يحدث غالباً عند التوقف التدريجي أو الإشارات، ويزداد في الصباح أو عند ارتفاع حرارة المكابح.',
    likelyCauseAr: 'تآكل فحمات الفرامل ووصولها إلى شريحة التحذير المعدنية أو وجود تشققات وريجة في هوبات الفرامل.',
    recommendedCategory: 'brakes',
    recommendedPartIds: ['part-02', 'part-07'],
  },
  {
    id: 'sym-02',
    titleAr: 'اهتزاز ورجة في مقود القيادة عند سرعات بين 80 إلى 120 كم/س',
    descriptionAr: 'رعشة واضحة في الدركسون تختفي تدريجياً أو تزداد عند تجاوز سرعة 100 كم/س أو عند أخذ المنحنيات.',
    likelyCauseAr: 'خلل في توازن العجلات أو تلف في جلب المقصات السفلية ورؤوس أذرعة التعليق (Rubber Bushings).',
    recommendedCategory: 'suspension',
    recommendedPartIds: ['part-03', 'part-09'],
  },
  {
    id: 'sym-03',
    titleAr: 'ارتفاع حرارة المحرك فوق المعدل الطبيعي خاصة عند تشغيل المكيف',
    descriptionAr: 'مؤشر الحرارة يرتفع تدريجياً في الزحام أو عند التوقف، ويعود للانخفاض عند المشي في خطوط سريعة.',
    likelyCauseAr: 'انسداد في أنابيب الرديتر، ضعف أداء غطاء الرديتر، أو ضعف مضخة التبريد ومراوح المكيف.',
    recommendedCategory: 'cooling',
    recommendedPartIds: ['part-06'],
  },
  {
    id: 'sym-04',
    titleAr: 'ضعف عزم التسارع وتقطيع (تفتفة) عند الضغط القوي على البنزين',
    descriptionAr: 'المحرك لا يستجيب فوراً لدواسة الوقود وتحدث ترددات واهتزازات مع إضاءة لمبة فحص المحرك Check Engine.',
    likelyCauseAr: 'احتراق غير مكتمل بسبب تلف البواجي أو انخفاض ضغط طرمبة البنزين أو اتساخ حساس تدفق الهواء (MAF).',
    recommendedCategory: 'engine',
    recommendedPartIds: ['part-05', 'part-08', 'part-10'],
  },
];

export const SHOWROOM_BRANCHES = [
  {
    city: 'الرياض - المعرض الرئيسي ومركز التركيب',
    address: 'حي الصناعية، طريق خريص تقاطع الدائري الشرقي',
    hours: 'السبت - الخميس: 8:00 ص - 10:00 م | الجمعة: 4:00 م - 10:00 م',
    phone: '+966 11 482 9900',
    whatsapp: '966551234567',
    bays: '8 رافعات صيانة مجهزة لفحص التوافق والتركيب الفوري',
  },
  {
    city: 'جدة - فرع الساحل الغربي',
    address: 'شارع بني مالك، بالقرب من دوار البلدية',
    hours: 'السبت - الخميس: 8:30 ص - 10:00 م',
    phone: '+966 12 673 8811',
    whatsapp: '966551234568',
    bays: '6 رافعات صيانة متخصصة للألماني والياباني',
  },
  {
    city: 'الدمام - فرع المنطقة الشرقية',
    address: 'طريق الظهران الجبيل، صناعية دله للمركبات',
    hours: 'السبت - الخميس: 8:00 ص - 9:30 م',
    phone: '+966 13 834 7722',
    whatsapp: '966551234569',
    bays: '5 رافعات ومركز ميزان إلكتروني ليزري',
  },
];
