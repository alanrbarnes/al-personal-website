import { Mail, Linkedin } from 'lucide-react';
import React from 'react';
import { SiGithub } from 'react-icons/si';


export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-foreground block">Alan Barnes</span>
            <span className="text-sm text-muted-foreground">Full-Stack Software Engineer</span>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/alanrbarnes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <SiGithub className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com/in/alanrbarnes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="mailto:alanbarnes447@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Alan Barnes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
