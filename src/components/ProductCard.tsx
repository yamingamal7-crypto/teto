import React from 'react';
import { ShoppingBag, Eye, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isCompatible?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  isCompatible = true,
}) => {
  const isLowStock = product.stock <= product.reorderLevel;

  return (
    <div className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-neutral-950/50">
      
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-950">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Part Code Badge */}
        <div className="absolute top-3 right-3 bg-neutral-950/85 backdrop-blur-md border border-neutral-700/60 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-white">
          {product.partCode}
        </div>

        {/* Stock Status Indicator */}
        <div className="absolute bottom-3 right-3">
          {isLowStock ? (
            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
              <AlertTriangle className="w-3 h-3" />
              متبقي {product.stock} قطع فقط (قارب على النفاد)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-neutral-900/80 text-emerald-400 text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur border border-emerald-500/30">
              <Check className="w-3 h-3" />
              متوفر ({product.stock} قطعة)
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-right">
        <div>
          {/* Metadata: Unboxed text with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
            <span className="text-white font-semibold">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.carBrand}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.carModel}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Price & Purchase Actions */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-neutral-500 block">سعر القطعة</span>
            <div className="text-base sm:text-lg font-black text-white tabular-nums">
              {product.price.toLocaleString('en-US')}{' '}
              <span className="text-xs font-normal text-neutral-300">ج.م</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors border border-neutral-700"
              title="عرض التفاصيل ومطابقة الموديل"
              aria-label="عرض التفاصيل"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 shadow-red-600/30"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>إضافة للسلة</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
