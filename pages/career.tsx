import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import JobApplicationForm from '@/components/JobApplicationForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CareerPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior React Developer",
      type: "Full-time",
      location: "New York, NY (Hybrid)",
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>Careers at Devs & Logic | Join the Best Tech Team in New York</title>
        <meta name="description" content="Join Devs & Logic, the top MVP and SaaS developers in New York. We are looking for talented individuals to help build innovative digital solutions." />
      </Head>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background pt-16 pb-12">
          <div className="container">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers at Devs & Logic</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Join our team of innovative developers, designers, and thinkers building the future of SaaS and MVPs
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Company Culture */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
                <p className="text-lg mb-4">
                  At Devs & Logic, we believe in creating an environment where innovation thrives and everyone has the opportunity to grow. We value collaboration, continuous learning, and work-life balance.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Flexible working hours and remote options</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Regular team building and social events</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Professional development budget</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Competitive salary and benefits package</span>
                  </li>
                </ul>
              </div>
              <div className="overflow-hidden rounded-lg shadow-xl animate-on-scroll">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Team collaboration at Devs & Logic" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Job Openings */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
              <p className="text-lg text-muted-foreground">
                Explore our available positions and find your next career opportunity
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="animate-on-scroll">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {job.type} · {job.location}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{job.description}</p>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="space-y-1 text-sm">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/10 p-0.5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M20 6L9 17l-5-5"></path>
                            </svg>
                          </div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}>
                      Apply for this position
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Application Form */}
        <section id="application-form" className="py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <JobApplicationForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default CareerPage; 