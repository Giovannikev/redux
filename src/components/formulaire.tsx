'use client';
import { Input } from './ui/input';
import { Button } from '@/components/ui/button';
import { User, LockOpen, Lock, Check } from 'lucide-react';
import { useFormValidation } from '../hooks/useFormValidation';

const Formulaire = () => {
  const {
    formState,
    errors,
    showPassword,
    validateField,
    passwordStrength,
    isValid,
    isFieldValid,
    onSubmitForm,
  } = useFormValidation();

  return (
    <div className="w-full max-w-md mx-auto shadow-lg border border-y-gray-950 rounded-md p-5">
      <div className="space-y-1 rounded-t-lg">
        <h1 className="text-2xl font-bold text-center">Inscription</h1>
      </div>
      <div className="p-6">
        <form className="space-y-5" onSubmit={onSubmitForm}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nom
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User size={18} />
              </div>
              <Input
                id="name"
                placeholder="Entrez votre nom"
                value={formState.name}
                onChange={(e) => validateField('name', e.target.value)}
                className={`pl-10 ${
                  errors.name
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : isFieldValid('name')
                    ? 'border-green-500 focus-visible:ring-green-500'
                    : ''
                }`}
                required
              />
              {isFieldValid('name') && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500">
                  <Check size={18} />
                </div>
              )}
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LockOpen size={18} />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Entrez votre email"
                value={formState.email}
                onChange={(e) => validateField('email', e.target.value)}
                className={`pl-10 ${
                  errors.email
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : isFieldValid('email')
                    ? 'border-green-500 focus-visible:ring-green-500'
                    : ''
                }`}
                required
              />
              {isFieldValid('email') && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500">
                  <Check size={18} />
                </div>
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock size={18} />
              </div>
              <Input
                id="password"
                type={showPassword.password ? 'text' : 'password'}
                placeholder="Entrez votre mot de passe"
                value={formState.password}
                onChange={(e) => validateField('password', e.target.value)}
                className={`pl-10 ${
                  errors.password
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : isFieldValid('password')
                    ? 'border-green-500 focus-visible:ring-green-500'
                    : ''
                }`}
                required
              />
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                style={{ width: `${passwordStrength.value}%` }}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmez le mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Check size={18} />
              </div>
              <Input
                id="confirmPassword"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                placeholder="Confirmez votre mot de passe"
                value={formState.confirmPassword}
                onChange={(e) =>
                  validateField('confirmPassword', e.target.value)
                }
                className={`pl-10 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : isFieldValid('confirmPassword')
                    ? 'border-green-500 focus-visible:ring-green-500'
                    : ''
                }`}
                required
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={!isValid}>
            S'inscrire
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Formulaire;
