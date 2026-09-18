"use client";

import { useState, useEffect } from 'react';
import { DESIGNS_40, PRODUCT_TYPES, DESIGN_CATEGORIES } from '../../lib/designs-40';
// Hardcoded variants (CustomCat API route has a Vercel platform 503 issue)
const VARIANT_DATA = {
  G500: { colors: ['Black','White','Navy','Red','Royal','Forest','Maroon','Purple','Charcoal','Sport Grey'], sizes: ['S','M','L','XL'], price: 24.99 },
  G185: { colors: ['Black','White','Navy','Red','Royal','Forest','Maroon','Purple','Charcoal','Sport Grey'], sizes: ['S','M','L','XL'], price: 44.99 },
  MUG11: { colors: ['White'], sizes: ['One Size'], price: 14.99 },
  HAT: { colors: ['Black','White','Navy','Red','Royal','Charcoal'], sizes: ['One Size'], price: 24.99 },
};


// Design-first store: pick a design, choose products, add to cart.
export default function DesignStore() {
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null); // design object
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Product selections per design modal: { tee: {checked, color, size}, ... }
  const [selections, setSelections] = useState({});
  const [variantData, setVariantData] = useState({}); // blank -> {colors, sizes}

  useEffect(() => {
    try {
      const saved = localStorage.getItem('myriehq-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('myriehq-cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const filtered = category === 'all'
    ? DESIGNS_40
    : DESIGNS_40.filter((d) => d.category === category);

  const openDesign = (design) => {
    setSelected(design);
    setSelections({});
    setVariantData({});
    setCheckoutError('');
  };

  const closeDesign = () => {
    setSelected(null);
    setSelections({});
    setVariantData({});
  };

  const toggleProduct = async (ptKey) => {
    const current = selections[ptKey];
    if (current?.checked) {
      setSelections((s) => ({ ...s, [ptKey]: { ...s[ptKey], checked: false } }));
      return;
    }
    // Use hardcoded variants (API route has Vercel 503 issue)
    const blankMap = { tee: 'G500', hoodie: 'G185', mug: 'MUG11', hat: 'HAT' };
    const blank = blankMap[ptKey];
    const vd = VARIANT_DATA[blank];
    if (!vd) return;
    setSelections((s) => ({
      ...s,
      [ptKey]: { checked: true, color: vd.colors[0] || '', size: vd.sizes[0] || '', blank },
    }));
  };

  const updateSelection = (ptKey, field, value) => {
    setSelections((s) => ({ ...s, [ptKey]: { ...s[ptKey], [field]: value } }));
  };

  const addToCart = () => {
    const items = [];
    for (const pt of PRODUCT_TYPES) {
      const sel = selections[pt.key];
      if (sel?.checked && sel.color && sel.size) {
        items.push({
          key: selected.design,
          designKey: selected.key,
          title: selected.title,
          image: selected.image,
          blank: sel.blank,
          productLabel: pt.label,
          price: pt.price,
          color: sel.color,
          size: sel.size,
          qty: 1,
        });
      }
    }
    if (!items.length) return;
    setCart((c) => [...c, ...items]);
    closeDesign();
    setShowCart(true);
  };

  const removeFromCart = (idx) => {
    setCart((c) => c.filter((_, i) => i !== idx));
  };

  const cartTotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0);

  const checkout = async () => {
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      const items = cart.map((it) => ({
        key: it.key,
        blank: it.blank,
        color: it.color,
        size: it.size,
        qty: it.qty,
      }));
      const r = await fetch('/api/store-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const j = await r.json();
      if (j.url) {
        window.location.href = j.url;
      } else {
        setCheckoutError(j.error || 'Checkout failed');
      }
    } catch (e) {
      setCheckoutError(e.message || 'Checkout failed');
    }
    setCheckoutLoading(false);
  };

  const selectedCount = Object.values(selections).filter((s) => s?.checked).length;

  return (
    <div className="design-store">
      {/* Category filter */}
      <div className="ds-categories">
        {DESIGN_CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={`ds-cat ${category === c.key ? 'active' : ''}`}
            onClick={() => setCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Design grid */}
      <div className="ds-grid">
        {filtered.map((d) => (
          <button key={d.key} className="ds-card" onClick={() => openDesign(d)}>
            <div className="ds-card-img">
              <img src={d.image} alt={d.title} loading="lazy" />
            </div>
            <div className="ds-card-title">{d.title}</div>
            <div className="ds-card-blurb">{d.blurb}</div>
            <div className="ds-card-cta">4 products available →</div>
          </button>
        ))}
      </div>

      {/* Design detail modal */}
      {selected && (
        <div className="ds-modal-overlay" onClick={closeDesign}>
          <div className="ds-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ds-modal-close" onClick={closeDesign}>×</button>
            <div className="ds-modal-content">
              <div className="ds-modal-img">
                <img src={selected.image} alt={selected.title} />
              </div>
              <div className="ds-modal-info">
                <h2>{selected.title}</h2>
                <p className="ds-modal-blurb">{selected.blurb}</p>
                <p className="ds-modal-hint">Check the products you want, pick color & size:</p>

                {PRODUCT_TYPES.map((pt) => {
                  const sel = selections[pt.key];
                  const blankMap = { tee: 'G500', hoodie: 'G185', mug: 'MUG11', hat: 'HAT' };
                  const vd = variantData[blankMap[pt.key]];
                  return (
                    <div key={pt.key} className={`ds-product ${sel?.checked ? 'checked' : ''}`}>
                      <label className="ds-product-head">
                        <input
                          type="checkbox"
                          checked={!!sel?.checked}
                          onChange={() => toggleProduct(pt.key)}
                        />
                        <span className="ds-product-name">{pt.label}</span>
                        <span className="ds-product-price">${pt.price.toFixed(2)}</span>
                      </label>
                      {sel?.checked && (
                        <div className="ds-product-opts">
                          <select
                            value={sel.color}
                            onChange={(e) => updateSelection(pt.key, 'color', e.target.value)}
                          >
                            {(vd?.colors || []).map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <select
                            value={sel.size}
                            onChange={(e) => updateSelection(pt.key, 'size', e.target.value)}
                          >
                            {(vd?.sizes || []).map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}

                <button
                  className="ds-add-cart"
                  onClick={addToCart}
                  disabled={!selectedCount}
                >
                  {selectedCount
                    ? `Add ${selectedCount} item${selectedCount > 1 ? 's' : ''} to cart`
                    : 'Select at least one product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart button */}
      <button className="ds-cart-fab" onClick={() => setShowCart(true)}>
        🛒 Cart ({cart.length}) · ${cartTotal.toFixed(2)}
      </button>

      {/* Cart drawer */}
      {showCart && (
        <div className="ds-modal-overlay" onClick={() => setShowCart(false)}>
          <div className="ds-modal ds-cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ds-modal-close" onClick={() => setShowCart(false)}>×</button>
            <h2>Your Cart</h2>
            {!cart.length ? (
              <p className="ds-empty">Your cart is empty. Pick a design to get started.</p>
            ) : (
              <>
                <div className="ds-cart-items">
                  {cart.map((it, i) => (
                    <div key={i} className="ds-cart-item">
                      <img src={it.image} alt={it.title} />
                      <div className="ds-cart-item-info">
                        <div className="ds-cart-item-title">{it.title}</div>
                        <div className="ds-cart-item-meta">
                          {it.productLabel} · {it.color} · {it.size}
                        </div>
                        <div className="ds-cart-item-price">${it.price.toFixed(2)}</div>
                      </div>
                      <button className="ds-cart-remove" onClick={() => removeFromCart(i)}>×</button>
                    </div>
                  ))}
                </div>
                <div className="ds-cart-total">
                  Total: <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                {checkoutError && <div className="ds-error">{checkoutError}</div>}
                <button
                  className="ds-checkout"
                  onClick={checkout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? 'Processing...' : `Checkout · $${cartTotal.toFixed(2)}`}
                </button>
                <p className="ds-secure">Secure checkout via Stripe.</p>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .design-store { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .ds-categories { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; justify-content: center; }
        .ds-cat { padding: 8px 16px; border: 2px solid #e0e0e0; border-radius: 20px; background: white; cursor: pointer; font-size: 14px; }
        .ds-cat.active { background: #111; color: white; border-color: #111; }
        .ds-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
        .ds-card { border: 1px solid #e8e8e8; border-radius: 12px; overflow: hidden; background: white; cursor: pointer; text-align: left; padding: 0; transition: transform 0.15s, box-shadow 0.15s; }
        .ds-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
        .ds-card-img { aspect-ratio: 1; background: #f5f5f5; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .ds-card-img img { width: 100%; height: 100%; object-fit: contain; padding: 12px; }
        .ds-card-title { font-weight: 700; font-size: 15px; padding: 12px 12px 4px; }
        .ds-card-blurb { font-size: 13px; color: #666; padding: 0 12px; }
        .ds-card-cta { font-size: 12px; color: #0066cc; padding: 8px 12px 12px; font-weight: 600; }
        .ds-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .ds-modal { background: white; border-radius: 16px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; }
        .ds-modal-close { position: absolute; top: 12px; right: 16px; font-size: 28px; background: none; border: none; cursor: pointer; z-index: 1; }
        .ds-modal-content { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 24px; }
        @media (max-width: 640px) { .ds-modal-content { grid-template-columns: 1fr; } }
        .ds-modal-img { background: #f5f5f5; border-radius: 12px; display: flex; align-items: center; justify-content: center; min-height: 300px; }
        .ds-modal-img img { max-width: 100%; max-height: 400px; object-fit: contain; }
        .ds-modal-info h2 { margin: 0 0 8px; font-size: 24px; }
        .ds-modal-blurb { color: #666; margin-bottom: 16px; }
        .ds-modal-hint { font-weight: 600; margin-bottom: 12px; font-size: 14px; }
        .ds-product { border: 2px solid #e8e8e8; border-radius: 10px; padding: 12px; margin-bottom: 10px; }
        .ds-product.checked { border-color: #111; background: #fafafa; }
        .ds-product-head { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .ds-product-head input { width: 18px; height: 18px; }
        .ds-product-name { font-weight: 600; flex: 1; }
        .ds-product-price { font-weight: 700; color: #0066cc; }
        .ds-product-opts { display: flex; gap: 8px; margin-top: 10px; }
        .ds-product-opts select { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px; }
        .ds-add-cart { width: 100%; padding: 14px; background: #111; color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; margin-top: 8px; }
        .ds-add-cart:disabled { background: #ccc; cursor: not-allowed; }
        .ds-cart-fab { position: fixed; bottom: 20px; right: 20px; padding: 14px 20px; background: #111; color: white; border: none; border-radius: 30px; font-size: 15px; font-weight: 700; cursor: pointer; z-index: 999; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
        .ds-cart-modal { max-width: 500px; padding: 24px; }
        .ds-cart-modal h2 { margin-top: 0; }
        .ds-empty { color: #666; text-align: center; padding: 40px 0; }
        .ds-cart-items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; max-height: 400px; overflow-y: auto; }
        .ds-cart-item { display: flex; gap: 12px; border: 1px solid #e8e8e8; border-radius: 8px; padding: 10px; align-items: center; }
        .ds-cart-item img { width: 60px; height: 60px; object-fit: contain; background: #f5f5f5; border-radius: 6px; }
        .ds-cart-item-info { flex: 1; }
        .ds-cart-item-title { font-weight: 600; font-size: 14px; }
        .ds-cart-item-meta { font-size: 12px; color: #666; }
        .ds-cart-item-price { font-weight: 700; font-size: 14px; }
        .ds-cart-remove { background: none; border: none; font-size: 20px; cursor: pointer; color: #999; }
        .ds-cart-total { text-align: right; font-size: 18px; margin-bottom: 12px; }
        .ds-checkout { width: 100%; padding: 14px; background: #0066cc; color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; }
        .ds-checkout:disabled { background: #ccc; }
        .ds-secure { text-align: center; font-size: 12px; color: #666; margin-top: 8px; }
        .ds-error { background: #fee; color: #c00; padding: 10px; border-radius: 6px; margin-bottom: 12px; font-size: 14px; }
      `}</style>
    </div>
  );
}
