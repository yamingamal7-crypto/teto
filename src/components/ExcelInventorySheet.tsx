import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Filter, 
  Plus, 
  Minus, 
  Edit3, 
  Trash2, 
  Download, 
  Printer, 
  Check, 
  AlertTriangle, 
  Layers, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  DollarSign,
  Package,
  Car,
  X,
  Save,
  RotateCcw
} from 'lucide-react';
import { Product } from '../types/product';
import { TitoOfficialLogo } from './TitoOfficialLogo';

interface ExcelInventorySheetProps {
  products: Product[];
  onUpdateProduct: (updated: Product) => void;
  onAddProduct: (newProd: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ExcelInventorySheet: React.FC<ExcelInventorySheetProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSheetTab, setActiveSheetTab] = useState<'all' | 'low_stock' | 'chevrolet' | 'opel' | 'mg' | 'esperanza'>('all');
  const [activeCell, setActiveCell] = useState<{ row: number; col: string; value: string }>({
    row: 1,
    col: 'C',
    value: products[0]?.name || 'ماسورة مياه تبريد حديد نيو أوبترا (GM 23876059)',
  });

  // Editing single item modal/state
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editCost, setEditCost] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  // New item modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPartCode, setNewPartCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState<'Chevrolet' | 'Opel' | 'MG' | 'Esperanza'>('Chevrolet');
  const [newModel, setNewModel] = useState('نيو أوبترا (New Optra)');
  const [newCategory, setNewCategory] = useState<'Brakes' | 'Engine' | 'Suspension' | 'Cooling' | 'Electrical' | 'Body'>('Engine');
  const [newPrice, setNewPrice] = useState<number>(450);
  const [newCostPrice, setNewCostPrice] = useState<number>(310);
  const [newStock, setNewStock] = useState<number>(10);
  const [newBarcode, setNewBarcode] = useState('');

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Sheet tab filter
      if (activeSheetTab === 'low_stock' && p.stock > (p.reorderLevel || 3)) {
        return false;
      }
      if (activeSheetTab === 'chevrolet' && p.carBrand !== 'Chevrolet') return false;
      if (activeSheetTab === 'opel' && p.carBrand !== 'Opel') return false;
      if (activeSheetTab === 'mg' && p.carBrand !== 'MG') return false;
      if (activeSheetTab === 'esperanza' && p.carBrand !== 'Esperanza') return false;

      // Dropdown brand filter
      if (selectedBrand !== 'all' && p.carBrand !== selectedBrand && p.carBrand !== 'Universal') {
        return false;
      }

      // Dropdown category filter
      if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mName = p.name.toLowerCase().includes(q);
        const mCode = p.partCode.toLowerCase().includes(q);
        const mBarcode = p.barcode?.includes(q) || false;
        const mModel = p.carModel.toLowerCase().includes(q);
        if (!mName && !mCode && !mBarcode && !mModel) return false;
      }

      return true;
    });
  }, [products, activeSheetTab, selectedBrand, selectedCategory, searchQuery]);

  // Aggregate stats
  const totalUnits = useMemo(() => products.reduce((acc, p) => acc + p.stock, 0), [products]);
  const totalCostValuation = useMemo(() => products.reduce((acc, p) => acc + ((p.costPrice || p.price * 0.7) * p.stock), 0), [products]);
  const totalRetailValuation = useMemo(() => products.reduce((acc, p) => acc + (p.price * p.stock), 0), [products]);
  const expectedProfit = totalRetailValuation - totalCostValuation;

  // Inline Quick Stock Adjustment
  const handleQuickStockChange = (product: Product, delta: number) => {
    const updated = {
      ...product,
      stock: Math.max(0, product.stock + delta),
    };
    onUpdateProduct(updated);
  };

  // Open Edit Modal
  const handleStartEdit = (product: Product) => {
    setEditingItem(product);
    setEditPrice(product.price);
    setEditCost(product.costPrice || Math.round(product.price * 0.7));
    setEditStock(product.stock);
  };

  // Save Edit
  const handleSaveEdit = () => {
    if (!editingItem) return;
    const updated: Product = {
      ...editingItem,
      price: editPrice,
      costPrice: editCost,
      stock: editStock,
    };
    onUpdateProduct(updated);
    setEditingItem(null);
  };

  // Add Item Submit
  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPartCode.trim()) return;

    const newProd: Product = {
      id: `T2-${Date.now().toString().slice(-4)}`,
      name: newName.trim(),
      partCode: newPartCode.trim(),
      brand: newBrand === 'Chevrolet' ? 'GM Genuine Parts' : `${newBrand} OEM`,
      carBrand: newBrand,
      carModel: newModel,
      category: newCategory,
      price: newPrice,
      costPrice: newCostPrice,
      stock: newStock,
      reorderLevel: 3,
      barcode: newBarcode.trim() || `${Date.now().toString().slice(-8)}`,
      imageUrl: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__25__acf26c25.jpeg',
      description: `صنف مضاف جديد لـ ${newBrand} ${newModel} تم إدخاله في شيت المخزن.`,
      isOriginal: true,
    };

    onAddProduct(newProd);
    setIsAddModalOpen(false);
    // Reset form
    setNewPartCode('');
    setNewName('');
    setNewBarcode('');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'م,كود القطعة,اسم الصنف,ماركة السيارة,الموديل,التصنيف,الباركود,سعر التكلفة,سعر البيع,الربح المتوقع,الكمية بالمخزن\n';
    const rows = filteredProducts.map((p, idx) => {
      const cost = p.costPrice || Math.round(p.price * 0.7);
      const profit = p.price - cost;
      return `${idx + 1},"${p.partCode}","${p.name}","${p.carBrand}","${p.carModel}","${p.category}","${p.barcode || ''}",${cost},${p.price},${profit},${p.stock}`;
    }).join('\n');

    const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tito_store_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      
      {/* Excel Ribbon & Window Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Title Bar - Excel Style */}
        <div className="bg-neutral-950 px-5 py-3.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  TITO_INVENTORY_MASTER.xlsx
                </span>
                <span className="text-xs text-neutral-400">• إدارة المخازن والجرد الفعلي</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                شيت إكسيل تفاعلي لقطع غيار شيفروليه، أوبل، MG، وإسبيرانزا - تعديل الأسعار، رصد النواقص، وحساب الأرباح
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold border border-neutral-800 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>تصدير CSV (Excel)</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold border border-neutral-800 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-400" />
              <span>طباعة الجرد</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ إضافة سطر صنف جديد</span>
            </button>
          </div>
        </div>

        {/* Excel Formula Bar */}
        <div className="bg-neutral-950/90 px-4 py-2.5 border-b border-neutral-800 flex items-center gap-3 text-xs">
          <div className="font-mono font-black text-emerald-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800 text-[11px]">
            {activeCell.col}{activeCell.row}
          </div>
          <div className="font-mono text-neutral-500 font-bold select-none text-xs">
            fx
          </div>
          <div className="flex-1 font-mono text-neutral-300 bg-neutral-900/60 px-3 py-1 rounded border border-neutral-800/80 truncate text-xs">
            {activeCell.value || '=PROFIT(RetailPrice - CostPrice)'}
          </div>
          <span className="text-[10px] text-neutral-500 hidden sm:inline">
            جاهز للحساب التلقائي • الربح المتوقع: <strong className="text-emerald-400 font-mono">+{Math.round((expectedProfit / totalCostValuation) * 100)}%</strong>
          </span>
        </div>

        {/* Quick Filter & Search Bar */}
        <div className="p-4 bg-neutral-900/70 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بكود الصنف، الاسم، أو الموديل..."
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
            </div>

            {/* Brand Dropdown */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all">جميع الماركات (4 ماركات معتمدة)</option>
              <option value="Chevrolet">شيفروليه (Chevrolet)</option>
              <option value="Opel">أوبل (Opel)</option>
              <option value="MG">إم جي (MG)</option>
              <option value="Esperanza">إسبيرانزا (Esperanza)</option>
            </select>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all">جميع التصنيفات</option>
              <option value="brakes">المكابح والفرامل</option>
              <option value="engine">المحرك والتيربو</option>
              <option value="suspension">التعليق والمساعدات</option>
              <option value="cooling">التبريد والرديتر</option>
              <option value="electrical">الكهرباء والضفائر</option>
            </select>
          </div>

          <div className="text-xs text-neutral-400">
            مطابق للفلتر: <strong className="text-white font-mono">{filteredProducts.length}</strong> من إجمالي{' '}
            <strong className="text-white font-mono">{products.length}</strong> صنف
          </div>
        </div>

        {/* Excel Spreadsheet Table */}
        <div className="overflow-x-auto max-h-[620px] overflow-y-auto">
          <table className="w-full text-right text-xs border-collapse">
            <thead className="bg-neutral-950 text-neutral-300 font-bold border-b border-neutral-800 sticky top-0 z-10 select-none shadow-sm">
              <tr>
                <th className="py-2.5 px-3 border-l border-neutral-800 text-center w-12 text-neutral-500 font-mono">
                  #
                </th>
                <th className="py-2.5 px-3 border-l border-neutral-800 w-14 text-center">صورة</th>
                <th className="py-2.5 px-3 border-l border-neutral-800 font-mono text-neutral-200">
                  كود الصنف (Code)
                </th>
                <th className="py-2.5 px-3 border-l border-neutral-800 min-w-[220px]">
                  اسم القطعة ومواصفاتها
                </th>
                <th className="py-2.5 px-3 border-l border-neutral-800">ماركة السيارة</th>
                <th className="py-2.5 px-3 border-l border-neutral-800">الموديل المتوافق</th>
                <th className="py-2.5 px-3 border-l border-neutral-800">التصنيف</th>
                <th className="py-2.5 px-3 border-l border-neutral-800 font-mono text-neutral-400">
                  باركود الوكالة OEM
                </th>
                <th className="py-2.5 px-3 border-l border-neutral-800 text-neutral-300 font-mono text-left">
                  سعر التكلفة (ج.م)
                </th>
                <th className="py-2.5 px-3 border-l border-neutral-800 text-white font-mono text-left">
                  سعر البيع (ج.م)
                </th>
                <th className="py-2.5 px-3 border-l border-neutral-800 text-emerald-400 font-mono text-left">
                  الربح / الهامش
                </th>
                <th className="py-2.5 px-3 border-l border-neutral-800 text-center">الكمية بالمخزن</th>
                <th className="py-2.5 px-3 border-l border-neutral-800 text-center">الحالة</th>
                <th className="py-2.5 px-3 text-center">إجراء سريع</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-900 font-sans">
              {filteredProducts.map((p, idx) => {
                const cost = p.costPrice || Math.round(p.price * 0.7);
                const profit = p.price - cost;
                const profitMarginPercent = Math.round((profit / cost) * 100);
                const isLow = p.stock <= (p.reorderLevel || 3);
                const isOut = p.stock === 0;

                return (
                  <tr 
                    key={p.id}
                    onClick={() => setActiveCell({ row: idx + 1, col: 'C', value: `${p.partCode} - ${p.name} | سعر البيع: ${p.price} ج.م | التكلفة: ${cost} ج.م` })}
                    className="hover:bg-neutral-800/40 transition-colors group cursor-pointer"
                  >
                    {/* Row Index */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 text-center text-neutral-500 font-mono bg-neutral-950/40 group-hover:bg-neutral-950">
                      {idx + 1}
                    </td>

                    {/* Real Product Image Thumbnail */}
                    <td className="py-1.5 px-2 border-l border-neutral-900 text-center">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center mx-auto">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/aistudio/WhatsApp_Image_2026-10-30_at_8.05.38_AM__25__acf26c25.jpeg';
                          }}
                        />
                      </div>
                    </td>

                    {/* Part Code */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 font-mono font-bold text-red-400 whitespace-nowrap">
                      {p.partCode}
                    </td>

                    {/* Product Name */}
                    <td className="py-2.5 px-3 border-l border-neutral-900">
                      <div className="font-bold text-white group-hover:text-red-300 transition-colors">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate max-w-xs font-normal">
                        {p.brand} {p.isOriginal ? '• أصلي وكالة' : '• OEM معتمد'}
                      </div>
                    </td>

                    {/* Car Brand */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 whitespace-nowrap font-medium text-neutral-300">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.carBrand === 'Chevrolet'
                          ? 'bg-neutral-800 text-white border border-neutral-700'
                          : p.carBrand === 'Opel'
                          ? 'bg-red-950/60 text-red-400 border border-red-900'
                          : p.carBrand === 'MG'
                          ? 'bg-blue-950/60 text-blue-300 border border-blue-900'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}>
                        {p.carBrand}
                      </span>
                    </td>

                    {/* Car Model */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 text-neutral-300 whitespace-nowrap">
                      {p.carModel}
                    </td>

                    {/* Category */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 text-neutral-400 whitespace-nowrap">
                      {p.category}
                    </td>

                    {/* Barcode OEM */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 font-mono text-[11px] text-neutral-400 whitespace-nowrap">
                      {p.barcode || '—'}
                    </td>

                    {/* Cost Price */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 font-mono text-neutral-300 text-left whitespace-nowrap">
                      {cost.toLocaleString()} ج.م
                    </td>

                    {/* Retail Price */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 font-mono font-black text-white text-left whitespace-nowrap">
                      {p.price.toLocaleString()} ج.م
                    </td>

                    {/* Profit */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 font-mono font-bold text-emerald-400 text-left whitespace-nowrap">
                      +{profit.toLocaleString()} <span className="text-[10px] text-emerald-500 font-normal">({profitMarginPercent}%)</span>
                    </td>

                    {/* Stock Qty with Quick +/- */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickStockChange(p, -1);
                          }}
                          className="w-5 h-5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        
                        <span className={`font-mono font-black min-w-7 text-center ${
                          isOut ? 'text-red-500' : isLow ? 'text-red-400 font-bold' : 'text-white'
                        }`}>
                          {p.stock}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickStockChange(p, 1);
                          }}
                          className="w-5 h-5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Stock Status */}
                    <td className="py-2.5 px-3 border-l border-neutral-900 text-center whitespace-nowrap">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-800">
                          نفذت الكمية
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-white border border-neutral-700">
                          نواقص ({p.stock} متبقي)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                          متوفر
                        </span>
                      )}
                    </td>

                    {/* Quick Edit Action */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEdit(p);
                          }}
                          title="تعديل السعر والكمية"
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`هل أنت متأكد من حذف الصنف ${p.name} من شيت المخزن؟`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          title="حذف من الشيت"
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Excel Sheet Tabs */}
        <div className="bg-neutral-950 px-4 py-2 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveSheetTab('all')}
              className={`px-3 py-1.5 rounded-t-lg font-bold transition-all text-xs border-t-2 ${
                activeSheetTab === 'all'
                  ? 'bg-neutral-900 text-white border-emerald-500 shadow-sm'
                  : 'text-neutral-400 hover:text-white border-transparent'
              }`}
            >
              ورقة 1: كامل المخزون ({products.length})
            </button>

            <button
              onClick={() => setActiveSheetTab('low_stock')}
              className={`px-3 py-1.5 rounded-t-lg font-bold transition-all text-xs border-t-2 ${
                activeSheetTab === 'low_stock'
                  ? 'bg-neutral-900 text-white border-red-500 shadow-sm'
                  : 'text-neutral-400 hover:text-white border-transparent'
              }`}
            >
              ورقة 2: النواقص وحد إعادة الطلب
            </button>

            <button
              onClick={() => setActiveSheetTab('chevrolet')}
              className={`px-3 py-1.5 rounded-t-lg font-bold transition-all text-xs border-t-2 ${
                activeSheetTab === 'chevrolet'
                  ? 'bg-neutral-900 text-white border-neutral-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white border-transparent'
              }`}
            >
              شيفروليه (Chevrolet)
            </button>

            <button
              onClick={() => setActiveSheetTab('opel')}
              className={`px-3 py-1.5 rounded-t-lg font-bold transition-all text-xs border-t-2 ${
                activeSheetTab === 'opel'
                  ? 'bg-neutral-900 text-white border-red-500 shadow-sm'
                  : 'text-neutral-400 hover:text-white border-transparent'
              }`}
            >
              أوبل (Opel)
            </button>

            <button
              onClick={() => setActiveSheetTab('mg')}
              className={`px-3 py-1.5 rounded-t-lg font-bold transition-all text-xs border-t-2 ${
                activeSheetTab === 'mg'
                  ? 'bg-neutral-900 text-white border-blue-500 shadow-sm'
                  : 'text-neutral-400 hover:text-white border-transparent'
              }`}
            >
              إم جي (MG)
            </button>

            <button
              onClick={() => setActiveSheetTab('esperanza')}
              className={`px-3 py-1.5 rounded-t-lg font-bold transition-all text-xs border-t-2 ${
                activeSheetTab === 'esperanza'
                  ? 'bg-neutral-900 text-white border-neutral-400 shadow-sm'
                  : 'text-neutral-400 hover:text-white border-transparent'
              }`}
            >
              إسبيرانزا (Esperanza)
            </button>
          </div>

          <div className="text-[11px] text-neutral-400 font-mono">
            SUM(Qty): <strong className="text-white">{totalUnits}</strong> | AVG(Price):{' '}
            <strong className="text-white">
              {Math.round(totalRetailValuation / Math.max(1, totalUnits))} ج.م
            </strong>
          </div>
        </div>

        {/* Excel Status Bar & KPI Summary */}
        <div className="bg-neutral-950 px-5 py-3 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] text-neutral-500 block">إجمالي الأصناف بالمخزن</span>
            <strong className="text-sm font-black text-white font-mono">{products.length} صنف</strong>
          </div>

          <div>
            <span className="text-[10px] text-neutral-500 block">إجمالي القطع المتوفرة</span>
            <strong className="text-sm font-black text-white font-mono">{totalUnits} قطعة</strong>
          </div>

          <div>
            <span className="text-[10px] text-neutral-500 block">قيمة المخزون بسعر التكلفة</span>
            <strong className="text-sm font-black text-neutral-300 font-mono">
              {totalCostValuation.toLocaleString()} ج.م
            </strong>
          </div>

          <div>
            <span className="text-[10px] text-neutral-500 block">الأرباح المتوقعة عند البيع</span>
            <strong className="text-sm font-black text-emerald-400 font-mono">
              +{expectedProfit.toLocaleString()} ج.م
            </strong>
          </div>
        </div>

      </div>

      {/* ================= MODAL: EDIT ITEM (Excel Cell Quick Edit) ================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-right text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <h4 className="font-black text-sm">تعديل تسعير وكمية الصنف</h4>
                <p className="text-xs text-neutral-400 font-mono">{editingItem.partCode} - {editingItem.name}</p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  سعر البيع للجمهور (ج.م)
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  سعر التكلفة والشراء (ج.م)
                </label>
                <input
                  type="number"
                  value={editCost}
                  onChange={(e) => setEditCost(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  الكمية الفعلية بالمخزن
                </label>
                <input
                  type="number"
                  value={editStock}
                  onChange={(e) => setEditStock(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs flex justify-between font-mono">
                <span className="text-neutral-400">هامش الربح المحسوب:</span>
                <strong className="text-emerald-400">
                  +{(editPrice - editCost).toLocaleString()} ج.م ({Math.round(((editPrice - editCost) / Math.max(1, editCost)) * 100)}%)
                </strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-300"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-black text-white shadow-md shadow-red-600/30"
              >
                حفظ التعديلات في الشيت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD NEW ROW TO SHEET ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-right text-white space-y-4 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <h4 className="font-black text-base">إضافة سطر صنف جديد لشيت المخازن</h4>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    كود الصنف (Part Code) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPartCode}
                    onChange={(e) => setNewPartCode(e.target.value)}
                    placeholder="مثال: T2-PH-099"
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    ماركة السيارة المعتمدة *
                  </label>
                  <select
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Chevrolet">شيفروليه (Chevrolet)</option>
                    <option value="Opel">أوبل (Opel)</option>
                    <option value="MG">إم جي (MG)</option>
                    <option value="Esperanza">إسبيرانزا (Esperanza)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  اسم القطعة ومواصفاتها *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: طنبورة فرامل أمامية نيو أوبترا GM"
                  className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    الموديل المتوافق
                  </label>
                  <input
                    type="text"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    placeholder="نيو أوبترا / أسترا J"
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    التصنيف
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Brakes">فرامل ومكابح</option>
                    <option value="Engine">محرك وتبريد</option>
                    <option value="Suspension">عفشة ومساعدين</option>
                    <option value="Cooling">رديتر ومياه</option>
                    <option value="Electrical">كهرباء وحساسات</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    سعر الشراء (التكلفة)
                  </label>
                  <input
                    type="number"
                    value={newCostPrice}
                    onChange={(e) => setNewCostPrice(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    سعر البيع للجمهور
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    الكمية الأولية
                  </label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  باركود الوكالة OEM (اختياري للفحص السريع)
                </label>
                <input
                  type="text"
                  value={newBarcode}
                  onChange={(e) => setNewBarcode(e.target.value)}
                  placeholder="مثال: 238760590012"
                  className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-xs font-bold text-neutral-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-black text-white shadow-lg shadow-red-600/30"
                >
                  إدراج الصنف في الشيت والكاشير
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
