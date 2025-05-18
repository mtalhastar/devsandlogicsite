import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { motion } from 'framer-motion';

const ContactPage = () => {
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
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg md:text-xl text-gray-700">
                Let's discuss how we can help bring your digital vision to life. Our team is ready to assist you with your SaaS or MVP development needs.
              </p>
            </div>
          </div>
        </section>

        <Contact />

        {/* Office Location */}
        <section className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
              <p className="text-lg text-gray-600">Located in the heart of New York's tech district</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-96 w-full">
                {/* Replace with an actual map component or embed */}
                <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-500">Interactive Map Placeholder</p>
                    <p className="mt-2 text-gray-600">123 Tech Street, New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ContactPage; 