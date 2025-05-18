
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="section bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Hear what our clients have to say about working with Devs & Logic
          </p>
        </motion.div>

        <div className="mt-12">
          {/* Desktop View - Grid Display */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>

          {/* Mobile and Tablet View - Carousel */}
          <div className="lg:hidden">
            <div className="relative">
              <motion.div
                key={testimonials[activeIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard testimonial={testimonials[activeIndex]} />
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-center mt-6 gap-4">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`mx-1 w-2 h-2 rounded-full ${index === activeIndex ? 'bg-primary' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Testimonials Section */}
        <div className="mt-12 text-center">
          <a href="/about" className="text-primary hover:underline font-medium">
            Read more client success stories →
          </a>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h4 className="font-bold">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.position}</p>
          </div>
        </div>
        <svg className="h-8 w-8 text-primary/20 mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-gray-700">{testimonial.content}</p>
      </CardContent>
    </Card>
  );
};

export default Testimonials;
