import React, { useState } from 'react';
import { X, ShieldCheck, Check, ShoppingBag, MessageCircle, Copy, Barcode, Wrench } from 'lucide-react';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!product) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(product.partCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = `السلام عليكم، أود الاستفسار وطلب قطعة غيار:
- اسم القطعة: ${product.name}
- كود القطعة: ${product.partCode}
- الماركة والموديل: ${product.carBrand} (${product.carModel})
- السعر: ${product.price}
- الكمية المطلوبة: ${quantity}`;
    const url = `https://wa.me/201020272266?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in text-right">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800/80 hover:bg-neutral-800 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Banner */}
        <div className="relative aspect-16/9 bg-neutral-950 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 right-6">
            <span className="bg-red-600 text-white text-xs font-mono font-black px-3 py-1 rounded-lg shadow-lg">
              كود: {product.partCode}
            </span>
          </div>
        </div>

        {/* Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header & Meta */}
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
              <span className="text-white font-bold">{product.brand}</span>
              <span>·</span>
              <span>{product.carBrand}</span>
              <span>·</span>
              <span className="text-emerald-400">
                {product.isOriginal ? 'قطعة أصلية معتمدة' : 'درجة أولى ممتازة'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              {product.name}
            </h2>

            <div className="text-2xl font-black text-white font-mono tabular-nums mt-3">
              {product.price.toLocaleString('en-US')}{' '}
              <span className="text-sm font-semibold text-neutral-300">ج.م</span>
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-neutral-300 leading-relaxed bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
            {product.description}
          </div>

          {/* Technical Specs & Fitment */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">الموديلات المتوافقة:</span>
              <span className="text-white font-medium">{product.carModel}</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">الباركود المسجل:</span>
              <span className="text-white font-mono">{product.barcode || 'غير مسجل'}</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">رصيد الرف الحالي:</span>
              <span className="text-emerald-400 font-bold">{product.stock} قطعة</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">القسم والتصنيف:</span>
              <span className="text-white font-medium">{product.category}</span>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-xl p-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-white tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-1 justify-end">
              <button
                onClick={handleWhatsApp}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>طلب واتساب</span>
              </button>

              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-red-600/30 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>إضافة إلى الفاتورة</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
