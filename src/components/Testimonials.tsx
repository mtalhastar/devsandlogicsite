
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionAnimation, FadeIn } from "@/components/ui/animations";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechNova",
    company: "TechNova",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    content: "Devs & Logic transformed our idea into a fully functional SaaS platform in record time. Their technical expertise and attention to detail exceeded our expectations. They weren't just developers; they were partners in our success."
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Founder, HealthTrack",
    company: "HealthTrack",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Working with Devs & Logic on our healthcare MVP was a game-changer. They helped us validate our concept quickly and secure our first round of funding. Their technical skills and industry knowledge made all the difference."
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    position: "Product Manager, RetailBoost",
    company: "RetailBoost",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "The e-commerce platform Devs & Logic built for us has completely transformed our business. Sales are up 200% and customer feedback has been overwhelmingly positive. They delivered exactly what we needed and more."
  },
  {
    id: 4,
    name: "David Williams",
    position: "CTO, FinEdge",
    company: "FinEdge",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    content: "As a fintech startup, we needed developers who understood both technology and finance. Devs & Logic exceeded our expectations, delivering a secure, compliant, and user-friendly platform that our customers love."
  },
  {
    id: 5,
    name: "Olivia Thompson",
    position: "Director of Innovation, EduTech",
    company: "EduTech",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    content: "Our learning platform required complex features and integrations. The team at Devs & Logic not only understood our vision but enhanced it with their technical expertise. They are truly experts in SaaS development."
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section px-8 bg-gradient-to-b from-white to-blue-50/30 py-24 relative overflow-hidden">
       {/* Decorative Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <SectionAnimation className="text-center">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Hear what our clients have to say about working with Devs & Logic
          </p>
        </SectionAnimation>

        <div className="mt-16">
          {/* Desktop View - Grid Display */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.1}>
                <TestimonialCard testimonial={testimonial} />
              </FadeIn>
            ))}
          </div>

          {/* Mobile and Tablet View - Carousel */}
          <div className="lg:hidden">
            <div className="relative max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <FadeIn key={testimonials[activeIndex].id} direction="right">
                  <TestimonialCard testimonial={testimonials[activeIndex]} />
                </FadeIn>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-center mt-8 gap-4">
                <button 
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`mx-1.5 h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2.5'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Testimonials Section */}
        <FadeIn delay={0.4} className="mt-16 text-center">
          <a href="/about" className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
            Read more client success stories <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-full blur-sm opacity-50"></div>
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-bold text-lg leading-tight">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
          </div>
        </div>
        
        <div className="mb-4 flex">
           {[...Array(5)].map((_, i) => (
             <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
           ))}
        </div>

        <Quote className="h-8 w-8 text-primary/10 mb-3 rotate-180" />
        <p className="text-gray-600 leading-relaxed italic relative z-10">
          "{testimonial.content}"
        </p>
      </CardContent>
    </Card>
  );
};

export default Testimonials;

