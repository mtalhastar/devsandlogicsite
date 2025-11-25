
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Rocket, Palette, Server, Globe, Cloud, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const services = [
  {
    title: 'SaaS Development',
    description: 'End-to-end development of scalable, secure, and feature-rich SaaS applications tailored to your business needs.',
    icon: Code,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    title: 'MVP Development',
    description: 'Rapid development of Minimum Viable Products to validate your idea and attract early adopters and investors.',
    icon: Rocket,
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric design that enhances user experience, increases engagement, and builds brand loyalty.',
    icon: Palette,
    color: "text-pink-500",
    bgColor: "bg-pink-50"
  },
  {
    title: 'API Development',
    description: 'Robust and secure API development to connect your applications and enable seamless data exchange.',
    icon: Server,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50"
  },
  {
    title: 'Web Application Development',
    description: 'Custom web applications with modern technologies that deliver exceptional performance and user experience.',
    icon: Globe,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50"
  },
  {
    title: 'DevOps & Cloud Solutions',
    description: 'Streamlined deployment, scaling, and management of your applications in the cloud.',
    icon: Cloud,
    color: "text-green-500",
    bgColor: "bg-green-50"
  }
];

const Services = () => {
  return (
    <section className="section px-8 bg-gray-50/50 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            We offer a comprehensive suite of development and design services to bring your digital vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group bg-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${service.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">{service.description}</CardDescription>
                  <div className="flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
