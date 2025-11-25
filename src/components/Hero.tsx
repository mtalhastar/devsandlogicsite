import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart } from 'lucide-react';
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure animation triggers on initial load
    setIsMounted(true);
  }, []);

  return (
    <div className="relative px-8 overflow-hidden bg-background pt-24 min-h-[95vh] flex items-center">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/50 blur-[120px] opacity-60 animate-pulse" />
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-[100px] opacity-50" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-purple-100/40 blur-[120px] opacity-40" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Hero Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 py-1.5 px-4 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Top MVP & SaaS Development Agency
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Turning Ideas into <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Powerful Solutions</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                We design and develop cutting-edge SaaS applications and MVPs that help businesses scale and innovate in the digital world.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-12 px-8 text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  <Link href="/contact" className="flex items-center gap-2">
                    Start Your Project <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="h-12 px-8 text-lg bg-white/50 backdrop-blur-sm hover:bg-white/80">
                  <Link href="/projects">View Our Work</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8 border-t pt-8 border-gray-200/60">
              <div className="text-left">
                <div className="text-3xl font-bold text-foreground mb-1">
                  <AnimatedCounter value={30} suffix="+" duration={2} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">Projects Delivered</div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-foreground mb-1">
                  <AnimatedCounter value={95} suffix="%" duration={2} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">Client Satisfaction</div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-foreground mb-1">
                  <AnimatedCounter value={20} suffix="+" duration={2} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">SaaS Applications</div>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Image / Visual */}
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100/50 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80" 
                  alt="SaaS Development Team"
                  className="w-full object-cover h-[400px] lg:h-[500px]"
                />
                
                {/* Floating Cards */}
                <motion.div 
                  className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-[200px]"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isMounted ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Status</div>
                      <div className="font-bold text-sm text-gray-900">On Track</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50"
                  initial={{ y: -20, opacity: 0 }}
                  animate={isMounted ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Fast Delivery</div>
                      <div className="text-xs text-gray-500">MVP in 4 weeks</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
