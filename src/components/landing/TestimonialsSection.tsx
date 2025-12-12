import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionAnimation, StaggerContainer, StaggerItem } from '@/components/ui/animations';
import { Star, Quote } from 'lucide-react';
import ReviewForm from './ReviewForm';

// Fallback testimonials if no reviews are available
const fallbackTestimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechVentures",
    content: "Devs and Logics delivered an exceptional product that exceeded our expectations. Their attention to detail and commitment to quality is unmatched.",
    rating: 5,
    image: "/review (1).png"
  },
  {
    name: "Michael Chen",
    role: "Founder, StartupHub",
    content: "Working with this team was a game-changer for our business. They understood our vision and transformed it into a stunning digital reality.",
    rating: 5,
    image: "/review (2).png"
  },
  {
    name: "Emily Rodriguez",
    role: "CTO, DataFlow Inc",
    content: "The team's technical expertise and innovative approach helped us build a scalable platform. Highly recommend their services!",
    rating: 5,
    image: "/review (3).png"
  },
  {
    name: "David Park",
    role: "Product Manager, CloudNine",
    content: "Outstanding communication and delivery. They met all deadlines and the final product was exactly what we envisioned.",
    rating: 5,
    image: "/review (4).png"
  }
];

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews/get?status=approved');
        const result = await response.json();
        
        if (response.ok && result.data && result.data.length > 0) {
          setReviews(result.data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Use approved reviews if available, otherwise use fallback
  const testimonials = reviews.length > 0 ? reviews : fallbackTestimonials;
  return (
    <section className="py-24 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <SectionAnimation className="text-center mb-16">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients Are Saying
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Don't just take our word for it – here's what some of our satisfied clients have to say
          </p>
          </motion.div>
        </SectionAnimation>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-12">
          {loading ? (
            <div className="col-span-2 flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            testimonials.map((testimonial, idx) => (
              <StaggerItem key={testimonial.id || idx} className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-violet-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-purple-500/20" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonial.imageUrl || testimonial.image ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-purple-500/30">
                      <img 
                        src={testimonial.imageUrl || testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center border border-purple-500/30">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-purple-400 text-sm">
                      {testimonial.role && testimonial.company 
                        ? `${testimonial.role} at ${testimonial.company}`
                        : testimonial.role || testimonial.company || ''}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))
          )}
        </StaggerContainer>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto mt-12">
          <ReviewForm />
        </div>
      </div>
    </section>
  );
}