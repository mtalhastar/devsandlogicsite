import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobApplicationForm from '@/components/JobApplicationForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, MapPin, Clock, Briefcase, Users, Heart, Coffee, Zap, ArrowRight } from 'lucide-react';

const CareerPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior React Developer",
      type: "Full-time",
      location: "New York, NY (Hybrid)",
      salary: "$120k - $160k",
      description: "We're looking for a Senior React Developer to join our team and help build cutting-edge SaaS applications. You'll work with modern technologies and contribute to exciting projects for our clients.",
      requirements: [
        "5+ years of experience with React and front-end development",
        "Strong TypeScript skills",
        "Experience with modern React patterns and state management",
        "Knowledge of UI/UX design principles",
        "Ability to work in a fast-paced environment"
      ]
    },
    {
      id: 2,
      title: "Backend Developer",
      type: "Full-time",
      location: "Remote",
      salary: "$110k - $150k",
      description: "Join our backend team to develop robust APIs and database solutions for our SaaS and MVP products. You'll be responsible for building scalable backend services that power our applications.",
      requirements: [
        "3+ years of experience with Node.js or similar backend technologies",
        "Experience with SQL and NoSQL databases",
        "Knowledge of RESTful API design",
        "Understanding of cloud services (AWS/Azure/GCP)",
        "Experience with microservices architecture"
      ]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      type: "Full-time",
      location: "New York, NY (On-site)",
      salary: "$90k - $130k",
      description: "We're seeking a talented UI/UX Designer to create beautiful interfaces for our SaaS applications. You'll work closely with developers and stakeholders to design user experiences that are both attractive and functional.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in design tools like Figma/Sketch",
        "Strong portfolio showcasing web and mobile designs",
        "Understanding of user research and testing methodologies",
        "Ability to translate business requirements into design solutions"
      ]
    },
  ];

  const benefits = [
    { icon: Clock, title: "Flexible Hours", desc: "Work when you're most productive with our flexible schedule policy." },
    { icon: Users, title: "Remote Options", desc: "Work from home, our office, or anywhere else you feel comfortable." },
    { icon: Heart, title: "Health & Wellness", desc: "Comprehensive health coverage and wellness programs for you and your family." },
    { icon: Coffee, title: "Team Events", desc: "Regular team lunches, retreats, and social gatherings to build connections." },
    { icon: Zap, title: "Growth Budget", desc: "Annual stipend for courses, conferences, and books to keep you learning." },
    { icon: Briefcase, title: "Top Equipment", desc: "Latest MacBook Pro and high-end peripherals to help you do your best work." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>Careers at Devs & Logic | Join the Best Tech Team</title>
        <meta name="description" content="Join Devs & Logic, the top MVP and SaaS developers. We are looking for talented individuals to help build innovative digital solutions." />
      </Head>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="container relative z-10">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-6 px-4 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none text-sm font-medium rounded-full">We're Hiring!</Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Build the Future with <br/>
                <span className="text-primary relative inline-block">
                  Devs & Logic
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join a team of passionate builders creating world-class SaaS products and MVPs. We believe in innovation, collaboration, and code that matters.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="h-12 px-8 text-lg" onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Open Positions
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                  Learn About Culture
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Company Culture & Benefits */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="section-title">Why Join Us?</h2>
              <p className="section-subtitle">
                We believe that happy employees do their best work. That's why we offer a supportive environment and great benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-primary">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Team Image */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mt-20 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" 
                alt="Devs & Logic Team" 
                className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 text-white max-w-lg">
                <h3 className="text-3xl font-bold mb-2">A Culture of Collaboration</h3>
                <p className="text-lg text-white/90">We succeed together. Our diverse team brings unique perspectives to solve complex problems.</p>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Job Openings */}
        <section id="openings" className="py-24 bg-gray-50">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Openings</h2>
                <p className="text-lg text-gray-600">
                  Ready to make an impact? Check out our available roles below.
                </p>
              </div>
              <Button variant="outline">View All Roles</Button>
            </div>
            
            <div className="grid gap-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-none shadow-sm">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold">{job.title}</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 border-none">{job.type}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" /> {job.salary}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>
                        
                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-500">Key Requirements</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {job.requirements.slice(0, 4).map((req, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm text-gray-700">{req}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-48 flex flex-col justify-center shrink-0">
                        <Button className="w-full mb-3" size="lg" onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}>
                          Apply Now
                        </Button>
                        <Button variant="ghost" className="w-full group">
                          View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Application Form */}
        <section id="application-form" className="py-24 bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
              <p className="text-lg text-gray-600">
                We're always looking for talent. Send us your resume and we'll keep you on file.
              </p>
            </div>
            <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
               <JobApplicationForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default CareerPage; 