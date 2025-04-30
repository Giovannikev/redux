'use client';

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-5">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="text-3xl font-semibold">Page non trouvée</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="pt-6">
          <Button onClick={() => navigate('/dashboard')}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
