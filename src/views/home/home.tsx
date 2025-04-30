'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProductForm from '@/components/productForm';
import ProductList from '@/components/productList';
import type { RootState } from '@/lib/redux/store';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Mes Produits</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {products.length} produit(s) dans votre liste
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="transition-all duration-200 hover:shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
        </Button>
      </div>

      {isFormOpen && <ProductForm onClose={() => setIsFormOpen(false)} />}

      <div className="mt-8">
        <ProductList />
      </div>
    </div>
  );
}
