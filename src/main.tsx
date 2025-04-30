import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Particles from '@/components/bgParticles.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="h-full w-full absolute inset-0 z-0">
      <Particles
        particleColors={['#fff', '#000']}
        particleCount={2000}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={true}
        disableRotation={true}
      />
    </div>

    <div className="relative z-10">
      <App />
    </div>
  </StrictMode>
);
