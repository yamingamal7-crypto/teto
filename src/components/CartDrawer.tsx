import React from 'react';
import { X, Trash2, ShoppingBag, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-right">
      <div 
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-r border-neutral-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="text-base font-bold text-white">سلة الفاتورة والطلبات</h2>
              <span className="text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded-full tabular-nums">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-neutral-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 stroke-[1.5] text-neutral-600" />
                <p className="text-sm">سلة المشتريات فارغة حالياً</p>
                <p className="text-xs text-neutral-600 mt-1">
                  تصفح الكتالوج واختر قطع الغيار المطلوبة لسيارتك
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex gap-3.5 items-center justify-between"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-mono text-white font-bold truncate">
                      {product.partCode} · {product.carModel}
                    </div>
                    <div className="text-xs font-bold text-white truncate" title={product.name}>
                      {product.name}
                    </div>
                    <div className="text-xs font-black text-neutral-200 tabular-nums mt-1 font-mono">
                      {(product.price * quantity).toLocaleString('en-US')}{' '}
                      <span className="text-[10px] text-neutral-400 font-sans">ج.م</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                      title="حذف القطعة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                        className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, Math.min(product.stock, quantity + 1))}
                        className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950/70 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">إجمالي الطلب:</span>
                <span className="text-xl font-black text-white font-mono tabular-nums">
                  {totalAmount.toLocaleString('en-US')}{' '}
                  <span className="text-xs text-neutral-300 font-sans">ج.م</span>
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-red-600/30 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>متابعة إتمام الطلب / إصدار الفاتورة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
