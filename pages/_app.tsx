import type { AppProps } from 'next/app';
import '../src/index.css'; // Corrected path to global CSS
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router'; // For AnimatePresence key

// Create a single QueryClient instance outside the component
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.route} // Unique key for page transitions
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
} 