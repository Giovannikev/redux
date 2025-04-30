'use client';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeProduct,
  toggleLikeProduct,
} from '@/lib/redux/slices/productSlice';
import type { RootState } from '@/lib/redux/store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.products.items.find((item) => item.id === id)
  );

  if (!product) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
        </Button>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <p className="text-muted-foreground">
            Ce produit n'existe pas ou a été supprimé.
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    dispatch(removeProduct(id!));
    navigate('/dashboard');
  };

  const handleToggleLike = () => {
    dispatch(toggleLikeProduct(id!));
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Button
        variant="outline"
        onClick={() => navigate('/dashboard')}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
      </Button>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl">{product.name}</CardTitle>
        </CardHeader>

        <div className="relative h-[300px] w-full">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span
                className={`inline-block h-3 w-3 rounded-full mr-2 ${
                  product.completed ? 'bg-green-500' : 'bg-amber-500'
                }`}
              ></span>
              <span className="text-sm text-muted-foreground">
                {product.completed ? 'Complété' : 'En cours'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ajouté{' '}
              {formatDistanceToNow(new Date(product.createdAt), {
                addSuffix: true,
                locale: fr,
              })}
            </p>
          </div>

          {product.description ? (
            <p className="text-lg">{product.description}</p>
          ) : (
            <p className="text-muted-foreground italic">
              Aucune description disponible
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t p-6">
          <Button
            variant="outline"
            onClick={handleToggleLike}
            className={`transition-colors duration-200 ${
              product.liked
                ? 'text-red-500 border-red-200 hover:border-red-300'
                : ''
            }`}
          >
            <Heart
              className={`mr-2 h-5 w-5 ${product.liked ? 'fill-current' : ''}`}
            />
            {product.liked ? 'Aimé' : 'Aimer'}
          </Button>

          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-5 w-5" />
            Supprimer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
