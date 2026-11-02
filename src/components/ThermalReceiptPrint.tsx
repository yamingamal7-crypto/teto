import React, { useRef } from 'react';
import { 
  Printer, 
  X, 
  Download, 
  Check, 
  QrCode, 
  Barcode as BarcodeIcon, 
  Receipt,
  Share2
} from 'lucide-react';

export interface ReceiptItem {
  code: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ReceiptData {
  invoiceNo: string;
  date: string;
  time: string;
  cashierName?: string;
  customerName?: string;
  customerPhone?: string;
  customerCar?: string;
  items: ReceiptItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  paymentMethod: string;
  cashTendered?: number;
  changeDue?: number;
}

interface ThermalReceiptPrintProps {
  isOpen: boolean;
  onClose: () => void;
  data: ReceiptData | null;
  onPrint?: () => void;
}

export const ThermalReceiptPrint: React.FC<ThermalReceiptPrintProps> = ({
  isOpen,
  onClose,
  data,
  onPrint,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !data) return null;

  const handleTriggerPrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-neutral-950 font-sans">
      
      {/* Modal Dialog Container */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar (Non-Printable) */}
        <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-red-500" />
            <span className="text-xs font-black tracking-wide">
              معاينة الإيصال الحراري (80mm Thermal Receipt)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Receipt Area */}
        <div className="overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-neutral-950/60">
          
          {/* Physical Thermal Paper Simulation (80mm width) */}
          <div 
            ref={receiptRef}
            id="thermal-receipt-printable"
            className="w-full max-w-[320px] bg-white text-black p-5 shadow-2xl rounded-sm font-mono text-[11px] leading-tight select-none border-t-8 border-red-600 print:shadow-none print:m-0 print:w-full print:max-w-none text-right"
            style={{ direction: 'rtl' }}
          >
            
            {/* Store Official Logo & Header */}
            <div className="text-center pb-3 border-b-2 border-dashed border-neutral-400 space-y-1">
              
              {/* Graphic Logo Badge */}
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-red-600 font-black text-xl border border-neutral-800 shadow-sm">
                  T
                </div>
                <div className="text-xl font-black tracking-wider text-black">
                  <span className="text-red-600">TI</span>TO <span className="text-xs tracking-widest font-normal text-neutral-600">STORE</span>
                </div>
              </div>

              <div className="text-[9px] font-bold tracking-wider text-neutral-700">
                POWERED BY <span className="text-red-600 font-black">ZEUS</span>
              </div>

              <div className="text-[8.5px] font-bold text-neutral-600 pt-0.5">
                شيفروليه • أوبل • MG • إسبيرانزا
              </div>

              <div className="text-[9.5px] text-neutral-800 font-bold pt-1">
                المالك: طاهر تيتو · مدير المحل: أحمد
              </div>

              <div className="text-[10px] font-black text-black pt-0.5 font-mono">
                هاتف وواتساب: 01020272266
              </div>

              <div className="text-[9px] font-bold text-neutral-800 pt-0.5 leading-tight">
                📍 الحرفيين، السلام، القاهرة - شارع المرسيدس
              </div>

              <div className="text-[8px] text-neutral-500 pt-0.5">
                سجل تجاري: 449210 · قسم قطع الغيار ومركز الصيانة
              </div>
            </div>

            {/* Invoice Metadata */}
            <div className="py-2.5 border-b border-neutral-300 text-[10px] space-y-1 text-neutral-700">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">رقم الفاتورة:</span>
                <span className="font-black text-black font-mono text-[11px]">{data.invoiceNo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">التاريخ والوقت:</span>
                <span>{data.date} - {data.time}</span>
              </div>
              {data.cashierName && (
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">الكاشير المسئول:</span>
                  <span className="text-black font-semibold">{data.cashierName}</span>
                </div>
              )}
              {data.customerName && (
                <div className="flex justify-between items-center pt-1 border-t border-dotted border-neutral-200">
                  <span className="text-neutral-500">العميل:</span>
                  <span className="font-bold text-black truncate max-w-[170px]">{data.customerName}</span>
                </div>
              )}
              {data.customerPhone && (
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">رقم الهاتف:</span>
                  <span className="font-mono">{data.customerPhone}</span>
                </div>
              )}
              {data.customerCar && (
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">بيانات المركبة:</span>
                  <span className="truncate max-w-[170px]">{data.customerCar}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">طريقة السداد:</span>
                <span className="font-bold text-black">{data.paymentMethod}</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-2.5 border-b-2 border-dashed border-neutral-400">
              <div className="flex justify-between font-black text-[9.5px] text-neutral-900 pb-1.5 border-b border-neutral-300">
                <span className="w-36 text-right">الصنف والكود</span>
                <span className="w-16 text-center">الكمية × السعر</span>
                <span className="w-16 text-left">الإجمالي</span>
              </div>

              <div className="space-y-2 pt-1.5">
                {data.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start text-[10.5px]">
                    <div className="w-36 overflow-hidden">
                      <span className="font-black text-black font-mono block text-[10px]">
                        [{item.code}]
                      </span>
                      <span className="text-neutral-800 text-[10px] block truncate">
                        {item.name}
                      </span>
                    </div>

                    <div className="w-16 text-center text-neutral-700 text-[10px] pt-0.5">
                      {item.quantity} × {item.unitPrice}
                    </div>

                    <div className="w-16 text-left font-black text-black tabular-nums pt-0.5">
                      {item.total} ج.م
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals & Calculations */}
            <div className="py-2.5 border-b-2 border-dashed border-neutral-400 space-y-1 text-[11px]">
              <div className="flex justify-between text-neutral-600">
                <span>المجموع الفرعي:</span>
                <span className="font-mono tabular-nums">{data.subtotal} ج.م</span>
              </div>

              {data.discount && data.discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>الخصم المطبق:</span>
                  <span className="font-mono tabular-nums">-{data.discount} ج.م</span>
                </div>
              )}

              {data.tax && data.tax > 0 && (
                <div className="flex justify-between text-neutral-600">
                  <span>ضريبة القيمة المضافة:</span>
                  <span className="font-mono tabular-nums">+{data.tax} ج.م</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-black pt-1.5 border-t border-neutral-300">
                <span>المبلغ الإجمالي الصافي:</span>
                <span className="text-base font-black text-red-600 font-mono tabular-nums">
                  {data.total.toLocaleString('en-US')} ج.م
                </span>
              </div>

              {data.cashTendered && data.cashTendered > 0 && (
                <div className="pt-1.5 border-t border-dotted border-neutral-200 text-[10px] text-neutral-600 space-y-0.5">
                  <div className="flex justify-between">
                    <span>المبلغ المستلم نقداً:</span>
                    <span className="font-mono tabular-nums">{data.cashTendered} ج.م</span>
                  </div>
                  <div className="flex justify-between font-bold text-black">
                    <span>المتبقي للعميل (الفكة):</span>
                    <span className="font-mono tabular-nums text-emerald-700">{data.changeDue || 0} ج.م</span>
                  </div>
                </div>
              )}
            </div>

            {/* Barcode & Verification */}
            <div className="pt-3 pb-2 text-center space-y-1.5">
              
              {/* Simulated Code128 Barcode */}
              <div className="flex flex-col items-center justify-center">
                <div className="h-9 w-44 bg-neutral-900 flex items-center justify-center px-2 py-1 rounded">
                  <div className="h-full w-full flex items-center justify-between gap-[2px]">
                    {[2,1,3,1,2,3,1,2,1,3,2,1,2,3,1,2,1,3,1,2,3,1,2].map((w, i) => (
                      <div 
                        key={i} 
                        className="h-full bg-white" 
                        style={{ width: `${w * 1.5}px` }} 
                      />
                    ))}
                  </div>
                </div>
                <span className="font-mono text-[9px] text-neutral-600 tracking-widest mt-0.5">
                  *{data.invoiceNo}*
                </span>
              </div>

              <div className="text-[8.5px] text-neutral-500 leading-tight pt-1">
                * البضاعة المباعة تستبدل وترد خلال 14 يوماً مع الاحتفاظ بالفاتورة والكرتونة الأصلية *
              </div>

              <div className="text-[9.5px] font-black text-black pt-1">
                شكراً لتعاملكم مع TITO STORE
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Actions Toolbar (Non-Printable) */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white rounded-xl transition-colors"
          >
            إغلاق
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`فاتورة TITO STORE رقم ${data.invoiceNo} بإجمالي ${data.total} ج.م`);
                alert('تم نسخ ملخص الفاتورة بنجاح!');
              }}
              className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs rounded-xl transition-colors border border-neutral-800 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة</span>
            </button>

            <button
              onClick={handleTriggerPrint}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الإيصال الحراري</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
