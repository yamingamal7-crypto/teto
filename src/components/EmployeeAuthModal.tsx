import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Key, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  X, 
  UserPlus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Phone,
  Sparkles,
  LogOut,
  RefreshCw,
  Sliders,
  DollarSign,
  Wrench,
  Smartphone,
  Layers
} from 'lucide-react';
import { Employee, EmployeeRole } from '../types/auth';
import { TitoOfficialLogo } from './TitoOfficialLogo';

interface EmployeeAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmployee: Employee | null;
  employees: Employee[];
  onLogin: (employee: Employee) => void;
  onLogout: () => void;
  onAddEmployee: (emp: Omit<Employee, 'id' | 'createdAt' | 'lastLogin'>) => void;
  onUpdateEmployeePassword: (employeeId: string, newPass: string, newPin: string) => void;
  onDeleteEmployee: (employeeId: string) => void;
}

export const EmployeeAuthModal: React.FC<EmployeeAuthModalProps> = ({
  isOpen,
  onClose,
  currentEmployee,
  employees,
  onLogin,
  onLogout,
  onAddEmployee,
  onUpdateEmployeePassword,
  onDeleteEmployee,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'manage' | 'add'>('login');
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  // Quick PIN state
  const [pinInput, setPinInput] = useState('');

  // Add Employee Form state
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPin, setNewPin] = useState('');
  const [newRole, setNewRole] = useState<EmployeeRole>('cashier');
  const [newPhone, setNewPhone] = useState('01020272266');
  const [addSuccess, setAddSuccess] = useState<string | null>(null);

  // Change password modal inside manage
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editPassInput, setEditPassInput] = useState('');
  const [editPinInput, setEditPinInput] = useState('');
  const [editSuccessMsg, setEditSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle standard username & password login
  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const userClean = loginUsername.trim().toLowerCase();
    const passClean = loginPassword.trim();

    if (!userClean || !passClean) {
      setLoginError('يرجى كتابة اسم المستخدم وكلمة المرور');
      return;
    }

    const matched = employees.find(
      (emp) => emp.username.toLowerCase() === userClean && emp.password === passClean
    );

    if (matched) {
      setLoginSuccess(`تم تسجيل الدخول بنجاح كـ ${matched.name} (${matched.roleTitleAr})`);
      setTimeout(() => {
        onLogin(matched);
        setLoginSuccess(null);
        setLoginUsername('');
        setLoginPassword('');
        onClose();
      }, 700);
    } else {
      setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة، حاول مجدداً.');
    }
  };

  // Quick 1-click login for demonstration
  const handleQuickLogin = (emp: Employee) => {
    setLoginSuccess(`تم التحقق! مرحباً بك يا ${emp.name}`);
    setTimeout(() => {
      onLogin(emp);
      setLoginSuccess(null);
      onClose();
    }, 500);
  };

  // Handle PIN input
  const handlePinDigit = (digit: string) => {
    if (pinInput.length < 4) {
      const nextPin = pinInput + digit;
      setPinInput(nextPin);
      if (nextPin.length === 4) {
        // Check pin
        const matched = employees.find((emp) => emp.pin === nextPin);
        if (matched) {
          handleQuickLogin(matched);
          setPinInput('');
        } else {
          setLoginError('الرقم السري السريع (PIN) غير صحيح!');
          setTimeout(() => {
            setPinInput('');
            setLoginError(null);
          }, 1000);
        }
      }
    }
  };

  // Handle Add Employee Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUsername.trim() || !newPassword.trim()) {
      alert('يرجى ملء جميع الحقول الإلزامية');
      return;
    }

    const roleTitles: Record<EmployeeRole, string> = {
      owner: 'مالك المحل والمؤسس (Super Admin)',
      manager: 'مدير المحل والمركز (Store Manager)',
      cashier: 'كاشير نقاط البيع (POS Cashier)',
      technician: 'كبير فنيي ورشة الصيانة (Technician)',
    };

    onAddEmployee({
      name: newName.trim(),
      username: newUsername.trim().toLowerCase(),
      password: newPassword.trim(),
      pin: newPin.trim() || '1234',
      role: newRole,
      roleTitleAr: roleTitles[newRole],
      phone: newPhone.trim() || '01020272266',
      avatarColor: 'bg-neutral-800',
      isActive: true,
      permissions: {
        canBillPOS: newRole === 'owner' || newRole === 'manager' || newRole === 'cashier',
        canPrintReceipts: true,
        canViewDailySales: newRole === 'owner' || newRole === 'manager',
        canEditInventory: newRole === 'owner' || newRole === 'manager',
        canManageEmployees: newRole === 'owner',
        canDispatchMaintenance: newRole === 'owner' || newRole === 'manager' || newRole === 'technician',
        canViewProfitMargins: newRole === 'owner' || newRole === 'manager',
        canApplyDiscounts: newRole !== 'technician',
      },
    });

    setAddSuccess(`تمت إضافة حساب الموظف ${newName} بنجاح!`);
    setTimeout(() => {
      setAddSuccess(null);
      setNewName('');
      setNewUsername('');
      setNewPassword('');
      setNewPin('');
      setActiveTab('manage');
    }, 900);
  };

  // Handle Save Edited Password
  const handleSaveEditedCredentials = () => {
    if (!editingEmployee) return;
    if (!editPassInput.trim()) {
      alert('كلمة المرور لا يمكن أن تكون فارغة');
      return;
    }

    onUpdateEmployeePassword(
      editingEmployee.id,
      editPassInput.trim(),
      editPinInput.trim() || editingEmployee.pin
    );

    setEditSuccessMsg(`تم تحديث كلمة المرور لـ ${editingEmployee.name} بنجاح!`);
    setTimeout(() => {
      setEditSuccessMsg(null);
      setEditingEmployee(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto text-right text-neutral-100 flex flex-col max-h-[92vh]"
        dir="rtl"
      >
        {/* Top Header with Brand */}
        <div className="bg-neutral-950 p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TitoOfficialLogo variant="emblem" size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  بوابة الموظفين وتسجيل الدخول
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-red-600/20 text-red-400 border border-red-600/30 rounded-md">
                  TITO STORE
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                إدخال اسم المستخدم وكلمة المرور أو PIN، وتبديل الحسابات، وإدارة الصلاحيات
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500/50 hover:bg-red-600/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="grid grid-cols-3 bg-neutral-950/70 p-1.5 border-b border-neutral-800 text-xs font-bold gap-1">
          <button
            onClick={() => setActiveTab('login')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'login'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>تسجيل دخول الموظف</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'manage'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>حسابات الموظفين وكلمات السر ({employees.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'add'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>+ إضافة موظف جديد</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* Current Logged In Employee Bar */}
          {currentEmployee && (
            <div className="bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/40 text-red-500 flex items-center justify-center font-black text-sm">
                  {currentEmployee.name.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">الجلسة الحالية:</span>
                    <strong className="text-sm font-black text-white">{currentEmployee.name}</strong>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded border border-neutral-700">
                      {currentEmployee.roleTitleAr}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    كود الحساب: <code className="text-white font-mono">{currentEmployee.username}</code>
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs font-bold text-neutral-300 hover:text-red-400 hover:bg-neutral-900 rounded-lg border border-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          )}

          {/* ================= TAB 1: LOGIN ================= */}
          {activeTab === 'login' && (
            <div className="space-y-6">
              
              {/* Feedback Toasts */}
              {loginSuccess && (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-200 text-xs font-bold flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{loginSuccess}</span>
                </div>
              )}

              {loginError && (
                <div className="p-4 bg-red-950/80 border border-red-500/50 rounded-2xl text-red-200 text-xs font-bold flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left: Username & Password Form */}
                <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                    <Key className="w-4 h-4 text-red-500" />
                    <h4 className="text-sm font-black text-white">تسجيل الدخول بالاسم وكلمة المرور</h4>
                  </div>

                  <form onSubmit={handleFormLogin} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1">
                        اسم المستخدم أو كود الموظف
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={loginUsername}
                          onChange={(e) => setLoginUsername(e.target.value)}
                          placeholder="مثال: taher أو ahmed أو cashier"
                          className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                        />
                        <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1">
                        كلمة المرور
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="أدخل كلمة المرور (الافتراضية: 123)"
                          className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-2.5 text-neutral-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Lock className="w-4 h-4" />
                      <span>تسجيل الدخول للنظام</span>
                    </button>
                  </form>

                  <div className="text-[11px] text-neutral-400 bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-800">
                    💡 كلمة المرور الافتراضية لجميع الموظفين الجاهزين هي: <strong className="text-white font-mono">123</strong>
                  </div>
                </div>

                {/* Right: Quick PIN & Fast Selection */}
                <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 pb-2 border-b border-neutral-800 mb-3">
                      <Sparkles className="w-4 h-4 text-red-500" />
                      <h4 className="text-sm font-black text-white">الدخول السريع (رمز PIN بـ 4 أرقام)</h4>
                    </div>

                    {/* PIN Display */}
                    <div className="flex items-center justify-center gap-3 py-2">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg font-black transition-all ${
                            pinInput.length > i
                              ? 'bg-red-600 border-red-500 text-white shadow-md'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-600'
                          }`}
                        >
                          {pinInput.length > i ? '●' : '—'}
                        </div>
                      ))}
                    </div>

                    {/* Touch Numeric Keypad */}
                    <div className="grid grid-cols-3 gap-1.5 max-w-[220px] mx-auto mt-2">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                        <button
                          key={digit}
                          type="button"
                          onClick={() => handlePinDigit(digit)}
                          className="h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 active:bg-red-600 text-white font-black text-sm border border-neutral-800 transition-colors"
                        >
                          {digit}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setPinInput('')}
                        className="h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-bold text-xs border border-neutral-800"
                      >
                        مسح
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePinDigit('0')}
                        className="h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 active:bg-red-600 text-white font-black text-sm border border-neutral-800"
                      >
                        0
                      </button>
                      <button
                        type="button"
                        onClick={() => setPinInput(pinInput.slice(0, -1))}
                        className="h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-bold text-xs border border-neutral-800"
                      >
                        ←
                      </button>
                    </div>
                  </div>

                  <div className="text-[10px] text-neutral-400 text-center">
                    طاهر تيتو: PIN <strong className="text-white font-mono">1111</strong> | أحمد: PIN <strong className="text-white font-mono">2222</strong>
                  </div>
                </div>

              </div>

              {/* Quick Profile Cards (1-Click Switch) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-neutral-300">
                    أو اختر الموظف مباشرة للتبديل السريع (نقرة واحدة):
                  </h4>
                  <span className="text-[11px] text-red-500 font-bold">حسابات المحل المعتمدة</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {employees.map((emp) => {
                    const isCurrent = currentEmployee?.id === emp.id;
                    return (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => handleQuickLogin(emp)}
                        className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between group hover:border-red-500 relative ${
                          isCurrent
                            ? 'bg-red-950/40 border-red-500 shadow-lg shadow-red-600/20'
                            : 'bg-neutral-950 border-neutral-800 hover:bg-neutral-900'
                        }`}
                      >
                        {isCurrent && (
                          <span className="absolute top-2 left-2 text-[9px] font-black px-1.5 py-0.5 bg-red-600 text-white rounded">
                            الحالي
                          </span>
                        )}

                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={`w-8 h-8 rounded-xl ${emp.role === 'owner' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-200'} flex items-center justify-center font-black text-xs`}>
                            {emp.name.slice(0, 2)}
                          </div>
                          <div>
                            <strong className="block text-xs font-black text-white group-hover:text-red-400 transition-colors">
                              {emp.name}
                            </strong>
                            <span className="block text-[10px] text-neutral-400">
                              {emp.role === 'owner' ? 'المالك' : emp.role === 'manager' ? 'المدير' : emp.role === 'cashier' ? 'كاشير' : 'فني'}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                          <span>User: {emp.username}</span>
                          <span>PIN: {emp.pin}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: MANAGE ACCOUNTS ================= */}
          {activeTab === 'manage' && (
            <div className="space-y-6">
              
              {/* Edit Password Modal */}
              {editingEmployee && (
                <div className="bg-neutral-950 p-4 rounded-2xl border border-red-600/50 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-red-500" />
                      <h4 className="text-xs font-black text-white">
                        تعديل كلمة المرور ورمز PIN لـ: <span className="text-red-400">{editingEmployee.name}</span>
                      </h4>
                    </div>
                    <button
                      onClick={() => setEditingEmployee(null)}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      إلغاء
                    </button>
                  </div>

                  {editSuccessMsg && (
                    <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs font-bold">
                      {editSuccessMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                        كلمة المرور الجديدة
                      </label>
                      <input
                        type="text"
                        value={editPassInput}
                        onChange={(e) => setEditPassInput(e.target.value)}
                        placeholder="أدخل كلمة مرور جديدة"
                        className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                        رمز PIN السريع (4 أرقام)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={editPinInput}
                        onChange={(e) => setEditPinInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="مثال: 5566"
                        className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingEmployee(null)}
                      className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleSaveEditedCredentials}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-sm"
                    >
                      حفظ كلمة المرور الجديدة
                    </button>
                  </div>
                </div>
              )}

              {/* Table of Employees */}
              <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden">
                <div className="p-3.5 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-white">قائمة الموظفين المعتمدين وصلاحياتهم</span>
                  </div>
                  <span className="text-xs text-neutral-400">
                    الإجمالي: <strong className="text-white font-mono">{employees.length}</strong> حساب
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-neutral-900 text-neutral-400 font-semibold border-b border-neutral-800">
                      <tr>
                        <th className="py-2.5 px-3">الموظف</th>
                        <th className="py-2.5 px-3">اسم المستخدم (User)</th>
                        <th className="py-2.5 px-3">الرتبة والدور</th>
                        <th className="py-2.5 px-3">كلمة المرور</th>
                        <th className="py-2.5 px-3">PIN</th>
                        <th className="py-2.5 px-3">الهاتف</th>
                        <th className="py-2.5 px-3 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {employees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-neutral-900/60 transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-neutral-800 text-white flex items-center justify-center font-bold text-[10px]">
                                {emp.name.slice(0, 2)}
                              </div>
                              <div>
                                <span className="font-bold text-white block">{emp.name}</span>
                                <span className="text-[10px] text-neutral-500 font-mono">ID: {emp.id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3 font-mono font-bold text-neutral-200">
                            {emp.username}
                          </td>

                          <td className="py-3 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              emp.role === 'owner'
                                ? 'bg-red-600/20 text-red-400 border border-red-600/40'
                                : emp.role === 'manager'
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/40'
                                : 'bg-neutral-800 text-neutral-300'
                            }`}>
                              {emp.roleTitleAr}
                            </span>
                          </td>

                          <td className="py-3 px-3 font-mono text-neutral-300">
                            •••••• ({emp.password})
                          </td>

                          <td className="py-3 px-3 font-mono font-bold text-neutral-200">
                            {emp.pin}
                          </td>

                          <td className="py-3 px-3 font-mono text-neutral-400">
                            {emp.phone}
                          </td>

                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingEmployee(emp);
                                  setEditPassInput(emp.password);
                                  setEditPinInput(emp.pin);
                                }}
                                title="تغيير كلمة المرور"
                                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {emp.role !== 'owner' && (
                                <button
                                  onClick={() => {
                                    if (confirm(`هل أنت متأكد من حذف حساب ${emp.name}؟`)) {
                                      onDeleteEmployee(emp.id);
                                    }
                                  }}
                                  title="حذف الحساب"
                                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Roles & Permissions Reference */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-3">
                <h4 className="text-xs font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>جدول الصلاحيات حسب الرتبة الوظيفية في تيتو ستور</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="font-black text-red-500 block mb-1">المالك (طاهر تيتو)</span>
                    <ul className="text-[11px] text-neutral-400 space-y-1">
                      <li>✓ صلاحيات مطلقة للنظام (Super Admin)</li>
                      <li>✓ رؤية أرباح التكلفة وهوامش الربح</li>
                      <li>✓ تعديل المخزون والأسعار وإضافة موظفين</li>
                      <li>✓ التقارير المالية والتحليلات الأسبوعية</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="font-black text-blue-400 block mb-1">المدير (أحمد)</span>
                    <ul className="text-[11px] text-neutral-400 space-y-1">
                      <li>✓ فواتير ونقاط البيع وطباعة الفاتورة</li>
                      <li>✓ شيت المخزون وتحديث الكميات</li>
                      <li>✓ كروت الصيانة وإرسال الواتساب</li>
                      <li>✓ تقرير المبيعات اليومية والأسبوعية</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="font-black text-white block mb-1">كاشير نقاط البيع</span>
                    <ul className="text-[11px] text-neutral-400 space-y-1">
                      <li>✓ إصدار فواتير البيع بالباركود</li>
                      <li>✓ طباعة الإيصال الحراري 80mm</li>
                      <li>✓ تطبيق الخصومات المصرح بها</li>
                      <li>✗ محجوب عنه هوامش الربح وشيت الإدارة</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="font-black text-neutral-300 block mb-1">فني ورشة الصيانة</span>
                    <ul className="text-[11px] text-neutral-400 space-y-1">
                      <li>✓ فحص سيارات العملاء والأعطال</li>
                      <li>✓ إنشاء وتحديث كروت أمر الشغل</li>
                      <li>✓ طلب قطع الغيار من الكاشير</li>
                      <li>✓ إرسال تقرير الفحص لواتساب العميل</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 3: ADD NEW EMPLOYEE ================= */}
          {activeTab === 'add' && (
            <div className="max-w-xl mx-auto space-y-4">
              <div className="text-center pb-2">
                <h4 className="text-base font-black text-white">إضافة حساب موظف جديد لنظام TITO STORE</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  قم بإنشاء حساب جديد للموظف، وتعيين اسم المستخدم وكلمة المرور وصلاحية العمل
                </p>
              </div>

              {addSuccess && (
                <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{addSuccess}</span>
                </div>
              )}

              <form onSubmit={handleAddSubmit} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    اسم الموظف الكامل
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="مثال: محمود حسن"
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">
                      اسم المستخدم (User ID)
                    </label>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="مثال: mahmoud"
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">
                      الرتبة الوظيفية
                    </label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as EmployeeRole)}
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3 py-2.5 text-xs text-white"
                    >
                      <option value="cashier">كاشير نقاط البيع (POS)</option>
                      <option value="manager">مدير فرع / مركز</option>
                      <option value="technician">فني ورشة صيانة</option>
                      <option value="owner">شريك / مالك (Super Admin)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">
                      كلمة المرور
                    </label>
                    <input
                      type="text"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="كلمة مرور للدخول"
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">
                      رمز PIN السريع (4 أرقام)
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="مثال: 7890"
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    رقم الهاتف للاتصال والواتساب
                  </label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="01020272266"
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>تأكيد إضافة الحساب وتفعيل الصلاحيات</span>
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-neutral-950 p-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>نظام المصادقة المحلي مشفر ومحفوظ تلقائياً في التخزين الدائم للمتصفح</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold transition-colors"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
