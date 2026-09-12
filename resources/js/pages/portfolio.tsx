import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
import React from 'react';
import { projects } from '@/data/projects';

const ProjectPlaceholder = () => (
  <div className="w-full h-56 bg-muted flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    <Code2 className="w-20 h-20 text-primary/40" />
  </div>
);

export default function Portfolio() {
  return (
    <>
      <Head title="Portfolio" />
      <div className="bg-background pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Portfolio</h1>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A selection of applications, APIs, and tools I've built. My focus is on writing clean, scalable code that solves specific operational problems.
            </p>
          </motion.div>
  
          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <motion.div 
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <Link href={`/portfolio/${project.slug}`} className="block relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10" />
                  <ProjectPlaceholder />
                </Link>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/portfolio/${project.slug}`} className="block">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h2>
                  </Link>
                  
                  <p className="text-muted-foreground mb-6 flex-1 text-lg">
                    {project.shortDescription}
                  </p>
                  
                  <Link 
                    href={`/portfolio/${project.slug}`} 
                    className="inline-flex items-center text-sm font-bold text-primary group-hover:underline"
                  >
                    View full case study <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
  
        </div>
      </div>
    </>
  );
}
