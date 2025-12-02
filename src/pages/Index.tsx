import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { ShoppingCart } from '../components/cart/ShoppingCart';
import { ProductDetailModal } from '../components/product/ProductDetailModal';
import { useShopping } from '../contexts/ShoppingContext';
import { mockProducts } from '../data/mockData';
import { Product } from '../contexts/ShoppingContext';

const Index = () => {
  const { dispatch } = useShopping();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load mock products on component mount
  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
  }, [dispatch]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />
      
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedProducts 
          products={mockProducts}
          onProductClick={handleProductClick}
        />
        <NewsletterSection />
      </main>
      
      <Footer />
      
      {/* Shopping Cart Sidebar */}
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      
      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseProductModal}
      />
    </div>
  );
};

export default Index;
