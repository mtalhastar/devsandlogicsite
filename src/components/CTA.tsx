import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionAnimation, FadeIn } from "@/components/ui/animations";

const CTASection = () => {
  return (
    <section className="section px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionAnimation>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Ready to Bring Your Vision to Life?</h2>
            <p className="text-lg md:text-xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Let's work together to build a powerful SaaS solution or MVP that drives your business forward. The future of your digital success starts here.
            </p>
          </SectionAnimation>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold text-blue-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1" asChild>
              <Link href="/contact" className="flex items-center gap-2">
                Start a Project <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-white hover:border-white/50 transition-all" asChild>
              <Link href="/projects">See Our Work</Link>
            </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
