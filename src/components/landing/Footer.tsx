import { motion } from 'framer-motion';
import { SectionAnimation } from '@/components/ui/animations';
import { Linkedin, Twitter, Github, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: ["Web Development", "Mobile Apps", "UI/UX Design", "Cloud Solutions"],
    Company: ["About Us", "Portfolio", "Careers", "Contact"],
    Resources: ["Blog", "Case Studies", "Documentation", "FAQ"]
  };

  const socialLinks = [
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Github, href: "#" },
    { icon: Instagram, href: "#" }
  ];

  return (
    <footer className="bg-black border-t border-purple-500/10">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <SectionAnimation>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-2xl font-bold text-white">
                Devs <span className="text-purple-400">&</span> Logics
              </span>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Building SaaS MVPs, Web Platforms & Mobile Apps That Scale. 
              Architecting Tomorrow's Digital Solutions Today.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-purple-500/20 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <div key={idx}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-purple-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Devs and Logics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-purple-400 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
        </SectionAnimation>
      </div>
    </footer>
  );
}