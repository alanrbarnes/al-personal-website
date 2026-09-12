import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, LayoutTemplate } from 'lucide-react';
import React from 'react';
import { projects } from '@/data/projects';
import HeroConsole from '../components/home/HeroConsole';



const ProjectPlaceholder = ({ slug }: { slug: string }) => {
  if (slug === 'fullstack-web-app') {
    return (
      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent opacity-10" />
        <LayoutTemplate className="h-16 w-16 text-primary/40" />
      </div>
    );
  }

  if (slug === 'rest-api') {
    return (
      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-muted">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--primary)) 10px, hsl(var(--primary)) 20px)' }} />
        <Database className="h-16 w-16 text-primary/40" />
      </div>
    );
  }
  
  return (
    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-muted">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
      <Code2 className="h-16 w-16 text-primary/40" />
    </div>
  );
};

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <Head title="Home" />
      <div className="bg-background">
        <HeroConsole />

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">Looking for a developer?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-border bg-card p-8"
              >
                <h3 className="mb-3 text-xl font-bold">Building a team?</h3>
                <p className="mb-6 text-muted-foreground">
                  I bring 20 years of engineering discipline — first in manufacturing, now in software — to full-stack roles built on .NET Core, C#, Angular, and React.
                </p>
                <Link href="/resume" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                  See my resume <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-8"
              >
                <h3 className="mb-3 text-xl font-bold">Have a project in mind?</h3>
                <p className="mb-6 text-muted-foreground">
                  I help businesses and individuals ship reliable web applications and APIs — no bloated scope, just software built right the first time.
                </p>
                <Link href="/services" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                  Explore Services <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="mb-4 text-2xl font-bold">From the factory floor to full-stack.</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I spent 20 years in manufacturing and CNC programming before teaching myself C# and JavaScript to automate production workflows. I earned a B.S. in Computer Science while working full-time, and today I build cloud infrastructure, backends, and user interfaces that solve real-world operational problems. Whether you're hiring for a team or need a reliable partner for a one-off project, that same practical, no-wasted-motion approach carries over.
              </p>
            </div>
          </div>
        </section>
  
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold tracking-tight">Featured Work</h2>
                <p className="text-muted-foreground">Recent projects and case studies.</p>
              </div>
              <Link href="/portfolio" className="hidden items-center text-primary hover:underline sm:inline-flex">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <motion.div key={project.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
                  <Link href={`/portfolio/${project.slug}`} className="block"><ProjectPlaceholder slug={project.slug} /></Link>
                  <div className="flex flex-1 flex-col p-6">
                    <Link href={`/portfolio/${project.slug}`} className="block"><h3 className="mb-2 text-xl font-bold group-hover:text-primary">{project.title}</h3></Link>
                    <p className="mb-4 flex-1 text-muted-foreground">{project.shortDescription}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((technology) => <span key={technology} className="rounded bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">{technology}</span>)}
                      {project.tech.length > 3 && <span className="rounded bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">+{project.tech.length - 3}</span>}
                    </div>
                    <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center text-sm font-medium text-primary">Read case study <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 sm:hidden"><Link href="/portfolio" className="inline-flex items-center font-medium text-primary hover:underline">View all projects <ArrowRight className="ml-1 h-4 w-4" /></Link></div>
          </div>
        </section>
  
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <svg className="mx-auto mb-6 h-12 w-12 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" /></svg>
            <blockquote className="mb-8 text-2xl font-medium leading-relaxed">"Alan is someone I can give a job to and he will figure out how to do it no matter what."</blockquote>
            <div className="font-medium"><div className="text-lg">Owner</div><div className="text-primary-foreground/80">Chicago Mold</div></div>
          </div>
        </section>
      </div>
    </>
  );
}