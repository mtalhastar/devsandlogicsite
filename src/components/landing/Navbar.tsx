import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll helper: offsets by nav height and updates hash in the URL.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only intercept in-page hashes
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    // Special case: Home / empty hash -> scroll top
    if (href === '#' || href === '#home' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState({}, '', '/');
      setIsMobileMenuOpen(false);
      return;
    }
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = navRef.current?.offsetHeight ?? 80; // fallback to 80 if ref missing
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 8; // small padding
      window.scrollTo({ top, behavior: 'smooth' });
      // Update URL hash without causing a jump
      window.history.pushState({}, '', href);
      setIsMobileMenuOpen(false);
      return;
    }
    // Fallback: route to home with hash if element not present (cross-page)
    router.push(`/${href}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        ref={(el) => { navRef.current = el; }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-purple-500/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/30 to-violet-600/40 flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" width={24} height={24} />
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">
                Devs <span className="text-purple-400">&</span> Logics
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
                Book a Call
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl pt-24 px-6">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-2xl text-white hover:text-purple-400 transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                ))}
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-6 mt-4">
                  Book a Call
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}