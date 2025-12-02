import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid, List, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface ProductFiltersProps {
  onFiltersChange: (filters: any) => void;
  totalProducts: number;
}

export function ProductFilters({ onFiltersChange, totalProducts }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Navy', 'Gray', 'Burgundy', 'Cream', 'Pink', 'Blue'];
  const brands = ['Elegant', 'Classic', 'Modern', 'Luxury', 'Casual'];

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked 
      ? [...selectedSizes, size]
      : selectedSizes.filter(s => s !== size);
    setSelectedSizes(newSizes);
    updateFilters({ sizes: newSizes });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked 
      ? [...selectedColors, color]
      : selectedColors.filter(c => c !== color);
    setSelectedColors(newColors);
    updateFilters({ colors: newColors });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked 
      ? [...selectedBrands, brand]
      : selectedBrands.filter(b => b !== brand);
    setSelectedBrands(newBrands);
    updateFilters({ brands: newBrands });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateFilters({ priceRange: value });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateFilters({ sortBy: value });
  };

  const updateFilters = (newFilters: any) => {
    onFiltersChange({
      priceRange,
      sizes: selectedSizes,
      colors: selectedColors,
      brands: selectedBrands,
      sortBy,
      ...newFilters
    });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 500]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSortBy('featured');
    onFiltersChange({
      priceRange: [0, 500],
      sizes: [],
      colors: [],
      brands: [],
      sortBy: 'featured'
    });
  };

  const activeFiltersCount = selectedSizes.length + selectedColors.length + selectedBrands.length;

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2">{activeFiltersCount}</Badge>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Filters Content */}
      <div className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Results and Sort */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">{totalProducts} products</p>
          <div className="flex items-center space-x-2">
            <Label htmlFor="sort" className="text-sm">Sort by:</Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Best Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={clearAllFilters} className="w-full">
            Clear All Filters ({activeFiltersCount})
          </Button>
        )}

        {/* Price Range */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Price Range</h3>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={500}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sizes */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <h3 className="font-medium">Size</h3>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                />
                <Label htmlFor={`size-${size}`} className="text-sm">{size}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Colors */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <h3 className="font-medium">Color</h3>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                />
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                                     color.toLowerCase() === 'white' ? '#fff' :
                                     color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                     color.toLowerCase() === 'gray' ? '#6b7280' :
                                     color.toLowerCase() === 'burgundy' ? '#7c2d12' :
                                     color.toLowerCase() === 'cream' ? '#fef3c7' :
                                     color.toLowerCase() === 'pink' ? '#ec4899' :
                                     color.toLowerCase() === 'blue' ? '#3b82f6' :
                                     '#e5e7eb'
                    }}
                  />
                  <Label htmlFor={`color-${color}`} className="text-sm">{color}</Label>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Brands */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <h3 className="font-medium">Brand</h3>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm">{brand}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}