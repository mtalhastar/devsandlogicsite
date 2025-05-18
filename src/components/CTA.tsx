import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="section bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Bring Your Vision to Life?</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Let's work together to build a powerful SaaS solution or MVP that drives your business forward.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/projects">See Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
