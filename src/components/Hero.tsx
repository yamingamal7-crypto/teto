import React from 'react';
import { Search, ShieldCheck, CheckCircle2, Wrench, Sparkles, ArrowDown } from 'lucide-react';
import { SHOWROOM_HERO_IMAGE } from '../data/partsData';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenGarage: () => void;
  onScrollToCatalog: () => void;
  onSelectSearchTag: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onOpenGarage,
  onScrollToCatalog,
  onSelectSearchTag,
}) => {
  const quickTags = ['نيو أوبترا', 'أوبل أسترا', 'MG 5', 'إسبيرانزا A516', 'تيل فرامل', 'سير كاتينة Gates', 'بدال بنزين T2-PH-001', 'كولر زيت'];

  return (
    <section id="hero" className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800">
      {/* Background Showroom Media with Measured Scrim for WCAG AA compliance */}
      <div className="absolute inset-0 z-0">
        <img
          src={SHOWROOM_HERO_IMAGE}
          alt="معرض قطع غيار السيارات تيتو ستور"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-40 saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-neutral-950/40 to-neutral-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Official TITO STORE Brand Banner (Uploaded by User) */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-xl rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-black hover:border-red-600/40 transition-colors">
              <img
                src="/assets/tito_store_banner.svg"
                alt="TITO STORE - POWERED BY ZEUS (CHEVROLET | OPEL | MG | ESPERANZA)"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Hero Headline with text-wrap: balance */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight text-balance mb-6">
            قطع الغيار الأصلية والمضمونة لسيارتك بكود المصنع
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 text-balance leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
            المعرض الرسمي لقطع غيار شيفروليه (نيو أوبترا، كروز، كابتيفا)، أوبل (أسترا، إنسيجنيا)، إم جي (MG5, ZS, HS)، وإسبيرانزا (A516, تيجو). صور حقيقية من رفوف المحل وفحص فوري بالباركود ورقم الشاسيه.
          </p>

          {/* Unified Search & VIN lookup bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="relative flex items-center bg-neutral-900/90 border border-neutral-700 focus-within:border-red-500 rounded-xl p-1.5 shadow-2xl transition-all">
              <div className="flex items-center px-3 text-neutral-400">
                <Search className="w-5 h-5 text-red-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث باسم القطعة، رقم القطعة OEM (مثل 04465-33480)، أو نوع سيارتك..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-400 focus:outline-none py-2 px-1"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white"
                >
                  مسح
                </button>
              )}
              <button
                onClick={onScrollToCatalog}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shrink-0 shadow-sm"
              >
                بحث في المعرض
              </button>
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-neutral-400">
              <span className="text-neutral-500">الأكثر بحثاً:</span>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    onSelectSearchTag(tag);
                    onScrollToCatalog();
                  }}
                  className="hover:text-white transition-colors underline underline-offset-4 decoration-neutral-700 hover:decoration-white"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenGarage}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold text-sm transition-all shadow-lg hover:border-red-500/50"
            >
              <Wrench className="w-4 h-4 text-red-500" />
              <span>تحديد سيارتك في الكراج (فحص التوافق)</span>
            </button>
            <button
              onClick={onScrollToCatalog}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-neutral-700 font-semibold text-sm transition-all"
            >
              <span>استكشاف الكتالوج المميز</span>
              <ArrowDown className="w-4 h-4 text-red-500" />
            </button>
          </div>

        </div>

        {/* 4-Column KPI Trust Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-neutral-800/80">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-right">
            <div className="text-2xl font-extrabold text-white tabular-nums mb-1">100%</div>
            <div className="text-xs font-semibold text-white mb-0.5">قطع أصلية ومطابقة</div>
            <div className="text-[11px] text-neutral-400">ضمان وكيل معتمد وفحص الباركود</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-right">
            <div className="text-2xl font-extrabold text-white tabular-nums mb-1">+25,000</div>
            <div className="text-xs font-semibold text-white mb-0.5">صنف جاهز للتسليم</div>
            <div className="text-[11px] text-neutral-400">تغطية شاملة للمحركات والفرامل</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-right">
            <div className="text-2xl font-extrabold text-white tabular-nums mb-1">19 رافعة</div>
            <div className="text-xs font-semibold text-white mb-0.5">ورش صيانة وتركيب بالمعارض</div>
            <div className="text-[11px] text-neutral-400">خدمة سريعة وضمان تركيب مباشر</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-right">
            <div className="text-2xl font-extrabold text-white tabular-nums mb-1">سنتان</div>
            <div className="text-xs font-semibold text-white mb-0.5">ضمان استبدال مباشر</div>
            <div className="text-[11px] text-neutral-400">حماية كاملة ضد أي عيوب تشغيلية</div>
          </div>
        </div>

      </div>
    </section>
  );
};
