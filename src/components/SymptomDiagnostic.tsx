import React, { useState } from 'react';
import { Stethoscope, CheckCircle, ArrowLeft, AlertTriangle, HelpCircle } from 'lucide-react';
import { DIAGNOSTIC_SYMPTOMS } from '../data/partsData';
import { DiagnosticSymptom, Part } from '../types/parts';

interface SymptomDiagnosticProps {
  onSelectRecommendedParts: (partIds: string[]) => void;
  parts: Part[];
  onOpenProductModal: (part: Part) => void;
}

export const SymptomDiagnostic: React.FC<SymptomDiagnosticProps> = ({
  onSelectRecommendedParts,
  parts,
  onOpenProductModal,
}) => {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(DIAGNOSTIC_SYMPTOMS[0].id);

  const currentSymptom = DIAGNOSTIC_SYMPTOMS.find((s) => s.id === selectedSymptomId) || DIAGNOSTIC_SYMPTOMS[0];
  const matchingParts = parts.filter((p) => currentSymptom.recommendedPartIds.includes(p.id));

  return (
    <section id="diagnostics" className="py-16 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-right">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-white mb-2">
            <Stethoscope className="w-4 h-4 text-red-500" />
            <span>المستشار الميكانيكي وفاحص الأعطال الذكي | TITO STORE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            لا تعرف اسم القطعة التالفة؟ اختر ما تشعر به أثناء القيادة
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            حدد العرض أو الصوت غير الطبيعي وسيقوم نظامنا بتشخيص المسبب واقتراح القطع الأصلية المناسبة لمعالجة المشكلة فوراً.
          </p>
        </div>

        {/* Symptoms Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Symptoms List (Left/Right) */}
          <div className="lg:col-span-5 space-y-3">
            {DIAGNOSTIC_SYMPTOMS.map((symptom) => {
              const isActive = symptom.id === selectedSymptomId;
              return (
                <button
                  key={symptom.id}
                  onClick={() => setSelectedSymptomId(symptom.id)}
                  className={`w-full text-right p-4 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-neutral-800 border-red-500 shadow-lg text-white'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-sm font-bold flex items-center gap-2">
                        {isActive && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
                        <span>{symptom.titleAr}</span>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2">
                        {symptom.descriptionAr}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Diagnostic Result & Solution Box */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-right shadow-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-white mb-3">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>التحليل الهندسي والميكانيكي للعطل</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">
              {currentSymptom.titleAr}
            </h3>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 mb-6 text-sm text-neutral-300 leading-relaxed">
              <span className="font-bold text-white block mb-1">السبب المرجح هندسياً:</span>
              {currentSymptom.likelyCauseAr}
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-white">القطع الموصى بها في المعرض لحل المشكلة:</span>
              <button
                onClick={() => onSelectRecommendedParts(currentSymptom.recommendedPartIds)}
                className="text-xs font-semibold text-white hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <span>تصفية الكتالوج بالكامل لهذه القطع</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recommended Parts Preview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchingParts.map((part) => (
                <div
                  key={part.id}
                  className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-3 flex flex-col justify-between transition-all"
                >
                  <div className="flex gap-3 items-center mb-3">
                    <img
                      src={part.image}
                      alt={part.nameAr}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="text-[11px] text-white font-mono">{part.brand}</div>
                      <h4 className="text-xs font-bold text-white truncate" title={part.nameAr}>
                        {part.nameAr}
                      </h4>
                      <div className="text-xs font-extrabold text-neutral-100 tabular-nums mt-1 font-mono">
                        {part.price.toLocaleString('en-US')} ج.م
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenProductModal(part)}
                    className="w-full py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold rounded-lg border border-neutral-700 transition-colors"
                  >
                    عرض تفاصيل القطعة والمواصفات
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
