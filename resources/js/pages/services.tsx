import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Layout, Server, Settings, ArrowRight, MessageSquare, FileText, Code2, Rocket } from 'lucide-react';
import React from 'react';


export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <Head title="Services" />
      <div className="bg-background pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Freelance Services</h1>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I help small businesses and individuals build reliable, high-performance web solutions. No jargon, no bloated scope—just robust software built right the first time.
            </p>
          </motion.div>
  
          {/* What I Build */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-3xl font-bold mb-10">What I Build</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <Layout className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">Custom Websites</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fast, responsive, and accessible static sites or CMS-backed marketing pages designed to convert visitors and load instantly.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <Server className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">Web Applications</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Full-stack applications with user authentication, databases, and dynamic interfaces using React and Node.js or .NET.
                </p>
              </motion.div>
  
              <motion.div variants={itemVariants} className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <Settings className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">Internal Tools</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Custom dashboards, API integrations, and workflow automation scripts to replace spreadsheets and save your team hours.
                </p>
              </motion.div>
            </div>
          </motion.section>
  
          {/* How I Work */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24 bg-muted/30 rounded-2xl p-8 sm:p-12 border border-border"
          >
            <h2 className="text-3xl font-bold mb-10 text-center">How I Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div variants={itemVariants} className="text-center relative">
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4 text-primary-foreground shadow-lg">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-lg mb-2">1. Discovery</h4>
                <p className="text-sm text-muted-foreground">A brief call to understand your problem and define goals.</p>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border"></div>
              </motion.div>
  
              <motion.div variants={itemVariants} className="text-center relative">
                <div className="w-16 h-16 mx-auto bg-card border-2 border-primary rounded-full flex items-center justify-center mb-4 text-primary">
                  <FileText className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-lg mb-2">2. Proposal</h4>
                <p className="text-sm text-muted-foreground">Clear timeline, transparent pricing, and technical approach.</p>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border"></div>
              </motion.div>
  
              <motion.div variants={itemVariants} className="text-center relative">
                <div className="w-16 h-16 mx-auto bg-card border-2 border-primary rounded-full flex items-center justify-center mb-4 text-primary">
                  <Code2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-lg mb-2">3. Build</h4>
                <p className="text-sm text-muted-foreground">Writing the code with regular progress updates.</p>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border"></div>
              </motion.div>
  
              <motion.div variants={itemVariants} className="text-center">
                <div className="w-16 h-16 mx-auto bg-card border-2 border-primary rounded-full flex items-center justify-center mb-4 text-primary">
                  <Rocket className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-lg mb-2">4. Launch</h4>
                <p className="text-sm text-muted-foreground">Deployment, testing, and comprehensive handoff.</p>
              </motion.div>
            </div>
          </motion.section>
  
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center bg-primary rounded-2xl p-12 text-primary-foreground"
          >
            <h2 className="text-3xl font-bold mb-4">Have a project in mind?</h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Every project gets scoped individually — reach out and I'll put together a proposal with a clear timeline and pricing based on what you actually need.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground rounded-md text-base font-bold text-primary bg-primary-foreground hover:bg-transparent hover:text-primary-foreground transition-colors shadow-sm"
            >
              Start a Conversation <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
  
        </div>
      </div>
    </>
  );
}
