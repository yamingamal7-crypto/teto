import React, { useState } from 'react';
import { Car, Check, X, Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { SelectedVehicle } from '../types/parts';
import { POPULAR_MAKES } from '../data/partsData';

interface GarageSelectorProps {
  selectedVehicle: SelectedVehicle | null;
  onSelectVehicle: (vehicle: SelectedVehicle | null) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  filterOnlyCompatible: boolean;
  onToggleFilterOnlyCompatible: (val: boolean) => void;
}

export const GarageSelector: React.FC<GarageSelectorProps> = ({
  selectedVehicle,
  onSelectVehicle,
  isOpenModal = false,
  onCloseModal,
  filterOnlyCompatible,
  onToggleFilterOnlyCompatible,
}) => {
  const [selectedMake, setSelectedMake] = useState<string>(selectedVehicle?.make || 'شيفروليه (Chevrolet)');
  const [selectedModel, setSelectedModel] = useState<string>(selectedVehicle?.model || 'نيو أوبترا (New Optra)');
  const [selectedYear, setSelectedYear] = useState<number>(selectedVehicle?.year || 2020);
  const [vinInput, setVinInput] = useState<string>('');
  const [vinError, setVinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'dropdown' | 'vin'>('dropdown');

  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];

  const currentMakeObj = POPULAR_MAKES.find((m) => m.name === selectedMake) || POPULAR_MAKES[0];

  const handleApplyDropdown = () => {
    onSelectVehicle({
      make: selectedMake,
      model: selectedModel,
      year: selectedYear,
    });
    if (onCloseModal) onCloseModal();
  };

  const handleDecodeVIN = () => {
    const cleaned = vinInput.trim().toUpperCase();
    if (cleaned.length !== 17) {
      setVinError('رقم الهيكل (VIN) يجب أن يتكون من 17 حرفاً ورقماً.');
      return;
    }

    setVinError('');
    // Specialized VIN prefixes decoder for Chevrolet, Opel, MG, Esperanza
    let decodedMake = 'شيفروليه (Chevrolet)';
    let decodedModel = 'نيو أوبترا (New Optra)';
    let decodedYear = 2020;

    if (cleaned.startsWith('KL1') || cleaned.startsWith('1G1') || cleaned.startsWith('3G1') || cleaned.startsWith('LSG')) {
      decodedMake = 'شيفروليه (Chevrolet)';
      if (cleaned.includes('OPT') || cleaned[7] === 'A') {
        decodedModel = 'نيو أوبترا (New Optra)';
      } else if (cleaned[7] === 'C') {
        decodedModel = 'كروز (Cruze)';
      } else {
        decodedModel = 'أفيو (Aveo)';
      }
    } else if (cleaned.startsWith('W0L') || cleaned.startsWith('W0V')) {
      decodedMake = 'أوبل (Opel)';
      decodedModel = cleaned.includes('AST') ? 'أسترا (Astra G/H/J)' : 'إنسيجنيا (Insignia)';
    } else if (cleaned.startsWith('LSJ') || cleaned.startsWith('SAR')) {
      decodedMake = 'إم جي (MG)';
      decodedModel = cleaned.includes('ZS') ? 'MG ZS' : 'MG 5';
    } else if (cleaned.startsWith('LJD') || cleaned.startsWith('A51')) {
      decodedMake = 'إسبيرانزا (Esperanza)';
      decodedModel = 'A516';
    }

    onSelectVehicle({
      make: decodedMake,
      model: decodedModel,
      year: decodedYear,
      vin: cleaned,
    });

    if (onCloseModal) onCloseModal();
  };

  const content = (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl text-right">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center border border-red-500/20">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">كراج سيارتي | فاحص مطابقة القطع</h3>
            <p className="text-xs text-neutral-400">حدد موديل سيارتك لحصر القطع المتوافقة 100% تلقائياً دون أخطاء</p>
          </div>
        </div>
        {isOpenModal && onCloseModal && (
          <button
            onClick={onCloseModal}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800 mb-6">
        <button
          onClick={() => setActiveTab('dropdown')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'dropdown'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          اختيار (الصانع / الموديل / السنة)
        </button>
        <button
          onClick={() => setActiveTab('vin')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'vin'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          البحث برقم الهيكل (VIN)
        </button>
      </div>

      {activeTab === 'dropdown' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Make */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                الشركة المصنعة (Make)
              </label>
              <select
                value={selectedMake}
                onChange={(e) => {
                  setSelectedMake(e.target.value);
                  const m = POPULAR_MAKES.find((x) => x.name === e.target.value);
                  if (m && m.models.length > 0) {
                    setSelectedModel(m.models[0]);
                  }
                }}
                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-500"
              >
                {POPULAR_MAKES.map((make) => (
                  <option key={make.name} value={make.name}>
                    {make.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                الموديل (Model)
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-500"
              >
                {currentMakeObj.models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                سنة الصنع (Year)
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-500"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-neutral-400">
              * سيتم حصر وفحص توافق فحمات الفرامل، البواجي، المساعدات، والتيربو تلقائياً مع هذه المواصفات.
            </p>
            <button
              onClick={handleApplyDropdown}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 shrink-0"
            >
              حفظ المركبة في الكراج
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              رقم هيكل المركبة المكون من 17 رمزاً (VIN Number)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={17}
                value={vinInput}
                onChange={(e) => setVinInput(e.target.value.toUpperCase())}
                placeholder="مثال: KL1TD5DE0EB123456 أو W0L0AHL..."
                className="w-full bg-neutral-950 border border-neutral-700 font-mono tracking-wider text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-500 uppercase placeholder:text-neutral-600"
              />
              <button
                onClick={handleDecodeVIN}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap"
              >
                فك تشفير ومطابقة
              </button>
            </div>
            {vinError && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {vinError}
              </p>
            )}
            <p className="text-xs text-neutral-500 mt-2">
              تجد رقم الهيكل مسجلاً على استمارة تسجيل المركبة، أو على زاوية الزجاج الأمامي السفلي.
            </p>
          </div>
        </div>
      )}

      {/* Current Active Vehicle Bar */}
      {selectedVehicle && (
        <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/70 p-4 rounded-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
            <div className="text-xs text-neutral-200">
              <span className="font-bold text-emerald-400">المركبة النشطة: </span>
              {selectedVehicle.make} - {selectedVehicle.model} ({selectedVehicle.year})
              {selectedVehicle.vin && (
                <span className="font-mono text-neutral-400 mr-2 text-[11px]">
                  [VIN: {selectedVehicle.vin}]
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
              <input
                type="checkbox"
                checked={filterOnlyCompatible}
                onChange={(e) => onToggleFilterOnlyCompatible(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded border-neutral-700"
              />
              <span>إظهار القطع المتوافقة 100% فقط</span>
            </label>

            <button
              onClick={() => onSelectVehicle(null)}
              className="text-xs text-neutral-400 hover:text-red-400 transition-colors"
            >
              إلغاء التحديد
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
        <div className="w-full max-w-2xl">{content}</div>
      </div>
    );
  }

  return (
    <section id="garage" className="py-6 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{content}</div>
    </section>
  );
};
