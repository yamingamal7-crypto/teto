import React, { useState, useMemo } from 'react';
import { 
  Barcode, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  CheckCircle2, 
  DollarSign, 
  CreditCard, 
  Smartphone, 
  User, 
  FileText, 
  Car, 
  AlertCircle, 
  Sparkles,
  Percent,
  Receipt,
  X,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types/product';
import { DailySaleItem } from './DailySalesReport';
import { ThermalReceiptPrint, ReceiptData } from './ThermalReceiptPrint';

interface CartLineItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number; // percentage or fixed
}

interface CashierTerminalProps {
  products: Product[];
  onCompleteSale: (newSales: DailySaleItem[]) => void;
  onUpdateProductsStock: (deductions: { [productId: string]: number }) => void;
  currentEmployeeName?: string;
  onOpenAuthModal?: () => void;
}

export const CashierTerminal: React.FC<CashierTerminalProps> = ({
  products,
  onCompleteSale,
  onUpdateProductsStock,
  currentEmployeeName,
  onOpenAuthModal,
}) => {
  // Cashier State
  const [cartItems, setCartItems] = useState<CartLineItem[]>([
    {
      product: products[0] || {
        id: 'T2-PH-018',
        name: 'ماسورة مياه تبريد حديد نيو أوبترا (GM 23876059)',
        partCode: 'T2-PH-018',
        brand: 'GM Genuine Parts',
        carBrand: 'Chevrolet',
        carModel: 'نيو أوبترا',
        category: 'Cooling',
        price: 420,
        costPrice: 290,
        stock: 12,
        reorderLevel: 3,
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__25__acf26c25.jpeg',
        description: 'ماسورة مياه تبريد أصلية GM',
        isOriginal: true,
      },
      quantity: 1,
      unitPrice: 420,
      discount: 0,
    },
    {
      product: products[1] || {
        id: 'T2-PH-056',
        name: 'تيل فرامل خلفي نيو أوبترا سيراميك',
        partCode: 'T2-PH-056',
        brand: 'GM OEM',
        carBrand: 'Chevrolet',
        carModel: 'نيو أوبترا',
        category: 'Brakes',
        price: 480,
        costPrice: 340,
        stock: 15,
        reorderLevel: 4,
        imageUrl: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__2__ebd69d9d.jpeg',
        description: 'طقم تيل فرامل خلفي سيراميك',
        isOriginal: true,
      },
      quantity: 2,
      unitPrice: 480,
      discount: 0,
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'instapay' | 'visa' | 'credit'>('cash');
  const [cashTendered, setCashTendered] = useState<number>(1500);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [activeCashierName, setActiveCashierName] = useState<string>('أحمد (مدير المحل)');

  // Customer Information
  const [customerName, setCustomerName] = useState<string>('المهندس / سامح عبد الله');
  const [customerPhone, setCustomerPhone] = useState<string>('01012345678');
  const [customerCar, setCustomerCar] = useState<string>('شيفروليه نيو أوبترا 2019 (لوحة: س ق ر 128)');

  // Receipt Modal
  const [printedReceipt, setPrintedReceipt] = useState<{
    invoiceNo: string;
    items: CartLineItem[];
    subtotal: number;
    discountAmount: number;
    total: number;
    paymentMethod: string;
    cashTendered: number;
    changeDue: number;
    customerName: string;
    customerPhone: string;
    customerCar: string;
    date: string;
    time: string;
  } | null>(null);

  // Quick Barcode Scanning Simulation
  const [barcodeScanInput, setBarcodeScanInput] = useState('');
  const [scanNotice, setScanNotice] = useState<string | null>(null);

  // Filter Catalog Items for Quick Selection
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedBrandFilter !== 'all' && p.carBrand !== selectedBrandFilter && p.carBrand !== 'Universal') {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mName = p.name.toLowerCase().includes(q);
        const mCode = p.partCode.toLowerCase().includes(q);
        const mOem = p.barcode?.includes(q) || false;
        const mCar = p.carModel.toLowerCase().includes(q);
        if (!mName && !mCode && !mOem && !mCar) return false;
      }
      return true;
    });
  }, [products, searchQuery, selectedBrandFilter]);

  // Cart Operations
  const handleAddItemToCart = (product: Product) => {
    const existing = cartItems.find((i) => i.product.id === product.id);
    if (existing) {
      if (existing.quantity >= product.stock) {
        setScanNotice(`الكمية المتوفرة بالمخزن (${product.stock}) وصلت للحد الأقصى!`);
        setTimeout(() => setScanNotice(null), 3000);
        return;
      }
      setCartItems((prev) =>
        prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          product,
          quantity: 1,
          unitPrice: product.price,
          discount: 0,
        },
      ]);
    }

    setScanNotice(`تم إضافة [${product.partCode}] ${product.name} إلى الفاتورة`);
    setTimeout(() => setScanNotice(null), 2500);
  };

  const handleUpdateItemQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            if (newQty > item.product.stock) {
              setScanNotice(`أقصى رصيد متاح في المخزن هو ${item.product.stock} قطع`);
              setTimeout(() => setScanNotice(null), 2500);
              return item;
            }
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean) as CartLineItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeScanInput.trim()) return;
    const code = barcodeScanInput.trim().toUpperCase();
    const found = products.find(
      (p) =>
        p.partCode.toUpperCase() === code ||
        p.id.toUpperCase() === code ||
        p.barcode === code ||
        p.partCode.replace('-', '').toUpperCase() === code.replace('-', '')
    );

    if (found) {
      handleAddItemToCart(found);
      setBarcodeScanInput('');
    } else {
      setScanNotice(`لم يتم العثور على الصنف بالباركود: ${barcodeScanInput}`);
      setTimeout(() => setScanNotice(null), 3000);
    }
  };

  // Financial Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const changeDue = Math.max(0, cashTendered - finalTotal);

  // Complete & Finalize Sale
  const handleFinalizeSale = () => {
    if (cartItems.length === 0) {
      alert('الفاتورة فارغة! يرجى إضافة أصناف أولاً.');
      return;
    }

    const now = new Date();
    const invoiceNo = `INV-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timeFormatted = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const dateFormatted = now.toISOString().split('T')[0];

    // Build sale items array
    const newSalesRecords: DailySaleItem[] = cartItems.map((item, idx) => ({
      id: `SL-${Date.now()}-${idx}`,
      invoiceNo,
      time: timeFormatted,
      hour: now.getHours(),
      partCode: item.product.partCode,
      partName: item.product.name,
      carBrand: item.product.carBrand as any,
      carModel: item.product.carModel,
      category: item.product.category,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice,
      costPrice: item.product.costPrice || item.unitPrice * 0.7,
      paymentMethod:
        paymentMethod === 'cash'
          ? 'نقدي (Cash)'
          : paymentMethod === 'instapay'
          ? 'إنستاباي (InstaPay)'
          : paymentMethod === 'visa'
          ? 'فيزا (Visa)'
          : 'آجل / حساب عميل',
      employee: activeCashierName.split(' ')[0],
    }));

    // Deductions map for products table
    const deductions: { [id: string]: number } = {};
    cartItems.forEach((item) => {
      deductions[item.product.id] = item.quantity;
    });

    // Notify parent
    onCompleteSale(newSalesRecords);
    onUpdateProductsStock(deductions);

    // Show Printable Receipt
    setPrintedReceipt({
      invoiceNo,
      items: [...cartItems],
      subtotal,
      discountAmount,
      total: finalTotal,
      paymentMethod:
        paymentMethod === 'cash'
          ? 'نقدي (Cash)'
          : paymentMethod === 'instapay'
          ? 'إنستاباي / فودافون كاش'
          : paymentMethod === 'visa'
          ? 'بطاقة دفع إلكترونية'
          : 'آجل / شكك',
      cashTendered,
      changeDue,
      customerName,
      customerPhone,
      customerCar,
      date: dateFormatted,
      time: timeFormatted,
    });

    // Reset Cart
    setCartItems([]);
  };

  return (
    <div className="space-y-6 text-right font-sans">
      
      {/* Top Cashier Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-red-600/30">
            T
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-wide">
                محطة الكاشير ونقاط البيع | TITO <span className="text-red-500">STORE</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-red-950/80 text-red-400 border border-red-800/50 rounded font-bold">
                نظام مباشر
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-neutral-400">
                الموظف المسجل: <span className="text-white font-bold">{currentEmployeeName || activeCashierName}</span>
              </span>
              {onOpenAuthModal && (
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className="px-2 py-0.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[10px] font-bold border border-neutral-700 transition-colors"
                >
                  تبديل الحساب / الباسورد
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Barcode Quick Scan Bar */}
        <form onSubmit={handleBarcodeSubmit} className="flex-1 max-w-md relative">
          <div className="relative flex items-center bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-1.5 focus-within:border-red-500 transition-colors">
            <Barcode className="w-5 h-5 text-red-500 shrink-0 ml-2" />
            <input
              type="text"
              value={barcodeScanInput}
              onChange={(e) => setBarcodeScanInput(e.target.value)}
              placeholder="امسح الباركود بالكاميرا أو اكتب كود القطعة (مثال: T2-PH-018)..."
              className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none py-1"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shrink-0 shadow-sm"
            >
              إضافة
            </button>
          </div>
        </form>

        {/* Quick Clear / Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCartItems([])}
            className="px-3 py-1.5 text-xs text-neutral-400 hover:text-red-400 hover:bg-neutral-800/80 rounded-xl transition-colors border border-neutral-800"
          >
            تفريغ الفاتورة
          </button>
        </div>
      </div>

      {/* Floating Scan Notice */}
      {scanNotice && (
        <div className="p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs rounded-xl flex items-center justify-between animate-fade-in shadow-lg">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
            {scanNotice}
          </span>
          <button onClick={() => setScanNotice(null)} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Terminal Split: Left = Cart & Invoice, Right = Quick Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* RIGHT: Quick Items Catalog (7 Cols) */}
        <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-xl space-y-4">
          
          {/* Brand Filter Buttons with Colors */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-xl text-xs">
              {[
                { id: 'all', label: 'جميع الأصناف' },
                { id: 'Chevrolet', label: 'شيفروليه' },
                { id: 'Opel', label: 'أوبل' },
                { id: 'MG', label: 'MG' },
                { id: 'Esperanza', label: 'إسبيرانزا' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrandFilter(b.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    selectedBrandFilter === b.id
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* In-stock search */}
            <div className="relative min-w-[180px]">
              <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في الرفوف..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pr-8 pl-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Quick-Pick Product Tiles Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredProducts.map((p) => {
              const isOutOfStock = p.stock <= 0;
              const inCart = cartItems.find((ci) => ci.product.id === p.id);

              return (
                <button
                  key={p.id}
                  disabled={isOutOfStock}
                  onClick={() => handleAddItemToCart(p)}
                  className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between relative group ${
                    isOutOfStock
                      ? 'bg-neutral-950/40 border-neutral-900 opacity-50 cursor-not-allowed'
                      : inCart
                      ? 'bg-neutral-950 border-red-500/80 shadow-md shadow-red-600/10'
                      : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-950'
                  }`}
                >
                  {/* Top tags */}
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-mono text-[10px] font-bold text-red-400 bg-red-950/40 px-1.5 py-0.5 rounded border border-red-900/30">
                      {p.partCode}
                    </span>
                    <span className="text-[10px] text-neutral-400 tabular-nums">
                      متبقي: <strong className={p.stock <= p.reorderLevel ? 'text-white font-black bg-red-600/80 px-1.5 py-0.5 rounded' : 'text-emerald-400'}>{p.stock}</strong>
                    </span>
                  </div>

                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-2 mb-2 w-full">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/src/assets/images/part_engine_turbocharger_1793629993738.jpg';
                      }}
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white truncate group-hover:text-red-400 transition-colors">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate">
                        {p.carModel}
                      </div>
                    </div>
                  </div>

                  {/* Price Bar */}
                  <div className="flex items-center justify-between w-full pt-2 border-t border-neutral-900">
                    <span className="text-xs font-black text-white tabular-nums">
                      {p.price} <span className="text-[10px] text-neutral-400">ج.م</span>
                    </span>
                    <span className="text-[10px] font-bold text-red-400 group-hover:translate-x-1 transition-transform">
                      + إضافة
                    </span>
                  </div>

                  {inCart && (
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow">
                      {inCart.quantity}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* LEFT: Current Invoice Terminal (5 Cols) */}
        <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between">
          
          <div>
            {/* Invoice Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-black text-white">
                  الفاتورة الحالية (Current Invoice)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-neutral-400">
                {cartItems.length} بنود
              </span>
            </div>

            {/* Customer Details Box */}
            <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800/80 mb-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <User className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اسم العميل..."
                  className="w-full bg-transparent text-white focus:outline-none text-xs font-medium"
                />
              </div>

              <div className="flex items-center gap-2 text-neutral-400 pt-1 border-t border-neutral-900">
                <Smartphone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="رقم تليفون العميل..."
                  className="w-full bg-transparent text-neutral-300 focus:outline-none text-xs"
                />
              </div>

              <div className="flex items-center gap-2 text-neutral-400 pt-1 border-t border-neutral-900">
                <Car className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <input
                  type="text"
                  value={customerCar}
                  onChange={(e) => setCustomerCar(e.target.value)}
                  placeholder="نوع السيارة ورقم اللوحة..."
                  className="w-full bg-transparent text-neutral-300 focus:outline-none text-xs"
                />
              </div>
            </div>

            {/* Cart Line Items List */}
            <div className="max-h-[220px] overflow-y-auto space-y-2 mb-4 pr-1">
              {cartItems.length === 0 ? (
                <div className="text-center py-10 bg-neutral-950/60 rounded-2xl border border-neutral-800 text-neutral-500 text-xs">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30 text-red-500" />
                  <span>الفاتورة فارغة، اختر أصنافاً من القائمة لإضافتها</span>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs"
                  >
                    <div className="overflow-hidden max-w-[150px]">
                      <span className="font-mono text-[10px] text-red-400 font-bold block">
                        {item.product.partCode}
                      </span>
                      <span className="text-white font-medium truncate block">
                        {item.product.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 tabular-nums">
                        {item.unitPrice} ج.م / قطعة
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                      <button
                        onClick={() => handleUpdateItemQty(item.product.id, -1)}
                        className="p-1 hover:bg-neutral-800 text-neutral-300 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateItemQty(item.product.id, 1)}
                        className="p-1 hover:bg-neutral-800 text-neutral-300 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Item Total & Delete */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-white tabular-nums">
                        {item.quantity * item.unitPrice} ج.م
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment & Totals Section */}
          <div className="pt-3 border-t border-neutral-800 space-y-3">
            
            {/* Payment Methods */}
            <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
              {[
                { id: 'cash', label: 'كاش (نقدي)' },
                { id: 'instapay', label: 'إنستاباي' },
                { id: 'visa', label: 'فيزا / كارت' },
                { id: 'credit', label: 'آجل / شكك' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-2 px-1 text-center rounded-xl transition-all ${
                    paymentMethod === m.id
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Calculations Strip */}
            <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>المجموع الفرعي:</span>
                <span className="font-mono text-white tabular-nums">{subtotal} ج.م</span>
              </div>

              {/* Discount Selector */}
              <div className="flex items-center justify-between text-neutral-400 pt-1 border-t border-neutral-900">
                <span className="flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-white" />
                  <span className="text-white text-xs font-bold">نسبة الخصم:</span>
                </span>
                <div className="flex items-center gap-1.5">
                  {[0, 5, 10].map((disc) => (
                    <button
                      key={disc}
                      onClick={() => setDiscountPercent(disc)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-black transition-all ${
                        discountPercent === disc
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                          : 'bg-neutral-950 text-neutral-300 border border-neutral-800 hover:text-white'
                      }`}
                    >
                      {disc}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center text-sm font-black text-white pt-2 border-t border-neutral-800">
                <span>المبلغ الإجمالي المستحق:</span>
                <span className="text-xl font-mono text-red-500 tabular-nums">
                  {finalTotal.toLocaleString('en-US')} ج.م
                </span>
              </div>

              {/* Cash Paid / Change Due */}
              {paymentMethod === 'cash' && (
                <div className="pt-2 border-t border-neutral-900 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-neutral-500 block mb-1">المبلغ المستلم:</span>
                    <input
                      type="number"
                      value={cashTendered}
                      onChange={(e) => setCashTendered(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-700 text-white rounded px-2 py-1 font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-1">المتبقي للعميل:</span>
                    <span className="font-mono font-bold text-emerald-400 text-xs block py-1">
                      {changeDue} ج.م
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Checkout Button */}
            <button
              onClick={handleFinalizeSale}
              disabled={cartItems.length === 0}
              className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                cartItems.length === 0
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 active:scale-95'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>إتمام عملية البيع وطباعة الفاتورة</span>
            </button>

          </div>

        </div>

      </div>

      {/* Official 80mm Thermal Receipt Print Modal */}
      {printedReceipt && (
        <ThermalReceiptPrint
          isOpen={!!printedReceipt}
          onClose={() => setPrintedReceipt(null)}
          data={{
            invoiceNo: printedReceipt.invoiceNo,
            date: printedReceipt.date,
            time: printedReceipt.time,
            cashierName: activeCashierName,
            customerName: printedReceipt.customerName,
            customerPhone: printedReceipt.customerPhone,
            customerCar: printedReceipt.customerCar,
            items: printedReceipt.items.map((i) => ({
              code: i.product.partCode,
              name: i.product.name,
              quantity: i.quantity,
              unitPrice: i.unitPrice,
              total: i.quantity * i.unitPrice,
            })),
            subtotal: printedReceipt.subtotal,
            discount: printedReceipt.discountAmount,
            total: printedReceipt.total,
            paymentMethod: printedReceipt.paymentMethod,
            cashTendered: printedReceipt.cashTendered,
            changeDue: printedReceipt.changeDue,
          }}
        />
      )}

    </div>
  );
};
