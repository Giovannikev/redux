'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { setFilters } from '@/lib/redux/slices/productSlice';

export type FilterState = {
  search: string;
  status: 'all' | 'completed' | 'active';
  liked: boolean | null;
  sortBy: 'newest' | 'oldest' | 'name' | 'none';
};

const initialFilters: FilterState = {
  search: '',
  status: 'all',
  liked: null,
  sortBy: 'newest',
};

export default function ProductFilter() {
  const dispatch = useDispatch();
  const [filters, setLocalFilters] = useState<FilterState>(initialFilters);
  const [isOpen, setIsOpen] = useState(false);

  // Update Redux store when filters change
  useEffect(() => {
    dispatch(setFilters(filters));
  }, [filters, dispatch]);

  const handleReset = () => {
    setLocalFilters(initialFilters);
  };

  const toggleMobileFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={toggleMobileFilters}
          className="w-full flex items-center justify-center"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Desktop filters (always visible) and Mobile filters (toggleable) */}
      <div
        className={`
        space-y-4 
        ${isOpen ? 'block' : 'hidden'} 
        md:block 
        bg-background 
        md:bg-transparent 
        ${isOpen ? 'fixed inset-0 z-50 p-6 overflow-y-auto' : ''}
        md:relative md:z-0 md:p-0
      `}
      >
        {isOpen && (
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h3 className="font-semibold text-lg">Filtres</h3>
            <Button variant="ghost" size="icon" onClick={toggleMobileFilters}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un produit..."
            value={filters.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocalFilters({ ...filters, search: e.target.value })
            }
            className="pl-9"
          />
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="status"
          className="w-full"
        >
          <AccordionItem value="status">
            <AccordionTrigger className="text-sm font-medium">
              Statut
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={filters.status === 'all'}
                    onChange={() =>
                      setLocalFilters({ ...filters, status: 'all' })
                    }
                    className="h-4 w-4"
                  />
                  <span>Tous</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={filters.status === 'active'}
                    onChange={() =>
                      setLocalFilters({ ...filters, status: 'active' })
                    }
                    className="h-4 w-4"
                  />
                  <span>Actifs</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={filters.status === 'completed'}
                    onChange={() =>
                      setLocalFilters({ ...filters, status: 'completed' })
                    }
                    className="h-4 w-4"
                  />
                  <span>Complétés</span>
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="liked">
            <AccordionTrigger className="text-sm font-medium">
              Favoris
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={filters.liked === null}
                    onChange={() =>
                      setLocalFilters({ ...filters, liked: null })
                    }
                    className="h-4 w-4"
                  />
                  <span>Tous</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={filters.liked === true}
                    onChange={() =>
                      setLocalFilters({ ...filters, liked: true })
                    }
                    className="h-4 w-4"
                  />
                  <span>Favoris uniquement</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={filters.liked === false}
                    onChange={() =>
                      setLocalFilters({ ...filters, liked: false })
                    }
                    className="h-4 w-4"
                  />
                  <span>Non favoris uniquement</span>
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sort">
            <AccordionTrigger className="text-sm font-medium">
              Trier par
            </AccordionTrigger>
            <AccordionContent>
              <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                  setLocalFilters({
                    ...filters,
                    sortBy: value as 'newest' | 'oldest' | 'name' | 'none',
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récent</SelectItem>
                  <SelectItem value="oldest">Plus ancien</SelectItem>
                  <SelectItem value="name">Nom (A-Z)</SelectItem>
                  <SelectItem value="none">Aucun tri</SelectItem>
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button variant="outline" onClick={handleReset} className="w-full mt-4">
          Réinitialiser les filtres
        </Button>

        {isOpen && (
          <Button
            onClick={toggleMobileFilters}
            className="w-full mt-4 md:hidden"
          >
            Appliquer les filtres
          </Button>
        )}
      </div>
    </>
  );
}
