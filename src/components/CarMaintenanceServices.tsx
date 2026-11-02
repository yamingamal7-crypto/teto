import React, { useState } from 'react';
import { 
  Wrench, 
  Car, 
  Cpu, 
  Settings, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Printer, 
  ArrowRight,
  Gauge,
  Wind,
  Disc,
  Layers,
  FileText
} from 'lucide-react';
import { BRAND_LOGOS } from './DailySalesReport';

interface MaintenancePackage {
  id: string;
  name: string;
  category: 'computer' | 'mechanics' | 'suspension' | 'ac' | 'transmission';
  duration: string;
  priceEstimate: string;
  features: string[];
  recommendedMakes: string[];
  badge?: string;
}

export const CarMaintenanceServices: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<'all' | 'Chevrolet' | 'Opel' | 'MG' | 'Esperanza'>('all');
  
  // Booking Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedMake, setSelectedMake] = useState('شيفروليه (Chevrolet)');
  const [carModel, setCarModel] = useState('نيو أوبترا (New Optra)');
  const [selectedServiceId, setSelectedServiceId] = useState('pkg-comp-diag');
  const [problemDescription, setProblemDescription] = useState('');
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('11:00 ص');
  const [issuedJobCard, setIssuedJobCard] = useState<{
    jobCardNo: string;
    clientName: string;
    clientPhone: string;
    make: string;
    model: string;
    serviceName: string;
    date: string;
    time: string;
    estimatedCost: string;
    notes: string;
  } | null>(null);

  const maintenancePackages: MaintenancePackage[] = [
    {
      id: 'pkg-comp-diag',
      name: 'فحص وكشف كمبيوتر شامل بالأجهزة الأصلية',
      category: 'computer',
      duration: '30 - 45 دقيقة',
      priceEstimate: '250 ج.م',
      badge: 'الأكثر طلباً',
      features: [
        'قراءة ومسح جميع أكواد الأعطال (Check Engine / DTC)',
        'فحص لايف داتا (Live Data) للحساسات والبوابة والرشاشات',
        'كشف كمبيوتر متخصص بأجهزة GM Tech2 / GDS2 و VAG-COM',
        'فحص أداء منظومة الإشعال وحساس الشكمان والـ MAP',
        'تقرير فني مفصل بحالة الموتور والحساسات'
      ],
      recommendedMakes: ['Chevrolet', 'Opel', 'MG', 'Esperanza']
    },
    {
      id: 'pkg-brakes-safety',
      name: 'صيانة وتجديد منظومة الفرامل والأمان',
      category: 'suspension',
      duration: '45 - 60 دقيقة',
      priceEstimate: '350 ج.م مصنعية + القطع',
      badge: 'فحص أمان',
      features: [
        'تغيير تيل الفرامل الأمامي والخلفي السيراميك بضمان',
        'فحص ومسح الطنابير وضبط خلوص البيستم',
        'اختبار وضبط ماستر الفرامل وخراطيم الباكم',
        'تغيير وتنظيف زيت الفرامل DOT4 الألماني الأصلي',
        'فحص ومعايرة حساسات الـ ABS وتطهير التيل'
      ],
      recommendedMakes: ['Chevrolet', 'Opel', 'MG', 'Esperanza']
    },
    {
      id: 'pkg-suspension-tuning',
      name: 'صيانة العفشة والتعليق والمقصات بالكامل',
      category: 'suspension',
      duration: '1.5 - 2.5 ساعة',
      priceEstimate: '500 - 800 ج.م مصنعية',
      badge: 'ورشة متخصصة',
      features: [
        'تغيير المساعدين الأمامي والخلفي والبطاحات',
        'كبس وتغيير جلب المقصات وبيض الطرف والبارات',
        'فحص وتغيير كبالن العجل الداخلية والخارجية وكاوتش الكوبلن',
        'ضبط زوايا واتزان إلكتروني مع فحص الشاسيه',
        'علاج أصوات الخبط والتزييق في المطبات'
      ],
      recommendedMakes: ['Chevrolet', 'Opel', 'MG', 'Esperanza']
    },
    {
      id: 'pkg-cooling-ac',
      name: 'صيانة التكييف ودورة التبريد وشحن فريون أصلي',
      category: 'ac',
      duration: '1 ساعة',
      priceEstimate: '450 - 650 ج.م شامل الفريون',
      badge: 'تبريد وتكييف',
      features: [
        'كشف تسريب دورة التكييف بضغط النيتروجين الجاف',
        'شحن فريون أمريكي أصلي R134a بالوزن المثالي للصانع',
        'تنظيف سربنتينة التكييف وغسيل الثلاجة الداخلية',
        'فحص كومبريسور التكييف والكلتش وبلي الشداد',
        'اختبار طلمبة المياه والردياتير وخراطيم التبريد'
      ],
      recommendedMakes: ['Chevrolet', 'Opel', 'MG', 'Esperanza']
    },
    {
      id: 'pkg-timing-engine',
      name: 'تغيير سير الكاتينة وسيور المجموعة وضبط المحرك',
      category: 'mechanics',
      duration: '2 - 3 ساعات',
      priceEstimate: '400 - 700 ج.م مصنعية',
      badge: 'ميكانيكا دقيقة',
      features: [
        'تغيير طقم كاتينة كامل (سير كاتينة أصلي + بليات شداد)',
        'تغيير سير الدينامو والمجموعة وضبط الشدادات',
        'فحص أويل سيل الكرنك والكامات ومنع تسريب الزيوت',
        'تنظيف البوابة وحساس الأيدل والمانيفولد',
        'تغيير شمعات الاشتعال (بوجيهات أصلية) وضبط عزم المحرك'
      ],
      recommendedMakes: ['Chevrolet', 'Opel', 'MG', 'Esperanza']
    },
    {
      id: 'pkg-clutch-trans',
      name: 'تغيير طقم دبرياج كامل وصيانة ناقل الحركة (الفتيس)',
      category: 'transmission',
      duration: '3 - 4 ساعات',
      priceEstimate: '600 - 900 ج.م مصنعية',
      features: [
        'تنزيل الفتيس وتغيير طقم دبرياج أصلي (ديسك + أسطوانة + بلية)',
        'تغيير ماستر الدبرياج العلوي والسفلي مع أخذ هواء الدورة',
        'فحص فرول الحدافة وفحص سبيكة الفتيس',
        'تغيير زيت الفتيس المانيوال أو الأوتوماتيك المعتمد',
        'معايرة عصا الفتيس وسلك الدبرياج لنعومة التعشيق'
      ],
      recommendedMakes: ['Chevrolet', 'Opel', 'MG', 'Esperanza']
    }
  ];

  const filteredPackages = selectedBrand === 'all' 
    ? maintenancePackages 
    : maintenancePackages.filter(p => p.recommendedMakes.includes(selectedBrand));

  // Handle booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('يرجى كتابة الاسم ورقم الهاتف لتأكيد حجز الصيانة.');
      return;
    }

    const selectedPkg = maintenancePackages.find(p => p.id === selectedServiceId);
    const newJobCardNo = `JOB-${Date.now().toString().slice(-5)}`;

    setIssuedJobCard({
      jobCardNo: newJobCardNo,
      clientName,
      clientPhone,
      make: selectedMake,
      model: carModel,
      serviceName: selectedPkg ? selectedPkg.name : 'صيانة عامة وفحص',
      date: bookingDate,
      time: bookingTime,
      estimatedCost: selectedPkg ? selectedPkg.priceEstimate : 'حسب الفحص والقطع',
      notes: problemDescription || 'حجز صيانة دورية وتركيب قطع غيار أصلية',
    });
  };

  const handleWhatsAppBooking = () => {
    if (!issuedJobCard) return;
    const text = encodeURIComponent(
      `مرحباً TITO STORE، أود تأكيد حجز موعد صيانة:\n` +
      `• رقم كارت الشغل: ${issuedJobCard.jobCardNo}\n` +
      `• العميل: ${issuedJobCard.clientName}\n` +
      `• الهاتف: ${issuedJobCard.clientPhone}\n` +
      `• السيارة: ${issuedJobCard.make} - ${issuedJobCard.model}\n` +
      `• الخدمة المطلوبة: ${issuedJobCard.serviceName}\n` +
      `• الموعد المفضل: ${issuedJobCard.date} الساعة ${issuedJobCard.time}\n` +
      `• ملاحظات / شكوى العطل: ${issuedJobCard.notes}\n` +
      `العنوان: الحرفيين، السلام، شارع المرسيدس`
    );
    window.open(`https://wa.me/201020272266?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8 text-right font-sans">
      
      {/* Hero Maintenance Center Banner */}
      <div className="relative rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-600/20 border border-red-500/40 text-white text-xs font-black">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>مركز صيانة وخدمات TITO STORE المتخصص (POWERED BY ZEUS)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              صيانة احترافية وكشف كمبيوتر وتركيب معتمد <br />
              <span className="text-red-600">CHEVROLET • OPEL • MG • ESPERANZA</span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              لا نكتفي ببيع قطع الغيار الأصلية فقط، بل نوفر مركز صيانة وورشة متكاملة في الحرفيين بأحدث أجهزة الفحص الأصلية وفنيين خبراء في ماركات شيفروليه وأوبل وإم جي وإسبيرانزا. نوفر تركيب القطع فورياً مع ضمان التشغيل.
            </p>

            {/* Manager, Owner & Contact Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-neutral-200">
              <div className="flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-xl border border-neutral-800">
                <span className="text-neutral-400">المالك:</span>
                <span className="text-white font-bold">طاهر تيتو</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-xl border border-neutral-800">
                <span className="text-neutral-400">مدير المحل والمركز:</span>
                <span className="text-white font-bold">أحمد</span>
              </div>
              <a 
                href="tel:01020272266" 
                className="flex items-center gap-1.5 bg-red-600/20 hover:bg-red-600/30 text-white px-3 py-1.5 rounded-xl border border-red-500/40 transition-colors font-mono font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>01020272266</span>
              </a>
              <div className="flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-xl border border-neutral-800">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>الحرفيين، السلام، القاهرة - شارع المرسيدس</span>
              </div>
            </div>
          </div>

          {/* Quick CTA Card */}
          <div className="bg-neutral-950/90 border border-neutral-800 rounded-2xl p-5 w-full lg:w-80 shrink-0 space-y-4 shadow-xl">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span>حجز ميعاد صيانة فوري</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>كشف وتشخيص كمبيوتر دقيق</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ضمان معتمد على التركيب والقطع</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>قطع غيار حاضرة في المخزن فورا</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <a
                href="https://wa.me/201020272266?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20TITO%20STORE%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B5%D9%8A%D8%A7%D9%86%D8%A9%20%D9%88%D8%AD%D8%AC%D8%B2%20%D9%85%D9%8A%D8%B9%D8%A7%D8%AF"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل واتساب مع المركز: 01020272266</span>
              </a>

              <a
                href="tel:01020272266"
                className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all border border-neutral-800 flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>اتصال مباشر: 01020272266</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Supported Brands Filter Strip */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Car className="w-4 h-4 text-red-500" />
          <span>تصفية باقات الصيانة حسب ماركة سيارتك:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedBrand === 'all'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            جميع الماركات الأربعة
          </button>

          <button
            onClick={() => setSelectedBrand('Chevrolet')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedBrand === 'Chevrolet'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <img src={BRAND_LOGOS.Chevrolet} alt="Chevrolet" className="w-5 h-3 object-contain" />
            <span>شيفروليه</span>
          </button>

          <button
            onClick={() => setSelectedBrand('Opel')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedBrand === 'Opel'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <img src={BRAND_LOGOS.Opel} alt="Opel" className="w-4 h-4 object-contain invert" />
            <span>أوبل</span>
          </button>

          <button
            onClick={() => setSelectedBrand('MG')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedBrand === 'MG'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <img src={BRAND_LOGOS.MG} alt="MG" className="w-4 h-4 object-contain" />
            <span>إم جي</span>
          </button>

          <button
            onClick={() => setSelectedBrand('Esperanza')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedBrand === 'Esperanza'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <img src={BRAND_LOGOS.Esperanza} alt="Esperanza" className="w-4 h-3 object-contain" />
            <span>إسبيرانزا</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Packages on the right, Booking Form on the left */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Packages Cards Grid (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-red-500" />
              <span>باقات الصيانة والخدمات المتخصصة</span>
            </h2>
            <span className="text-xs text-neutral-400">
              {filteredPackages.length} باقات متاحة
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`bg-neutral-900 border rounded-2xl p-5 flex flex-col justify-between transition-all hover:border-neutral-700 relative group ${
                  selectedServiceId === pkg.id 
                    ? 'border-red-500 shadow-xl shadow-red-600/10 bg-neutral-900/95' 
                    : 'border-neutral-800'
                }`}
              >
                {pkg.badge && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-red-600 text-[10px] font-black text-white shadow-sm">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-tight">
                    {pkg.name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3 pb-2 border-b border-neutral-800 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      {pkg.duration}
                    </span>
                    <span className="text-white font-bold font-sans">
                      {pkg.priceEstimate}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span className="leading-tight text-[11px]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedServiceId(pkg.id);
                      const bookingFormEl = document.getElementById('booking-section');
                      if (bookingFormEl) {
                        bookingFormEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      selectedServiceId === pkg.id
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                        : 'bg-neutral-950 text-neutral-300 border border-neutral-800 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    <span>{selectedServiceId === pkg.id ? 'تم اختيار الباقة' : 'حجز هذه الباقة'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Workshop Guarantee Box */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3 text-xs text-neutral-300">
            <ShieldCheck className="w-6 h-6 text-red-500 shrink-0" />
            <div>
              <span className="font-bold text-white block">ضمان TITO STORE المعتمد على التركيب:</span>
              <span>جميع القطع التي يتم تركيبها بمركز الصيانة تتم تحت إشراف هندسي مع ضمان تجربة وتشغيل الفتيس والمحرك والعفشة.</span>
            </div>
          </div>
        </div>

        {/* Booking Form & Job Card (5 Cols) */}
        <div id="booking-section" className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-white mb-1">
              <Calendar className="w-4 h-4 text-red-500" />
              <span>استمارة حجز موعد صيانة وكشف</span>
            </div>
            <h3 className="text-xl font-black text-white">
              احجز موعد سيارتك في المركز
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              املأ البيانات التالية لإصدار كارت الشغل (Job Card) وتثبيت الموعد بمركز الصيانة بشارع المرسيدس.
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            
            {/* Client Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  اسم العميل الكريم:
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="مثال: م / محمد سمير"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  رقم الهاتف للتأكيد:
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 font-mono text-left"
                />
              </div>
            </div>

            {/* Vehicle Selection (Strict 4 Makes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  ماركة السيارة (الماركات المعتمدة):
                </label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-bold"
                >
                  <option value="شيفروليه (Chevrolet)">شيفروليه (Chevrolet)</option>
                  <option value="أوبل (Opel)">أوبل (Opel)</option>
                  <option value="إم جي (MG)">إم جي (MG)</option>
                  <option value="إسبيرانزا (Esperanza)">إسبيرانزا (Esperanza)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  موديل وسنة السيارة:
                </label>
                <input
                  type="text"
                  required
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="مثال: نيو أوبترا 2018 أو MG 5"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                نوع الخدمة أو الباقة المطلوبة:
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
              >
                {maintenancePackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} — ({pkg.priceEstimate})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  تاريخ الحجز المفضل:
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono text-left"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  الوقت المناسب:
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="10:00 ص">10:00 صباحاً (افتتاح المركز)</option>
                  <option value="11:30 ص">11:30 صباحاً</option>
                  <option value="01:00 م">01:00 ظهراً</option>
                  <option value="03:30 م">03:30 عصراً</option>
                  <option value="05:30 م">05:30 مساءً</option>
                  <option value="07:30 م">07:30 مساءً</option>
                  <option value="09:00 م">09:00 مساءً</option>
                </select>
              </div>
            </div>

            {/* Notes / Symptom */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                وصف الشكوى أو صوت العطل (اختياري):
              </label>
              <textarea
                rows={2}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="مثال: صوت تزييق مع المطبات، أو لمبة التشك منورة وسحب العربية ضعيف..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>إصدار كارت شغل الصيانة وتأكيد الحجز</span>
            </button>
          </form>

          {/* Generated Job Card Modal / Preview */}
          {issuedJobCard && (
            <div className="p-4 rounded-2xl bg-neutral-950 border border-red-500/50 space-y-3 animate-fade-in shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  تم تسجيل كارت الشغل: <span className="font-mono text-red-400">{issuedJobCard.jobCardNo}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                  مؤكد
                </span>
              </div>

              <div className="text-[11px] space-y-1 text-neutral-300">
                <div className="flex justify-between">
                  <span className="text-neutral-500">العميل:</span>
                  <span className="font-bold text-white">{issuedJobCard.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">السيارة:</span>
                  <span className="font-bold text-white">{issuedJobCard.make} - {issuedJobCard.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">الخدمة:</span>
                  <span className="text-white">{issuedJobCard.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">الميعاد:</span>
                  <span className="font-mono text-white">{issuedJobCard.date} الساعة {issuedJobCard.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">التكلفة التقديرية:</span>
                  <span className="font-bold text-emerald-400">{issuedJobCard.estimatedCost}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-neutral-900">
                  <span className="text-neutral-500">موقع المركز:</span>
                  <span className="text-white">الحرفيين، السلام، القاهرة - شارع المرسيدس</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال واتساب للمحل (01020272266)</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl border border-neutral-800 flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Workshop Location & Visit Info */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <MapPin className="w-5 h-5 text-red-500" />
            <span>موقع مركز الصيانة واستقبال السيارات</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300">
            مدينة الحرفيين، قسم أول السلام، القاهرة — شارع المرسيدس (بجوار كبرى ورش السيارات المتخصصة).
          </p>
          <div className="text-xs text-neutral-400">
            مواعيد العمل بالورشة: يومياً من 10:00 صباحاً حتى 11:00 مساءً (ما عدا الجمعة يبدأ بعد صلاة الجمعة).
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://maps.google.com/?q=El+Herafyeen+El+Salam+Cairo+Mercedes+Street"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-red-500" />
            <span>فتح الخريطة والموقع</span>
          </a>

          <a
            href="tel:01020272266"
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>اتصل للاستفسار 01020272266</span>
          </a>
        </div>
      </div>

    </div>
  );
};
