'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/lib/redux/slices/productSlice';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ProductFormProps {
  onClose: () => void;
}

export default function ProductForm({ onClose }: ProductFormProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim()) {
      const productImage =
        image ||
        `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(
          name
        )}`;

      dispatch(
        addProduct({
          id: Date.now().toString(),
          name,
          description,
          completed: false,
          createdAt: new Date().toISOString(),
          liked: false,
          image: productImage,
        })
      );

      setName('');
      setDescription('');
      setImage('');
      onClose();
      toast.success('succès', {
        description: 'Le produit a été ajouté avec succès',
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full border-2 border-primary/20 shadow-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">Nouveau Produit</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            type="button"
            className="rounded-full h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              Nom
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du produit"
              required
              className="transition-all duration-200 focus:border-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du produit (optionnel)"
              rows={3}
              className="transition-all duration-200 focus:border-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base">Image</Label>
            <div className="flex flex-col items-center gap-4">
              {image ? (
                <div className="relative w-full h-48 rounded-md overflow-hidden border">
                  <img
                    src={image || '/placeholder.svg'}
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 w-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={triggerFileInput}
                >
                  {isUploading ? (
                    <div className="animate-pulse">Chargement...</div>
                  ) : (
                    <>
                      <ImageIcon className="h-10 w-10 text-muted-foreground/70" />
                      <p className="text-sm text-muted-foreground text-center">
                        Cliquez pour ajouter une image
                        <br />
                        <span className="text-xs">
                          ou glissez-déposez une image ici
                        </span>
                      </p>
                    </>
                  )}
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full transition-all duration-200 hover:shadow-md"
          >
            Ajouter
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
