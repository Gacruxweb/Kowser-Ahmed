import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TooltipProvider } from "@/components/ui/tooltip";
import { FirebaseProvider } from './components/FirebaseProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </FirebaseProvider>
  </StrictMode>,
);

