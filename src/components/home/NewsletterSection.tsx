import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function NewsletterSection() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay in Style
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new arrivals, 
              exclusive offers, and style tips from our fashion experts.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
              />
              <Button className="bg-white text-gray-900 hover:bg-gray-100">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-800">
            <div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-400 text-sm">On all orders over $100</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-400 text-sm">30-day return policy</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Customer service available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}