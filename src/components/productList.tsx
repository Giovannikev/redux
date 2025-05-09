'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggleProduct,
  removeProduct,
  toggleLikeProduct,
} from '@/lib/redux/slices/productSlice';
import type { RootState } from '@/lib/redux/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Heart, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const filters = useSelector((state: RootState) => state.products.filters);

  // Apply filters to products
  const filteredProducts = products.filter((product) => {
    // Ensure filters exist with default values if undefined
    const searchTerm = filters?.search || '';
    const filterStatus = filters?.status || 'all';
    const filterLiked = filters?.liked;

    // Filter by search term
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    // Filter by status
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
        ? product.completed
        : !product.completed;

    // Filter by liked status
    const matchesLiked =
      filterLiked === null
        ? true
        : filterLiked === true
        ? product.liked
        : !product.liked;

    return matchesSearch && matchesStatus && matchesLiked;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters?.sortBy || 'newest') {
      case 'newest':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'oldest':
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-muted-foreground/20 rounded-lg">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground text-lg">Aucun produit ajouté.</p>
          <p className="text-sm text-muted-foreground/70">
            Cliquez sur "Ajouter un produit" pour commencer.
          </p>
        </div>
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-muted-foreground/20 rounded-lg">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground text-lg">
            Aucun produit ne correspond à vos filtres.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Essayez de modifier vos critères de recherche.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedProducts.map((product) => (
        <Card
          key={product.id}
          className={`transition-all duration-300 hover:shadow-md ${
            product.completed
              ? 'opacity-70 bg-muted/50'
              : 'hover:border-primary/30'
          }`}
        >
          <Link
            to={`/dashboard/product/${product.id}`}
            className="block overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Link>

          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="pt-1">
                <Checkbox
                  id={`product-${product.id}`}
                  checked={product.completed}
                  onCheckedChange={() => dispatch(toggleProduct(product.id))}
                  className="h-5 w-5 transition-all duration-200"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <Link
                  to={`/dashboard/product/${product.id}`}
                  className="block group"
                >
                  <div className="flex items-center">
                    <label
                      htmlFor={`product-${product.id}`}
                      className={`font-medium text-lg transition-all duration-200 ${
                        product.completed
                          ? 'line-through text-muted-foreground'
                          : ''
                      }`}
                    >
                      {product.name}
                    </label>
                    <ExternalLink className="h-3 w-3 ml-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
                {product.description && (
                  <p
                    className={`text-sm transition-all duration-200 ${
                      product.completed
                        ? 'line-through text-muted-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {product.description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground/80 mt-2 flex items-center">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary/60 mr-2"></span>
                  Ajouté{' '}
                  {formatDistanceToNow(new Date(product.createdAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-5 py-3 flex justify-between border-t">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleLikeProduct(product.id))}
              className={`transition-colors duration-200 ${
                product.liked
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart
                className={`h-5 w-5 ${product.liked ? 'fill-current' : ''}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                dispatch(removeProduct(product.id));
                toast.info('Produit supprimé');
              }}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
