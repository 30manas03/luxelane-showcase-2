import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import heroLuxury from '../assets/hero-image.jpg';

const Hero = () => {
  const { navigateTo } = useApp();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroLuxury}
          alt="Luxury fashion editorial background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 hero-bg opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-primary-foreground text-sm font-medium">
            Luxury Collection 2025
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Discover
          <span className="block text-accent-gradient">
            Timeless Elegance
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Curated luxury fashion and accessories for the discerning individual. 
          Experience sophistication in every detail.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigateTo('products')}
            className="btn-luxury group"
          >
            Shop Collection
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => {
              const featuredSection = document.getElementById('featured-products');
              featuredSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-ghost-luxury"
          >
            Explore Featured
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">100+</div>
            <div className="text-primary-foreground/80 text-sm">Luxury Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">5★</div>
            <div className="text-primary-foreground/80 text-sm">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
            <div className="text-primary-foreground/80 text-sm">Premium Support</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl" />
    </section>
  );
};

export default Hero;