import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionAnimation } from '@/components/ui/animations';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ArrowRight,CircleDollarSign, LinkedinIcon, DollarSign, Loader2, Building2 } from 'lucide-react';
import { TbBrandFiverr } from "react-icons/tb";
import { toast } from 'sonner';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookCall = () => {
    // Option 1: Use Google Calendar appointment slots (if you have Google Workspace)
    // Get the appointment slot URL from environment variable
    const appointmentSlotUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_APPOINTMENT_URL;
    
    if (appointmentSlotUrl) {
      window.open(appointmentSlotUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // Option 2: Create a Google Calendar event with pre-filled details
    // You can customize these details
    const eventTitle = encodeURIComponent('Consultation Call - Devs & Logic');
    const eventDetails = encodeURIComponent('Let\'s discuss your project and how we can help bring your ideas to life.');
    const eventLocation = encodeURIComponent('Online Meeting');
    const eventDuration = 30; // Duration in minutes
    
    // Get your email from environment or use default
    const yourEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'mtalhastar@gmail.com';
    
    // Create Google Calendar event URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=now/${new Date(Date.now() + eventDuration * 60000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${eventDetails}&location=${eventLocation}&add=${yourEmail}`;
    
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Thank you! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-black relative overflow-x-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] bg-violet-600/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-full overflow-x-hidden">
        {/* CTA Banner */}
        <SectionAnimation>
          <div className="text-center mb-12 md:mb-20 p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/20 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6">
              Ready to Build Something
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"> Amazing?</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-6 md:mb-8 px-2">
              Let's discuss how we can help transform your ideas into successful digital products.
            </p>
            <Button 
              size="lg"
              onClick={handleBookCall}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-full text-base sm:text-lg font-medium"
            >
              Book a Call
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </SectionAnimation>

        <SectionAnimation>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 md:mb-6">Get in Touch</h3>
              <p className="text-gray-400 text-base sm:text-lg mb-6 md:mb-10">
                Have a project in mind? We'd love to hear about it. 
                Reach out and let's start a conversation.
              </p>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-500 text-xs sm:text-sm">Email</p>
                    <p className="text-white text-sm sm:text-base break-words">admin@devsandlogics.com</p>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-500 text-xs sm:text-sm">Phone</p>
                    <p className="text-white text-sm sm:text-base break-words">+923019497401</p>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-500 text-xs sm:text-sm">Location</p>
                    <p className="text-white text-sm sm:text-base break-words">Remote-First, Worldwide</p>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <LinkedinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-500 text-xs sm:text-sm">LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/in/muhammad-talha-845270230/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-sm sm:text-base break-all hover:text-purple-400 transition-colors block"
                    >
                      linkedin.com/in/muhammad-talha-845270230/
                    </a>
                  </div>
                </div>

                 <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <TbBrandFiverr className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-500 text-xs sm:text-sm">Fiverr</p>
                    <a 
                      href="https://www.fiverr.com/s/yvg4r55" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-sm sm:text-base break-all hover:text-purple-400 transition-colors block"
                    >
                      fiverr.com/s/yvg4r55
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-purple-500/5 border-purple-500/20 text-white placeholder:text-gray-500 h-12 sm:h-14 rounded-xl focus:border-purple-500 w-full max-w-full"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-purple-500/5 border-purple-500/20 text-white placeholder:text-gray-500 h-12 sm:h-14 rounded-xl focus:border-purple-500 w-full max-w-full"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Your Phone (Optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-purple-500/5 border-purple-500/20 text-white placeholder:text-gray-500 h-12 sm:h-14 rounded-xl focus:border-purple-500 w-full max-w-full"
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Company Name (Optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="bg-purple-500/5 border-purple-500/20 text-white placeholder:text-gray-500 h-12 sm:h-14 rounded-xl focus:border-purple-500 w-full max-w-full"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-purple-500/5 border-purple-500/20 text-white placeholder:text-gray-500 min-h-[120px] sm:min-h-[150px] rounded-xl focus:border-purple-500 resize-none w-full max-w-full"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white h-12 sm:h-14 rounded-xl text-base sm:text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </SectionAnimation>
      </div>
    </section>
  );
}