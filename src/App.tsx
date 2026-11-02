import React, { useState, useMemo, useEffect } from 'react';
import { 
  Wrench, 
  ShoppingBag, 
  Search, 
  Filter, 
  Car, 
  Database, 
  Smartphone, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ExternalLink, 
  ChevronDown, 
  FileSpreadsheet, 
  Lock, 
  Unlock, 
  Key, 
  User, 
  LogOut, 
  RefreshCw 
} from 'lucide-react';
import { Product } from './types/product';
import { MOCK_AUTO_PARTS } from './data/mockProducts';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { AppSheetSimulator } from './components/AppSheetSimulator';
import { Hero } from './components/Hero';
import { GarageSelector } from './components/GarageSelector';
import { SymptomDiagnostic } from './components/SymptomDiagnostic';
import { CarMaintenanceServices } from './components/CarMaintenanceServices';
import { ExcelInventorySheet } from './components/ExcelInventorySheet';
import { TitoOfficialLogo } from './components/TitoOfficialLogo';
import { EmployeeAuthModal } from './components/EmployeeAuthModal';
import { SelectedVehicle } from './types/parts';
import { Employee } from './types/auth';
import { 
  getStoredEmployees, 
  saveStoredEmployees, 
  getStoredSession, 
  saveStoredSession 
} from './services/authService';

export default function App() {
  const [products, setProducts] = useState<Product[]>(MOCK_AUTO_PARTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCarBrand, setSelectedCarBrand] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<SelectedVehicle | null>({
    make: 'شيفروليه (Chevrolet)',
    model: 'نيو أوبترا (New Optra)',
    year: 2020,
  });
  const [filterOnlyCompatible, setFilterOnlyCompatible] = useState(false);
  
  // Navigation tabs: ERP & Cashier, Warehouse (Excel Sheet), Maintenance Center, Catalog
  const [activeMainTab, setActiveMainTab] = useState<'erp' | 'inventory' | 'maintenance' | 'catalog'>('erp');
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);

  // Authentication & Employee Accounts State
  const [employees, setEmployees] = useState<Employee[]>(getStoredEmployees());
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(() => {
    const session = getStoredSession();
    return session.employee;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTerminalLocked, setIsTerminalLocked] = useState(false);
  const [lockPinInput, setLockPinInput] = useState('');
  const [lockError, setLockError] = useState<string | null>(null);

  // Sync session and employees to localStorage
  useEffect(() => {
    saveStoredEmployees(employees);
  }, [employees]);

  useEffect(() => {
    saveStoredSession({
      employee: currentEmployee,
      isAuthenticated: !!currentEmployee,
      isTerminalLocked,
      loginTimestamp: new Date().toISOString(),
    });
  }, [currentEmployee, isTerminalLocked]);

  // Auth Handlers
  const handleLogin = (emp: Employee) => {
    setCurrentEmployee(emp);
    setIsTerminalLocked(false);
  };

  const handleLogout = () => {
    setCurrentEmployee(null);
  };

  const handleAddEmployee = (empData: Omit<Employee, 'id' | 'createdAt' | 'lastLogin'>) => {
    const newEmp: Employee = {
      ...empData,
      id: `emp-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'لم يسجل دخول بعد',
    };
    setEmployees((prev) => [...prev, newEmp]);
  };

  const handleUpdateEmployeePassword = (employeeId: string, newPass: string, newPin: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, password: newPass, pin: newPin } : emp
      )
    );
    if (currentEmployee?.id === employeeId) {
      setCurrentEmployee((prev) => (prev ? { ...prev, password: newPass, pin: newPin } : null));
    }
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
    if (currentEmployee?.id === employeeId) {
      setCurrentEmployee(employees[0] || null);
    }
  };

  // Unlock terminal using PIN
  const handleUnlockPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmployee) {
      setIsTerminalLocked(false);
      return;
    }
    if (lockPinInput.trim() === currentEmployee.pin || lockPinInput.trim() === currentEmployee.password) {
      setIsTerminalLocked(false);
      setLockPinInput('');
      setLockError(null);
    } else {
      setLockError('رمز PIN أو كلمة المرور غير صحيحة!');
      setLockPinInput('');
    }
  };

  // Inventory Management Handlers
  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

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

  // Filtered Products for the public catalog view
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCode = item.partCode.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesModel = item.carModel.toLowerCase().includes(q);
        const matchesBarcode = item.barcode?.toLowerCase().includes(q) || false;
        if (!matchesName && !matchesCode && !matchesBrand && !matchesModel && !matchesBarcode) {
          return false;
        }
      }

      if (selectedCategory !== 'all') {
        if (item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      if (selectedCarBrand !== 'all') {
        if (item.carBrand.toLowerCase() !== selectedCarBrand.toLowerCase() && item.carBrand !== 'Universal') {
          return false;
        }
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedCarBrand]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(product.stock, i.quantity + quantity) }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleCheckout = () => {
    const orderNo = `ORD-${Date.now().toString().slice(-5)}`;
    setCheckoutSuccess(orderNo);
    setCart([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Identity Banner */}
      <div className="bg-red-600 text-white text-[11px] sm:text-xs py-1.5 px-4 font-black text-center flex flex-wrap items-center justify-center gap-3 sm:gap-5 shadow-md">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TITO STORE | POWERED BY ZEUS</span>
        </span>
        <span className="hidden sm:inline text-red-200">|</span>
        <span>المتخصص الحصري: CHEVROLET • OPEL • MG • ESPERANZA</span>
        <span className="hidden sm:inline text-red-200">|</span>
        <span>المالك: طاهر تيتو · المدير: أحمد</span>
        <span className="hidden sm:inline text-red-200">|</span>
        <a href="tel:01020272266" className="font-mono bg-black/30 hover:bg-black/50 px-2.5 py-0.5 rounded text-white flex items-center gap-1.5 transition-colors">
          <Phone className="w-3 h-3 text-white" />
          <span>01020272266</span>
        </a>
        <span className="hidden md:inline">📍 الحرفيين، السلام، القاهرة - شارع المرسيدس</span>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Official Brand Logo Component */}
          <div className="flex items-center gap-3 shrink-0">
            <TitoOfficialLogo variant="horizontal" size="sm" showSubtitle={false} />
          </div>

          {/* Navigation Mode Switcher Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-2xl">
            <button
              onClick={() => setActiveMainTab('erp')}
              className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                activeMainTab === 'erp'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>نظام الكاشير والـ ERP</span>
            </button>

            <button
              onClick={() => setActiveMainTab('inventory')}
              className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                activeMainTab === 'inventory'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>إدارة المخازن (شيت الإكسيل)</span>
            </button>

            <button
              onClick={() => setActiveMainTab('maintenance')}
              className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                activeMainTab === 'maintenance'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>مركز وورشة الصيانة</span>
            </button>

            <button
              onClick={() => setActiveMainTab('catalog')}
              className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
                activeMainTab === 'catalog'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>معرض وكتالوج الأصناف</span>
            </button>
          </nav>

          {/* Right Action: Employee Account Switcher + Quick Lock + Cart */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Primary Employee Account Button (Answers the user request) */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:border-red-500/50 hover:bg-neutral-850 text-xs font-bold text-white transition-all shadow-md group"
              title="واجهة تسجيل الدخول وإدارة حسابات وباسوردات الموظفين"
            >
              <div className="w-6 h-6 rounded-lg bg-red-600/20 border border-red-600/40 text-red-400 flex items-center justify-center text-[10px] font-black">
                {currentEmployee ? currentEmployee.name.slice(0, 2) : 'تيتو'}
              </div>
              <div className="hidden sm:flex flex-col text-right leading-none">
                <span className="text-[9px] text-neutral-400">حساب الموظف:</span>
                <span className="text-xs text-white font-black group-hover:text-red-400 transition-colors">
                  {currentEmployee ? currentEmployee.name : 'طاهر تيتو'} ({currentEmployee ? (currentEmployee.role === 'owner' ? 'المالك' : currentEmployee.role === 'manager' ? 'المدير' : currentEmployee.role === 'cashier' ? 'كاشير' : 'فني') : 'المالك'})
                </span>
              </div>
              <Key className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-400" />
            </button>

            {/* Quick Terminal Lock Button */}
            <button
              onClick={() => setIsTerminalLocked(true)}
              title="قفل شاشة الكاشير السريع (PIN Lock)"
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-red-500/50 transition-colors hidden sm:flex"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Vehicle Selector */}
            <button
              onClick={() => setIsGarageOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-neutral-300 hover:border-red-500/50 transition-colors"
            >
              <Car className="w-4 h-4 text-red-500 shrink-0" />
              <span className="truncate max-w-[100px]">
                {selectedVehicle ? selectedVehicle.model : 'تحديد السيارة'}
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-black text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-lg shadow-red-600/30 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">سلة البيع</span>
              {totalCartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-black text-red-600 bg-white rounded-full tabular-nums">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="md:hidden grid grid-cols-4 p-1.5 bg-neutral-900 border-b border-neutral-800 text-[10px] gap-1">
        <button
          onClick={() => setActiveMainTab('erp')}
          className={`py-2 font-black rounded-xl text-center ${
            activeMainTab === 'erp' ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400'
          }`}
        >
          الكاشير
        </button>
        <button
          onClick={() => setActiveMainTab('inventory')}
          className={`py-2 font-black rounded-xl text-center ${
            activeMainTab === 'inventory' ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400'
          }`}
        >
          المخازن
        </button>
        <button
          onClick={() => setActiveMainTab('maintenance')}
          className={`py-2 font-black rounded-xl text-center ${
            activeMainTab === 'maintenance' ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400'
          }`}
        >
          الصيانة
        </button>
        <button
          onClick={() => setActiveMainTab('catalog')}
          className={`py-2 font-black rounded-xl text-center ${
            activeMainTab === 'catalog' ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400'
          }`}
        >
          الكتالوج
        </button>
      </div>

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeMainTab === 'erp' ? (
          <AppSheetSimulator
            products={products}
            onUpdateProductsStock={handleUpdateProductsStock}
            currentEmployeeName={currentEmployee ? `${currentEmployee.name} (${currentEmployee.roleTitleAr})` : 'أحمد (مدير المحل)'}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        ) : activeMainTab === 'inventory' ? (
          <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ExcelInventorySheet
              products={products}
              onUpdateProduct={handleUpdateProduct}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
        ) : activeMainTab === 'maintenance' ? (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CarMaintenanceServices />
          </div>
        ) : (
          <>
            {/* Showroom Hero */}
            <Hero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenGarage={() => setIsGarageOpen(true)}
              onScrollToCatalog={() => {
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectSearchTag={(tag) => setSearchQuery(tag)}
            />

            {/* Catalog Section */}
            <section id="catalog-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
              
              {/* Header & Controls */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-neutral-800">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-white mb-2">
                    <Wrench className="w-4 h-4 text-red-500" />
                    <span>كتالوج قطع الغيار المصور | TITO STORE</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    قطع غيار شيفروليه وأوبل و MG وإسبيرانزا
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    أكواد الأصناف مطابقة لملفات المحل الرسمية (T2-PH-XXX) مع فحص الرصيد الفوري.
                  </p>
                </div>

                {/* Brand Filter Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
                  {[
                    { id: 'all', label: 'الكل' },
                    { id: 'Chevrolet', label: 'شيفروليه' },
                    { id: 'Opel', label: 'أوبل' },
                    { id: 'MG', label: 'MG' },
                    { id: 'Esperanza', label: 'إسبيرانزا' },
                  ].map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedCarBrand(brand.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        selectedCarBrand === brand.id
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {brand.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={() => setSelectedProductForModal(product)}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>

              {/* Empty state */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                  <p className="text-sm text-neutral-400 mb-4">
                    لم نتمكن من العثور على قطع غيار مطابقة للبحث.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedCarBrand('all');
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl"
                  >
                    إعادة ضبط الفلاتر
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Terminal Lock Screen Overlay */}
      {isTerminalLocked && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 text-right animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <TitoOfficialLogo variant="emblem" size="lg" className="mx-auto" />
            
            <div>
              <h3 className="text-xl font-black text-white">شاشة الكاشير مقفلة مؤقتاً</h3>
              <p className="text-xs text-neutral-400 mt-1">
                الموظف الحالي:{' '}
                <strong className="text-white">
                  {currentEmployee ? currentEmployee.name : 'طاهر تيتو'}
                </strong>
              </p>
            </div>

            {lockError && (
              <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs font-bold">
                {lockError}
              </div>
            )}

            <form onSubmit={handleUnlockPinSubmit} className="space-y-3">
              <input
                type="password"
                autoFocus
                value={lockPinInput}
                onChange={(e) => setLockPinInput(e.target.value)}
                placeholder="أدخل رمز PIN أو كلمة المرور..."
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl px-4 py-3 text-center text-sm text-white font-mono placeholder-neutral-500 focus:outline-none tracking-widest"
              />

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  className="py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>فتح الشاشة</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTerminalLocked(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs rounded-xl border border-neutral-700"
                >
                  تبديل الموظف
                </button>
              </div>
            </form>

            <span className="text-[11px] text-neutral-500 block">
              رمز PIN الافتراضي لطاهر: <strong className="text-white font-mono">1111</strong> | أحمد: <strong className="text-white font-mono">2222</strong>
            </span>
          </div>
        </div>
      )}

      {/* Main Employee Authentication & Account Management Modal */}
      <EmployeeAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentEmployee={currentEmployee}
        employees={employees}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onAddEmployee={handleAddEmployee}
        onUpdateEmployeePassword={handleUpdateEmployeePassword}
        onDeleteEmployee={handleDeleteEmployee}
      />

      {/* Product Details Modal */}
      {selectedProductForModal && (
        <ProductModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onAddToCart={(product, qty) => {
            handleAddToCart(product, qty);
            setSelectedProductForModal(null);
          }}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Garage Selector Modal */}
      <GarageSelector
        selectedVehicle={selectedVehicle}
        onSelectVehicle={(veh) => setSelectedVehicle(veh)}
        isOpenModal={isGarageOpen}
        onCloseModal={() => setIsGarageOpen(false)}
        filterOnlyCompatible={filterOnlyCompatible}
        onToggleFilterOnlyCompatible={setFilterOnlyCompatible}
      />

      {/* Order Confirmation Modal */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in text-right">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <h3 className="text-xl font-black text-white">
              تم إصدار الفاتورة وتأكيد الطلب!
            </h3>

            <p className="text-xs text-neutral-300">
              رقم الفاتورة: <span className="font-mono font-bold text-white bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">{checkoutSuccess}</span>
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed">
              تم تسجيل العملية في شيت المبيعات وخصم الكميات تلقائياً من رصيد المخزن. شكراً لتعاملكم مع TITO STORE!
            </p>

            <button
              onClick={() => setCheckoutSuccess(null)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-colors shadow-lg shadow-red-600/30"
            >
              العودة للمتجر
            </button>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-12 text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-neutral-800">
            
            <div className="space-y-3">
              <TitoOfficialLogo variant="badge" size="sm" />
              <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                المركز المتخصص الأول لقطع غيار وصيانة سيارات شيفروليه وأوبل وMG وإسبيرانزا. فحص باركود فوري، شيت مخازن إكسيل، وفواتير كاشير إلكترونية حرارية.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">
                الإدارة ومسؤولو المركز
              </h4>
              <ul className="text-xs text-neutral-400 space-y-2">
                <li>مالك المحل: <strong className="text-white">طاهر تيتو</strong></li>
                <li>مدير المحل والمركز: <strong className="text-white">أحمد</strong></li>
                <li>فريق العمل: كاشير مبيعات + فنيو صيانة معتمدون</li>
                <li>
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-red-400 hover:underline flex items-center gap-1 mt-1 font-bold"
                  >
                    <Key className="w-3 h-3" />
                    <span>تسجيل دخول موظف / إدارة الحسابات</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">
                السيارات المعتمدة حصرياً
              </h4>
              <ul className="text-xs text-neutral-400 space-y-1.5">
                <li>• شيفروليه: نيو أوبترا، كروز، أفيو، كابتيفا، لانوس</li>
                <li>• أوبل: أسترا G/H/J، إنسيجنيا، كورسا، فيكترا</li>
                <li>• إم جي: MG 5، ZS، HS، MG 6، RX5</li>
                <li>• إسبيرانزا: A516، تيجو، A113، A620</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">
                الاتصال والفرع الرئيسي
              </h4>
              <ul className="text-xs text-neutral-400 space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <a href="tel:01020272266" className="font-mono text-white hover:text-red-400 font-bold">
                    01020272266
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href="https://wa.me/201020272266" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
                    واتساب مباشر: 01020272266
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span>الحرفيين، السلام، القاهرة - شارع المرسيدس</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div>
              © 2026 TITO STORE | POWERED BY ZEUS. جميع الحقوق محفوظة لمالك المحل طاهر تيتو.
            </div>
            <div className="font-mono text-[11px] text-neutral-400">
              VERSION 2.4.0 (EXCEL WAREHOUSE & POS GATEWAY)
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
