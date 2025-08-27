import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer: React.FC = () => {
  const { navigateTo } = useApp();
  return (
    <footer className="border-t border-border bg-background/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient">LuxeLane</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">Curated luxury fashion and accessories for the discerning individual.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => navigateTo('products')} className="hover:text-accent">All Products</button></li>
              <li><button onClick={() => navigateTo('home')} className="hover:text-accent">Featured</button></li>
              <li><button onClick={() => navigateTo('home')} className="hover:text-accent">Categories</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a className="hover:text-accent" href="#about">About</a></li>
              <li><a className="hover:text-accent" href="#careers">Careers</a></li>
              <li><a className="hover:text-accent" href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Follow</h4>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a aria-label="Instagram" href="#" className="p-2 rounded-lg bg-muted hover:bg-muted-dark"><Instagram className="h-5 w-5" /></a>
              <a aria-label="Twitter" href="#" className="p-2 rounded-lg bg-muted hover:bg-muted-dark"><Twitter className="h-5 w-5" /></a>
              <a aria-label="Facebook" href="#" className="p-2 rounded-lg bg-muted hover:bg-muted-dark"><Facebook className="h-5 w-5" /></a>
              <a aria-label="LinkedIn" href="#" className="p-2 rounded-lg bg-muted hover:bg-muted-dark"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-xs text-muted-foreground">© {new Date().getFullYear()} LuxeLane. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;


