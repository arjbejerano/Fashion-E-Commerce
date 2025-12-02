import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export function CategorySection() {
  const categories = [
    {
      name: 'Dresses',
      image: '/placeholder.svg',
      description: 'Elegant dresses for every occasion',
      itemCount: '120+ items',
      href: '#/dresses',
    },
    {
      name: 'Outerwear',
      image: '/placeholder.svg',
      description: 'Coats, jackets & blazers',
      itemCount: '85+ items',
      href: '#',
    },
    {
      name: 'Shoes',
      image: '/placeholder.svg',
      description: 'From heels to sneakers',
      itemCount: '200+ items',
      href: '#',
    },
    {
      name: 'Accessories',
      image: '/placeholder.svg',
      description: 'Bags, jewelry & more',
      itemCount: '150+ items',
      href: '#',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections designed to elevate your style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a href={category.href} key={category.name}>
              <Card 
                className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300"
              >
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.itemCount}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-3">{category.description}</p>
                <Button variant="ghost" className="group/btn p-0 h-auto font-medium">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}