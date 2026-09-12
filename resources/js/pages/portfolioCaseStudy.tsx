import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Target, UserSquare2 } from 'lucide-react';
import React from 'react';

import { projects } from '@/data/projects';
import NotFound from './not-found';

export default function PortfolioCaseStudy({ slug }: { slug: string }) {
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-background pt-16 pb-24">
      <Head title={project.title} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link href="/portfolio" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Portfolio
          </Link>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {project.shortDescription}
            </p>
            
            {/* Links & Tech Stack */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-10 border-b border-border">
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="mr-2 w-4 h-4" /> Live Site
                  </a>
                )}
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground bg-card hover:bg-accent transition-colors"
                  >
                    <Github className="mr-2 w-4 h-4" /> Source Code
                  </a>
                )}
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-border"></div>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-12">
            
            <motion.section variants={itemVariants} className="bg-card rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                The Problem
              </h2>
              <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                <p>{project.problem}</p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="bg-card rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UserSquare2 className="w-6 h-6 text-primary" />
                My Role
              </h2>
              <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                <p>{project.role}</p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="bg-card rounded-xl p-8 border border-border border-l-4 border-l-primary">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                The Outcome
              </h2>
              <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                <p>{project.outcome}</p>
              </div>
            </motion.section>

          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
