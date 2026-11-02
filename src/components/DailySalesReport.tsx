import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  FileText, 
  ShoppingBag, 
  DollarSign, 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  Car, 
  Printer, 
  Download,
  AlertTriangle,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Product } from '../types/product';

export const BRAND_LOGOS = {
  Chevrolet: '/assets/aistudio/images_d4a35539.jfif',
  MG: '/assets/aistudio/MG_Motor_2021_logo.svg_3eca29e7.webp',
  Opel: '/assets/aistudio/images_237e64a5.png',
  Esperanza: '/assets/aistudio/images__1__160f0bbc.jfif',
};

// Past 7 Days Weekly Sales Performance (Averaging exactly 25,000 EGP as specified by user)
export const PAST_WEEK_SALES_SUMMARY = [
  { day: 'السبت', date: '26 أكتوبر', sales: 26500, invoices: 22, items: 39, target: 25000, profit: 7950 },
  { day: 'الأحد', date: '27 أكتوبر', sales: 24200, invoices: 19, items: 33, target: 25000, profit: 7260 },
  { day: 'الإثنين', date: '28 أكتوبر', sales: 25800, invoices: 21, items: 36, target: 25000, profit: 7740 },
  { day: 'الثلاثاء', date: '29 أكتوبر', sales: 23900, invoices: 18, items: 29, target: 25000, profit: 7170 },
  { day: 'الأربعاء', date: '30 أكتوبر', sales: 25400, invoices: 20, items: 35, target: 25000, profit: 7620 },
  { day: 'الخميس', date: '31 أكتوبر', sales: 27200, invoices: 24, items: 42, target: 25000, profit: 8160 },
  { day: 'الجمعة', date: '1 نوفمبر', sales: 22000, invoices: 16, items: 26, target: 25000, profit: 6600 },
];
// Total Weekly Sales: 175,000 EGP / 7 days = Exactly 25,000 EGP / day average

export interface DailySaleItem {
  id: string;
  invoiceNo: string;
  time: string;
  hour: number;
  partCode: string;
  partName: string;
  carBrand: 'Chevrolet' | 'Opel' | 'MG' | 'Esperanza';
  carModel: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
  costPrice: number;
  paymentMethod: string;
  employee: string;
}

interface DailySalesReportProps {
  products: Product[];
  currentSales?: DailySaleItem[];
}

export const DailySalesReport: React.FC<DailySalesReportProps> = ({ 
  products,
  currentSales 
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'today' | 'yesterday' | 'weekly'>('today');

  // Baseline simulated daily sales data matching TITO STORE catalog
  const defaultSalesData: DailySaleItem[] = [
    {
      id: 'SL-01',
      invoiceNo: 'INV-2026-001',
      time: '09:30 ص',
      hour: 9,
      partCode: 'T2-PH-056',
      partName: 'تيل فرامل خلفي نيو أوبترا سيراميك',
      carBrand: 'Chevrolet',
      carModel: 'نيو أوبترا',
      category: 'Brakes',
      quantity: 2,
      unitPrice: 480,
      total: 960,
      costPrice: 340,
      paymentMethod: 'نقدي (Cash)',
      employee: 'أحمد (الكاشير)',
    },
    {
      id: 'SL-02',
      invoiceNo: 'INV-2026-002',
      time: '10:15 ص',
      hour: 10,
      partCode: 'T2-PH-018',
      partName: 'ماسورة مياه تبريد حديد نيو أوبترا GM',
      carBrand: 'Chevrolet',
      carModel: 'نيو أوبترا',
      category: 'Cooling',
      quantity: 1,
      unitPrice: 420,
      total: 420,
      costPrice: 290,
      paymentMethod: 'فودافون كاش',
      employee: 'أحمد (الكاشير)',
    },
    {
      id: 'SL-03',
      invoiceNo: 'INV-2026-003',
      time: '11:20 ص',
      hour: 11,
      partCode: 'T2-PH-026',
      partName: 'سير كاتينة Gates أوبل أسترا',
      carBrand: 'Opel',
      carModel: 'أسترا J',
      category: 'Engine',
      quantity: 2,
      unitPrice: 650,
      total: 1300,
      costPrice: 480,
      paymentMethod: 'إنستاباي (InstaPay)',
      employee: 'محمد (المبيعات)',
    },
    {
      id: 'SL-04',
      invoiceNo: 'INV-2026-004',
      time: '12:45 م',
      hour: 12,
      partCode: 'T2-PH-001',
      partName: 'بدال بنزين إلكتروني نيو أوبترا GM',
      carBrand: 'Chevrolet',
      carModel: 'نيو أوبترا',
      category: 'Electrical',
      quantity: 1,
      unitPrice: 1150,
      total: 1150,
      costPrice: 850,
      paymentMethod: 'نقدي (Cash)',
      employee: 'أحمد (الكاشير)',
    },
    {
      id: 'SL-05',
      invoiceNo: 'INV-2026-005',
      time: '01:30 م',
      hour: 13,
      partCode: 'T2-PH-071',
      partName: 'طقم مساعدين أمامي غاز MG 5',
      carBrand: 'MG',
      carModel: 'MG 5',
      category: 'Suspension',
      quantity: 1,
      unitPrice: 1980,
      total: 1980,
      costPrice: 1550,
      paymentMethod: 'فيزا (Visa)',
      employee: 'محمد (المبيعات)',
    },
    {
      id: 'SL-06',
      invoiceNo: 'INV-2026-006',
      time: '03:10 م',
      hour: 15,
      partCode: 'T2-PH-052',
      partName: 'جوان وش سلندر معدني شيفروليه كروز',
      carBrand: 'Chevrolet',
      carModel: 'كروز',
      category: 'Engine',
      quantity: 3,
      unitPrice: 680,
      total: 2040,
      costPrice: 480,
      paymentMethod: 'نقدي (Cash)',
      employee: 'أحمد (الكاشير)',
    },
    {
      id: 'SL-07',
      invoiceNo: 'INV-2026-007',
      time: '04:40 م',
      hour: 16,
      partCode: 'T2-PH-083',
      partName: 'طلمبة مياه تبريد إسبيرانزا A516 وتيجو',
      carBrand: 'Esperanza',
      carModel: 'A516',
      category: 'Cooling',
      quantity: 2,
      unitPrice: 490,
      total: 980,
      costPrice: 340,
      paymentMethod: 'إنستاباي (InstaPay)',
      employee: 'أحمد (الكاشير)',
    },
    {
      id: 'SL-08',
      invoiceNo: 'INV-2026-008',
      time: '06:15 م',
      hour: 18,
      partCode: 'T2-PH-065',
      partName: 'كولر ومبرد زيت محرك ألمنيوم كروز وكابتيفا',
      carBrand: 'Chevrolet',
      carModel: 'كابتيفا',
      category: 'Cooling',
      quantity: 1,
      unitPrice: 1350,
      total: 1350,
      costPrice: 1020,
      paymentMethod: 'نقدي (Cash)',
      employee: 'محمد (المبيعات)',
    },
    {
      id: 'SL-09',
      invoiceNo: 'INV-2026-009',
      time: '07:30 م',
      hour: 19,
      partCode: 'T2-PH-092',
      partName: 'طقم تيل فرامل أمامي أوبل أسترا J',
      carBrand: 'Opel',
      carModel: 'أسترا J',
      category: 'Brakes',
      quantity: 2,
      unitPrice: 890,
      total: 1780,
      costPrice: 650,
      paymentMethod: 'فيزا (Visa)',
      employee: 'أحمد (الكاشير)',
    },
    {
      id: 'SL-10',
      invoiceNo: 'INV-2026-010',
      time: '08:45 م',
      hour: 20,
      partCode: 'T2-PH-058',
      partName: 'شداد سير ومجموعة بكرة نيو أوبترا وكروز',
      carBrand: 'Chevrolet',
      carModel: 'نيو أوبترا',
      category: 'Engine',
      quantity: 2,
      unitPrice: 540,
      total: 1080,
      costPrice: 400,
      paymentMethod: 'نقدي (Cash)',
      employee: 'محمد (المبيعات)',
    },
  ];

  const salesData = currentSales && currentSales.length > 0 ? currentSales : defaultSalesData;

  // 1. KPI Calculations
  const totalRevenue = salesData.reduce((sum, item) => sum + item.total, 0);
  const totalInvoices = new Set(salesData.map(i => i.invoiceNo)).size;
  const totalItemsSold = salesData.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = salesData.reduce((sum, item) => sum + (item.costPrice * item.quantity), 0);
  const netProfit = totalRevenue - totalCost;
  const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;
  const averageInvoiceValue = totalInvoices > 0 ? Math.round(totalRevenue / totalInvoices) : 0;

  // 2. Hourly Sales Trend Chart Data
  const hoursMap: { [hour: number]: { sales: number; invoices: number; items: number } } = {
    9: { sales: 0, invoices: 0, items: 0 },
    10: { sales: 0, invoices: 0, items: 0 },
    11: { sales: 0, invoices: 0, items: 0 },
    12: { sales: 0, invoices: 0, items: 0 },
    13: { sales: 0, invoices: 0, items: 0 },
    14: { sales: 0, invoices: 0, items: 0 },
    15: { sales: 0, invoices: 0, items: 0 },
    16: { sales: 0, invoices: 0, items: 0 },
    17: { sales: 0, invoices: 0, items: 0 },
    18: { sales: 0, invoices: 0, items: 0 },
    19: { sales: 0, invoices: 0, items: 0 },
    20: { sales: 0, invoices: 0, items: 0 },
    21: { sales: 0, invoices: 0, items: 0 },
  };

  salesData.forEach(sale => {
    const h = sale.hour || 12;
    if (hoursMap[h]) {
      hoursMap[h].sales += sale.total;
      hoursMap[h].invoices += 1;
      hoursMap[h].items += sale.quantity;
    }
  });

  const hourlyChartData = Object.keys(hoursMap).map(h => {
    const hourNum = parseInt(h, 10);
    const label = hourNum > 12 ? `${hourNum - 12}:00 م` : hourNum === 12 ? '12:00 م' : `${hourNum}:00 ص`;
    return {
      hour: label,
      sales: hoursMap[hourNum].sales,
      invoices: hoursMap[hourNum].invoices,
      items: hoursMap[hourNum].items,
    };
  });

  // 3. Top-Selling Auto Parts (القطع الأكثر مبيعاً)
  const productAggregator: { 
    [code: string]: { 
      code: string; 
      name: string; 
      brand: string; 
      units: number; 
      revenue: number; 
      profit: number 
    } 
  } = {};

  salesData.forEach(sale => {
    if (!productAggregator[sale.partCode]) {
      productAggregator[sale.partCode] = {
        code: sale.partCode,
        name: sale.partName,
        brand: sale.carBrand,
        units: 0,
        revenue: 0,
        profit: 0,
      };
    }
    productAggregator[sale.partCode].units += sale.quantity;
    productAggregator[sale.partCode].revenue += sale.total;
    productAggregator[sale.partCode].profit += (sale.total - (sale.costPrice * sale.quantity));
  });

  const topSellingList = Object.values(productAggregator)
    .sort((a, b) => b.units - a.units)
    .slice(0, 6);

  const topSellingChartData = topSellingList.map(item => ({
    name: item.code,
    fullName: item.name,
    units: item.units,
    revenue: item.revenue,
    brand: item.brand,
  }));

  // 4. Sales Distribution by Brand (شيفروليه، أوبل، إم جي، إسبيرانزا)
  const brandSales: { [brand: string]: number } = {
    'شيفروليه (Chevrolet)': 0,
    'أوبل (Opel)': 0,
    'إم جي (MG)': 0,
    'إسبيرانزا (Esperanza)': 0,
  };

  salesData.forEach(sale => {
    if (sale.carBrand === 'Chevrolet') brandSales['شيفروليه (Chevrolet)'] += sale.total;
    else if (sale.carBrand === 'Opel') brandSales['أوبل (Opel)'] += sale.total;
    else if (sale.carBrand === 'MG') brandSales['إم جي (MG)'] += sale.total;
    else if (sale.carBrand === 'Esperanza') brandSales['إسبيرانزا (Esperanza)'] += sale.total;
  });

  const BRAND_COLORS: { [key: string]: string } = {
    'شيفروليه (Chevrolet)': '#f8fafc', // Crisp White / Silver
    'أوبل (Opel)': '#3b82f6',         // Blue / Silver
    'إم جي (MG)': '#dc2626',           // Racing Red
    'إسبيرانزا (Esperanza)': '#10b981', // Emerald / Teal
  };

  const brandChartData = Object.entries(brandSales).map(([name, value]) => ({
    name,
    value,
    percentage: totalRevenue > 0 ? Math.round((value / totalRevenue) * 100) : 0,
  }));

  // 5. Payment Methods Data
  const paymentMethodsAgg: { [method: string]: number } = {};
  salesData.forEach(sale => {
    paymentMethodsAgg[sale.paymentMethod] = (paymentMethodsAgg[sale.paymentMethod] || 0) + sale.total;
  });
  const paymentChartData = Object.entries(paymentMethodsAgg).map(([method, total]) => ({
    method,
    total,
  }));

  return (
    <div className="space-y-8 text-right font-sans">
      
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-l from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-white mb-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span>نظام تقارير المبيعات اليومية المباشرة | TITO STORE (POWERED BY ZEUS)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              لوحة تحليل المبيعات والقطع الأكثر طلباً
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              المالك: <span className="text-white font-bold">طاهر تيتو</span> · مدير المحل: <span className="text-white font-bold">أحمد</span> · هاتف: <span className="text-white font-mono font-bold">01020272266</span> · 📍 <span className="text-neutral-300">الحرفيين، السلام، القاهرة - شارع المرسيدس</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300">
              <Calendar className="w-3.5 h-3.5 text-red-500" />
              <span>تاريخ اليوم: {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <button 
              onClick={() => window.print()} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-xs font-bold text-white rounded-xl transition-colors shadow-md shadow-red-600/30"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة التقرير</span>
            </button>
          </div>
        </div>

        {/* 4 Brand Logos Strip (Uploaded Assets by User) */}
        <div className="pt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-neutral-400 flex items-center gap-1.5 font-medium">
            <Car className="w-4 h-4 text-red-500" />
            <span>حصر وتوزيع المبيعات المعتمد للعلامات الأربعة فقط:</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Chevrolet */}
            <div className="flex items-center gap-2 bg-neutral-950/80 border border-neutral-800 px-3 py-1.5 rounded-xl">
              <img 
                src={BRAND_LOGOS.Chevrolet} 
                alt="Chevrolet Logo" 
                className="w-7 h-4 object-contain brightness-110" 
              />
              <span className="text-xs font-bold text-white">شيفروليه</span>
            </div>

            {/* Opel */}
            <div className="flex items-center gap-2 bg-neutral-950/80 border border-neutral-800 px-3 py-1.5 rounded-xl">
              <img 
                src={BRAND_LOGOS.Opel} 
                alt="Opel Logo" 
                className="w-5 h-5 object-contain invert" 
              />
              <span className="text-xs font-bold text-blue-400">أوبل</span>
            </div>

            {/* MG */}
            <div className="flex items-center gap-2 bg-neutral-950/80 border border-neutral-800 px-3 py-1.5 rounded-xl">
              <img 
                src={BRAND_LOGOS.MG} 
                alt="MG Logo" 
                className="w-5 h-5 object-contain" 
              />
              <span className="text-xs font-bold text-red-500">MG</span>
            </div>

            {/* Esperanza / Chery */}
            <div className="flex items-center gap-2 bg-neutral-950/80 border border-neutral-800 px-3 py-1.5 rounded-xl">
              <img 
                src={BRAND_LOGOS.Esperanza} 
                alt="Esperanza Chery Logo" 
                className="w-6 h-4 object-contain brightness-125" 
              />
              <span className="text-xs font-bold text-emerald-400">إسبيرانزا</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip - 5 Cards including Weekly 25,000 EGP Average */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* Total Revenue Today */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-neutral-400">إيراد اليوم المباشر</span>
            <div className="w-8 h-8 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tabular-nums tracking-tight">
            {totalRevenue.toLocaleString('en-US')}
            <span className="text-xs font-normal text-white mr-1.5">ج.م</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>نشط من الكاشير</span>
          </div>
        </div>

        {/* Weekly 25,000 EGP Average Benchmark Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-neutral-900 to-neutral-900 border border-red-600/40 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-red-300">متوسط مبيعات آخر أسبوع</span>
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
              7D
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tabular-nums tracking-tight">
            25,000
            <span className="text-xs font-bold text-red-400 mr-1.5">ج.م / يوم</span>
          </div>
          <div className="text-[11px] text-neutral-300 mt-2 flex items-center justify-between">
            <span>إجمالي الأسبوع:</span>
            <strong className="text-white font-mono">175,000 ج.م</strong>
          </div>
        </div>

        {/* Invoices Count */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-neutral-400">عدد الفواتير الصادرة</span>
            <div className="w-8 h-8 rounded-lg bg-neutral-800 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tabular-nums tracking-tight">
            {totalInvoices}
            <span className="text-xs font-normal text-neutral-400 mr-1.5">فاتورة</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">
            متوسط الفاتورة: <span className="font-mono font-bold text-white tabular-nums">{averageInvoiceValue} ج.م</span>
          </div>
        </div>

        {/* Net Profit */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-neutral-400">صافي أرباح اليوم</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums tracking-tight">
            +{netProfit.toLocaleString('en-US')}
            <span className="text-xs font-normal text-emerald-300 mr-1.5">ج.م</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">
            هامش الربح: <span className="font-bold text-emerald-400">{profitMargin}%</span>
          </div>
        </div>

        {/* Items Sold */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 relative overflow-hidden shadow-lg col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-neutral-400">القطع المباعة اليوم</span>
            <div className="w-8 h-8 rounded-lg bg-neutral-800 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tabular-nums tracking-tight">
            {totalItemsSold}
            <span className="text-xs font-normal text-neutral-400 mr-1.5">قطعة</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">
            خصمت تلقائياً من المخزن
          </div>
        </div>

      </div>

      {/* Weekly 7-Day Average 25,000 EGP Performance Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <h3 className="text-sm sm:text-base font-black text-white">
                تقرير المبيعات الأسبوعي الرسمي - متوسط 25,000 ج.م / يوم
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              بيانات الأسبوع الأخير (إجمالي المبيعات: 175,000 ج.م على مدار 7 أيام عمل)
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 text-red-400 border border-red-600/40 rounded-xl text-xs font-bold">
            <span>الهدف المحقق: 100%</span>
          </div>
        </div>

        {/* 7 Days Table and Bar Visual */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {PAST_WEEK_SALES_SUMMARY.map((dayItem) => {
            const isAboveAvg = dayItem.sales >= 25000;
            return (
              <div 
                key={dayItem.day} 
                className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800 text-center space-y-1 hover:border-red-500/50 transition-colors"
              >
                <span className="text-xs font-bold text-white block">{dayItem.day}</span>
                <span className="text-[10px] text-neutral-500 block font-mono">{dayItem.date}</span>
                <div className="py-1">
                  <span className="text-sm font-black font-mono text-white block">
                    {dayItem.sales.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400">ج.م</span>
                </div>
                <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isAboveAvg 
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' 
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}>
                  {isAboveAvg ? `+${(dayItem.sales - 25000).toLocaleString()}` : `${(dayItem.sales - 25000).toLocaleString()}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Charts Grid (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Hourly Sales Area Chart (8 Columns) */}
        <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800 mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>حركة المبيعات الساعية على مدار ساعات عمل المحل</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                توزيع الإيراد (ج.م) وعدد الفواتير المنفذة من الساعة 9:00 صباحاً وحتى 10:00 مساءً
              </p>
            </div>
            <span className="text-xs text-white bg-red-600/30 border border-red-500/50 px-3 py-1 rounded-xl self-start font-mono">
              ذروة اليوم: 3:00 م - 6:00 م
            </span>
          </div>

          {/* Area Chart Container */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis 
                  dataKey="hour" 
                  stroke="#737373" 
                  fontSize={11} 
                  tickLine={false}
                />
                <YAxis 
                  stroke="#737373" 
                  fontSize={11} 
                  tickLine={false}
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl shadow-2xl text-right text-xs">
                          <p className="text-white font-bold mb-1.5">{label}</p>
                          <p className="text-white">
                            المبيعات:{' '}
                            <span className="font-mono font-bold text-emerald-400">
                              {Number(payload[0].value).toLocaleString('en-US')} ج.م
                            </span>
                          </p>
                          <p className="text-neutral-400 text-[11px] mt-0.5">
                            عدد الفواتير: {payload[0].payload.invoices} فاتورة
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  name="المبيعات (ج.م)" 
                  stroke="#dc2626" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#salesGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brand Sales Distribution Donut Chart (4 Columns) */}
        <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="pb-4 border-b border-neutral-800 mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-red-500" />
              <span>توزيع المبيعات بحسب ماركة السيارة</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              نسبة مبيعات الماركات الأربعة المعتمدة اليوم
            </p>
          </div>

          {/* Donut Chart Container */}
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={brandChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {brandChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={BRAND_COLORS[entry.name] || '#dc2626'} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl text-right text-xs">
                          <p className="font-bold text-white mb-1">{data.name}</p>
                          <p className="text-white font-mono font-bold">
                            {data.value.toLocaleString('en-US')} ج.م ({data.percentage}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Brand Breakdown Legend */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/80 text-xs">
            {brandChartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: BRAND_COLORS[item.name] }}
                  />
                  <span className="text-neutral-300">{item.name}</span>
                </div>
                <div className="font-mono text-neutral-400 tabular-nums">
                  <span className="text-white font-bold">{item.percentage}%</span>{' '}
                  <span className="text-[10px]">({item.value.toLocaleString('en-US')} ج.م)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 2: Top Selling Parts BarChart & Breakdown Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top-Selling Bar Chart (6 Columns) */}
        <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
          <div className="pb-4 border-b border-neutral-800 mb-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>القطع الأكثر مبيعاً اليوم (Top-Selling Auto Parts)</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              ترتيب القطع حسب عدد الوحدات المباعة من واقع كتالوج T2-PH
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={topSellingChartData} 
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
                <XAxis type="number" stroke="#737373" fontSize={11} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#ffffff" 
                  fontSize={11} 
                  fontFamily="monospace"
                  tickLine={false}
                  width={80}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl text-right text-xs">
                          <p className="text-white font-mono font-bold mb-1">{d.name}</p>
                          <p className="text-white font-medium mb-1">{d.fullName}</p>
                          <p className="text-emerald-400">
                            الكمية المباعة: <span className="font-bold">{d.units} قطع</span>
                          </p>
                          <p className="text-neutral-400 text-[11px]">
                            إجمالي الإيراد: {d.revenue.toLocaleString('en-US')} ج.م
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="units" 
                  name="الكمية المباعة" 
                  fill="#10b981" 
                  radius={[0, 8, 8, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Sales Breakdown Table (6 Columns) */}
        <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-neutral-800 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span>تفاصيل فواتير اليوم والقطع المباعة</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  أحدث الفواتير المسجلة تلقائياً بنظام AppSheet
                </p>
              </div>
              <span className="text-xs text-neutral-400">
                {salesData.length} عمليات مسجلة
              </span>
            </div>

            <div className="overflow-x-auto max-h-72 overflow-y-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 sticky top-0 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">رقم الفاتورة</th>
                    <th className="py-2.5 px-3">كود القطعة</th>
                    <th className="py-2.5 px-3">اسم القطعة</th>
                    <th className="py-2.5 px-3">الكمية</th>
                    <th className="py-2.5 px-3">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-mono">
                  {salesData.map((sale) => (
                    <tr key={sale.id} className="hover:bg-neutral-800/40 transition-colors">
                      <td className="py-2.5 px-3 text-neutral-300">{sale.invoiceNo}</td>
                      <td className="py-2.5 px-3 font-bold text-white">{sale.partCode}</td>
                      <td className="py-2.5 px-3 font-sans text-white truncate max-w-[140px]">
                        {sale.partName}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold tabular-nums">
                        {sale.quantity}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-white tabular-nums">
                        {sale.total} ج.م
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>طرق السداد المعتمدة: كاش • فودافون كاش • إنستاباي • فيزا</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              تم الترحيل لشيت المبيعات
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
