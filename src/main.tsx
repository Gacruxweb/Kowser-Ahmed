import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TooltipProvider } from "@/components/ui/tooltip";
import {FirebaseProvider} from './components/FirebaseProvider';

// Suppress benign Vite WebSocket connection errors
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && (
      event.reason.message?.includes('WebSocket closed without opened') ||
      event.reason.message?.includes('failed to connect to websocket')
    )) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </FirebaseProvider>
  </StrictMode>,
);

