import React, { useState } from 'react';
import { 
  Database, 
  Smartphone, 
  Barcode as BarcodeIcon, 
  FileSpreadsheet, 
  TrendingUp, 
  AlertTriangle, 
  Check, 
  Copy, 
  ShoppingBag,
  DollarSign,
  Layers,
  ShieldCheck,
  RefreshCw,
  Printer,
  PieChart as PieIcon,
  Clock,
  Car
} from 'lucide-react';
import { Product } from '../types/product';
import { MOCK_AUTO_PARTS } from '../data/mockProducts';
import { CashierTerminal } from './CashierTerminal';
import { DailySalesReport, DailySaleItem } from './DailySalesReport';

interface AppSheetSimulatorProps {
  products?: Product[];
  onUpdateProductsStock?: (deductions: { [productId: string]: number }) => void;
  currentEmployeeName?: string;
  onOpenAuthModal?: () => void;
}

export const AppSheetSimulator: React.FC<AppSheetSimulatorProps> = ({
  products: initialProducts,
  onUpdateProductsStock: externalStockUpdate,
  currentEmployeeName,
  onOpenAuthModal,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || MOCK_AUTO_PARTS);
  const [activeTab, setActiveTab] = useState<'cashier' | 'reports' | 'inventory' | 'guide'>('cashier');
  
  // Real-time sales list updated by the Cashier Terminal
  const [salesList, setSalesList] = useState<DailySaleItem[]>([
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
      employee: 'أحمد',
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
      employee: 'أحمد',
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
      employee: 'محمد',
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
      employee: 'أحمد',
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
      employee: 'محمد',
    },
    {
      id: 'SL-06',
      invoiceNo: 'INV-2026-006',
      time: '03:10 م',
      hour: 15,
      partCode: 'T2-PH-052',
      partName: 'جوان وش سلندر معدني كروز',
      carBrand: 'Chevrolet',
      carModel: 'كروز',
      category: 'Engine',
      quantity: 3,
      unitPrice: 680,
      total: 2040,
      costPrice: 480,
      paymentMethod: 'نقدي (Cash)',
      employee: 'أحمد',
    },
  ]);

  // Handler when Cashier completes an invoice
  const handleCompleteSale = (newSales: DailySaleItem[]) => {
    setSalesList((prev) => [...newSales, ...prev]);
  };

  // Handler for automated stock deduction
  const handleUpdateProductsStock = (deductions: { [productId: string]: number }) => {
    setProducts((prev) =>
      prev.map((item) => {
        const qtyDeducted = deductions[item.id] || deductions[item.partCode] || 0;
        if (qtyDeducted > 0) {
          return {
            ...item,
            stock: Math.max(0, item.stock - qtyDeducted),
          };
        }
        return item;
      })
    );
  };

  return (
    <section className="py-10 bg-neutral-950 border-b border-neutral-800 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Sub-Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 mb-2 uppercase tracking-wide">
              <Database className="w-4 h-4" />
              <span>منظومة الكاشير وإدارة المحل السحابية (POS & ERP)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              TITO <span className="text-red-600">STORE</span> CLOUD SYSTEM
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              إصدار فواتير الكاشير، تقرير المبيعات اليومي برسم بياني Recharts، وفحص المخزون والخصم التلقائي.
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <button
              onClick={() => setActiveTab('cashier')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'cashier'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>محطة الكاشير (POS)</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'reports'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>تقرير المبيعات والرسوم (Recharts)</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'inventory'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>شيت المخزون (Products)</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'guide'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>معادلات AppSheet</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Full Cashier Terminal */}
        {activeTab === 'cashier' && (
          <CashierTerminal
            products={products}
            onCompleteSale={handleCompleteSale}
            onUpdateProductsStock={handleUpdateProductsStock}
            currentEmployeeName={currentEmployeeName}
            onOpenAuthModal={onOpenAuthModal}
          />
        )}

        {/* Tab 2: Recharts Daily Sales Report */}
        {activeTab === 'reports' && (
          <DailySalesReport
            products={products}
            currentSales={salesList}
          />
        )}

        {/* Tab 3: Live Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>شيت الأصناف الفعلي (`Products` Sheet) - مربوط بـ AppSheet</span>
              </div>
              <span className="text-xs text-neutral-400">
                إجمالي الأصناف: <strong className="text-white font-mono">{products.length}</strong> صنف
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">كود القطعة</th>
                    <th className="py-3 px-4">اسم القطعة</th>
                    <th className="py-3 px-4">الماركة والموديل</th>
                    <th className="py-3 px-4">القسم</th>
                    <th className="py-3 px-4">سعر التكلفة</th>
                    <th className="py-3 px-4">سعر البيع</th>
                    <th className="py-3 px-4">الكمية الحالية</th>
                    <th className="py-3 px-4">حد الطلب</th>
                    <th className="py-3 px-4">حالة المخزون</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-mono">
                  {products.map((p) => {
                    const isLow = p.stock <= p.reorderLevel;
                    return (
                      <tr key={p.id} className="hover:bg-neutral-800/40 transition-colors">
                        <td className="py-3 px-4 font-bold text-red-400">{p.partCode}</td>
                        <td className="py-3 px-4 font-sans font-medium text-white">{p.name}</td>
                        <td className="py-3 px-4 font-sans text-neutral-300">
                          {p.carBrand} - {p.carModel}
                        </td>
                        <td className="py-3 px-4 font-sans text-neutral-400">{p.category}</td>
                        <td className="py-3 px-4 text-neutral-400 tabular-nums">{p.costPrice} ج.م</td>
                        <td className="py-3 px-4 font-bold text-white tabular-nums">{p.price} ج.م</td>
                        <td className={`py-3 px-4 font-black tabular-nums ${isLow ? 'text-red-400' : 'text-emerald-400'}`}>
                          {p.stock} قطعة
                        </td>
                        <td className="py-3 px-4 text-neutral-500 tabular-nums">{p.reorderLevel}</td>
                        <td className="py-3 px-4 font-sans">
                          {isLow ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-red-400 bg-red-950/40 border border-red-500/30 px-2.5 py-0.5 rounded-lg">
                              <AlertTriangle className="w-3 h-3" />
                              طلب شراء فوري
                            </span>
                          ) : (
                            <span className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                              مخزون آمن
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: AppSheet Guide */}
        {activeTab === 'guide' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Copy className="w-5 h-5 text-red-500" />
              <span>معادلات وصيغ AppSheet الجاهزة للربط بقاعدة بيانات Google Sheets</span>
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="font-sans font-bold text-red-400 mb-1">
                  1. جلب سعر البيع تلقائياً بمجرد اختيار الصنف (في Initial Value لعمود Unit_Price):
                </div>
                <code className="text-neutral-200 block py-1 font-bold">
                  [Product_ID].[Selling_Price]
                </code>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="font-sans font-bold text-red-400 mb-1">
                  2. حساب إجمالي سطر الفاتورة تلقائياً (في Formula لعمود Total):
                </div>
                <code className="text-neutral-200 block py-1 font-bold">
                  [Quantity] * [Unit_Price]
                </code>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="font-sans font-bold text-red-400 mb-1">
                  3. إجراء الخصم التلقائي للمخزون (AppSheet Action on Form Save):
                </div>
                <code className="text-emerald-400 block py-1 font-bold">
                  [Current_Stock] - [_THISROW_BEFORE].[Quantity]
                </code>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="font-sans font-bold text-red-400 mb-1">
                  4. معادلة إجمالي مبيعات اليوم في لوحة المدير:
                </div>
                <code className="text-white block py-1 font-bold">
                  SUM(SELECT(Sales[Total], [Date] = TODAY()))
                </code>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
