/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CoffeePourLoader } from './components/CoffeePourLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { HoursAndLocation } from './components/HoursAndLocation';
import { StorySection } from './components/StorySection';
import { ReservationModal } from './components/ReservationModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { MenuItem, CartItem, OrderDetails, CoffeeCustomization } from './types/cafe';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Cart Management
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      // Check if identical cart item exists
      const existingIdx = prev.findIndex(
        i =>
          i.item.id === item.item.id &&
          i.customization.size === item.customization.size &&
          i.customization.milk === item.customization.milk &&
          i.customization.temperature === item.customization.temperature &&
          i.customization.roast === item.customization.roast &&
          i.customization.sweetness === item.customization.sweetness &&
          i.customization.extraShots === item.customization.extraShots &&
          JSON.stringify(i.customization.syrups) === JSON.stringify(item.customization.syrups)
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += item.quantity;
        return next;
      }
      return [...prev, item];
    });

    setIsCartOpen(true);
  };

  const handleQuickAdd = (menuItem: MenuItem) => {
    const isBakery = menuItem.category === 'bakery';
    const defaultCustomization: CoffeeCustomization = {
      size: '12oz',
      roast: 'House Velvet Blend',
      milk: menuItem.category === 'espresso' || menuItem.category === 'specialty' ? 'Oatly Barista' : 'No Milk / Black',
      temperature: 'Hot',
      sweetness: 'Unsweetened (0%)',
      extraShots: 0,
      syrups: [],
      pastryWarmed: isBakery ? true : undefined,
    };

    let unitPrice = menuItem.price;
    if (!isBakery) {
      unitPrice += 0.60; // 12oz regular diff
      if (defaultCustomization.milk === 'Oatly Barista') unitPrice += 0.75;
    }

    const quickItem: CartItem = {
      cartId: `${menuItem.id}-${Date.now()}`,
      item: menuItem,
      customization: defaultCustomization,
      quantity: 1,
      unitPrice: Number(unitPrice.toFixed(2)),
    };

    handleAddToCart(quickItem);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => {
          if (i.cartId === cartId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems(prev => prev.filter(i => i.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = (order: OrderDetails) => {
    setActiveOrder(order);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-[#f4efe8] flex flex-col font-sans selection:bg-[#c89d66] selection:text-[#0e0d0c]">
      
      <CoffeePourLoader />

      {/* 3-Zone Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReserve={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Editorial Hero */}
        <Hero
          onExploreMenu={() => {
            const menuElement = document.getElementById('menu');
            menuElement?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenReserve={() => setIsReservationOpen(true)}
        />

        {/* Curated Daily Menu */}
        <MenuSection
          onSelectItem={item => setSelectedMenuItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Roastery Craft & Direct Trade Story */}
        <StorySection />

        {/* Opening Hours & Sanctuary Location */}
        <HoursAndLocation />

        {/* Community Reviews & Testimonials */}
        <ReviewsSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Slide-overs */}
      <CustomizationModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderTrackingModal
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

    </div>
  );
}
