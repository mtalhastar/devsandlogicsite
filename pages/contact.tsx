import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { motion } from 'framer-motion';
import { SectionAnimation, FadeIn } from "@/components/ui/animations";

const ContactPage = () => {
  // TODO: Replace with your actual latitude and longitude
  const latitude = 40.758895;
  const longitude = -73.987320;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>Contact Us | Devs & Logic | SaaS & MVP Development</title>
        <meta name="description" content="Contact Devs & Logic for your SaaS or MVP development needs. Get in touch with our team of experts in New York for a consultation about your project." />
        <meta name="keywords" content="Best MVP and SaaS Developers in Alabama, Best MVP and SaaS Developers in Alaska, Best MVP and SaaS Developers in Arizona, Best MVP and SaaS Developers in Arkansas, Best MVP and SaaS Developers in California, Best MVP and SaaS Developers in Colorado, Best MVP and SaaS Developers in Connecticut, Best MVP and SaaS Developers in Delaware, Best MVP and SaaS Developers in Florida, Best MVP and SaaS Developers in Georgia, Best MVP and SaaS Developers in Hawaii, Best MVP and SaaS Developers in Idaho, Best MVP and SaaS Developers in Illinois, Best MVP and SaaS Developers in Indiana, Best MVP and SaaS Developers in Iowa, Best MVP and SaaS Developers in Kansas, Best MVP and SaaS Developers in Kentucky, Best MVP and SaaS Developers in Louisiana, Best MVP and SaaS Developers in Maine, Best MVP and SaaS Developers in Maryland, Best MVP and SaaS Developers in Massachusetts, Best MVP and SaaS Developers in Michigan, Best MVP and SaaS Developers in Minnesota, Best MVP and SaaS Developers in Mississippi, Best MVP and SaaS Developers in Missouri, Best MVP and SaaS Developers in Montana, Best MVP and SaaS Developers in Nebraska, Best MVP and SaaS Developers in Nevada, Best MVP and SaaS Developers in New Hampshire, Best MVP and SaaS Developers in New Jersey, Best MVP and SaaS Developers in New Mexico, Best MVP and SaaS Developers in New York, Best MVP and SaaS Developers in North Carolina, Best MVP and SaaS Developers in North Dakota, Best MVP and SaaS Developers in Ohio, Best MVP and SaaS Developers in Oklahoma, Best MVP and SaaS Developers in Oregon, Best MVP and SaaS Developers in Pennsylvania, Best MVP and SaaS Developers in Rhode Island, Best MVP and SaaS Developers in South Carolina, Best MVP and SaaS Developers in South Dakota, Best MVP and SaaS Developers in Tennessee, Best MVP and SaaS Developers in Texas, Best MVP and SaaS Developers in Utah, Best MVP and SaaS Developers in Vermont, Best MVP and SaaS Developers in Virginia, Best MVP and SaaS Developers in Washington, Best MVP and SaaS Developers in West Virginia, Best MVP and SaaS Developers in Wisconsin, Best MVP and SaaS Developers in Wyoming, Best MVP and SaaS Developers in Dubai" />
      </Head>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container">
            <SectionAnimation className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg md:text-xl text-gray-700">
                Let's discuss how we can help bring your digital vision to life. Our team is ready to assist you with your SaaS or MVP development needs.
              </p>
            </SectionAnimation>
          </div>
        </section>

        <Contact />

        {/* Office Location */}
        <section className="section bg-gray-50">
          <div className="container">
            <SectionAnimation className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
              <p className="text-lg text-gray-600">Located in the heart of New York's tech district</p>
            </SectionAnimation>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-96 w-full">
                   <iframe 
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3022.1422937950147!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1633023222533!5m2!1sen!2sus`}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  ></iframe>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="inline-block text-left">
                <div className="flex justify-between space-x-12 mb-2">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between space-x-12 mb-2">
                  <span className="font-medium">Saturday:</span>
                  <span>10:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between space-x-12">
                  <span className="font-medium">Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ContactPage; 