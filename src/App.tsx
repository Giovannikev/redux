import Home from '@/views/home/home';
import LoginPage from './views/login/login';
import Layout from './layout';
import NotFoundPage from './views/notFound/notFound';
import { Providers } from '@/lib/redux/provider';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/themeProvider';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';
import ProductPage from './views/product/product';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Providers>
        <Toaster richColors closeButton position="top-right" expand={false} />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<ProductPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Providers>
    </ThemeProvider>
  );
}

export default App;
