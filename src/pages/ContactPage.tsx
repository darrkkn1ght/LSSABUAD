import { Helmet } from 'react-helmet-async';
import { PageHero } from '@/components/shared/PageHero';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function ContactPage() {
  const { settings } = useSiteSettings();

  return (
    <div className="bg-white">
      <Helmet>
        <title>Contact | LSS ABUAD</title>
        <meta name="description" content="Get in touch with the Law Students' Society at Afe Babalola University (LSS ABUAD)." />
      </Helmet>
      
      <PageHero 
        title="Get in Touch" 
        subtitle="Our doors are always open for dialogue and legal discourse." 
        backgroundImage="/hero-bg.jpg"
      />

      <section className="py-24 container relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-primary/[0.01] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <motion.div 
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center"
        >
          <div className="space-y-12">
            <motion.div variants={fadeUp}>
              <h2 className="font-display font-bold text-4xl text-secondary mb-6 leading-tight">
                Connect with the <span className="text-primary italic underline decoration-primary/20 underline-offset-8">Society</span>
              </h2>
              <p className="text-secondary/60 font-body text-lg leading-relaxed max-w-md">
                Whether you have inquiries about membership, events, or legal advocacy, our team is here to assist.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="space-y-6">
              {[
                { icon: Mail, label: 'Email Correspondence', value: settings.contact_email, href: `mailto:${settings.contact_email}` },
                { icon: Phone, label: 'Voice Communication', value: settings.contact_phone, href: `tel:${settings.contact_phone}` },
                { icon: MapPin, label: 'Physical Secretariat', value: settings.contact_address, href: null },
              ].map((item, idx) => item.value && (
                <motion.div 
                  key={idx} 
                  variants={fadeUp}
                  className="glass-panel p-6 rounded-[2rem] border-secondary/5 shadow-lg group hover:bg-secondary hover:text-white transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-white group-hover:text-primary transition-all duration-500">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-ui uppercase tracking-[0.3em] text-secondary/40 group-hover:text-white/40 mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-secondary font-display font-bold text-lg group-hover:text-white transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-secondary font-display font-bold text-lg group-hover:text-white leading-tight">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4 pt-4">
              {[
                { icon: Facebook, link: settings.social_facebook },
                { icon: Twitter, link: settings.social_twitter },
                { icon: Instagram, link: settings.social_instagram },
              ].map((s, i) => s.link && (
                <a 
                  key={i} 
                  href={s.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-12 w-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary/40 hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div 
            variants={fadeUp}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="glass-panel p-12 rounded-[3rem] border-secondary/5 shadow-2xl relative bg-white/40 backdrop-blur-md overflow-hidden">
              <div className="text-center space-y-8 relative z-10">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-bounce">
                  <MessageCircle className="h-10 w-10" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-3xl text-secondary">Office Hours</h3>
                  <div className="h-px w-12 bg-primary/30 mx-auto" />
                  <p className="text-secondary/60 font-body leading-relaxed">
                    Monday — Friday<br />
                    <span className="text-secondary font-bold">09:00 AM - 04:00 PM</span>
                  </p>
                </div>
                <p className="text-xs text-secondary/40 font-ui uppercase tracking-widest pt-8 border-t border-secondary/5">
                  Afe Babalola University, Ado-Ekiti
                </p>
              </div>
            </div>
            
            {/* Action Card */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-8 -right-8 glass-panel p-8 rounded-[2rem] bg-secondary text-white shadow-2xl max-w-[280px] hidden md:block"
            >
              <h4 className="font-display font-bold text-xl mb-4 leading-tight">Want to host an event?</h4>
              <p className="text-white/60 text-sm font-body mb-6">Partner with LSS for workshops, seminars, or legal forums.</p>
              <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-ui text-xs font-bold uppercase tracking-widest py-6">
                Send Proposal <Send className="h-3 w-3 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
