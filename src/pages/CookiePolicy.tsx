import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Info, Settings } from 'lucide-react';

export const CookiePolicy = () => {
  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mx-auto">
          At PDFImage Online, we believe in being clear and open about how we collect and use data related to you. 
          This policy provides detailed information about how and when we use cookies on our website.
        </p>
      </motion.div>

      <div className="space-y-12">
        <section className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-accent-purple/10 rounded-2xl flex items-center justify-center mb-4">
              <Cookie className="text-accent-purple w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">What are cookies?</h2>
          </div>
          <p className="text-slate-400 leading-relaxed mx-auto">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. 
            A cookie can be "persistent" (it stays on your device for a set period or until you delete it) or "session" (it is deleted when you close your browser).
          </p>
        </section>

        <section className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="text-accent-blue w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">How we use cookies</h2>
          </div>
          <p className="text-slate-400 leading-relaxed mb-4 mx-auto">
            We use cookies for several reasons:
          </p>
          <ul className="list-disc list-inside text-slate-400 space-y-3 ml-4 text-left">
            <li><strong className="text-white">Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences or filling in forms.</li>
            <li><strong className="text-white">Performance Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</li>
            <li><strong className="text-white">Functionality Cookies:</strong> These enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.</li>
          </ul>
        </section>

        <section className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Info className="text-emerald-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Third-party cookies</h2>
          </div>
          <p className="text-slate-400 leading-relaxed mx-auto">
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on. 
            These cookies are governed by the privacy policies of the respective third parties.
          </p>
        </section>

        <section className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Settings className="text-orange-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">User control & Browser settings</h2>
          </div>
          <p className="text-slate-400 leading-relaxed mb-4 mx-auto">
            You have the right to decide whether to accept or reject cookies. Most web browsers allow some control of most cookies through the browser settings. 
            To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-accent-purple hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-accent-purple hover:underline">www.allaboutcookies.org</a>.
          </p>
          <p className="text-slate-400 leading-relaxed mx-auto">
            Please note that if you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>
        </section>
      </div>
    </div>
  );
};
