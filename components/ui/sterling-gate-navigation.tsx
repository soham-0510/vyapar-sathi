'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import Link from 'next/link';

// Register GSAP Plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
}

export function SterlingGateNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Create custom easing
    try {
      if (!gsap.parseEase('main')) {
        CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');
        gsap.defaults({ ease: 'main', duration: 0.7 });
      }
    } catch (e) {
      console.warn('CustomEase failed to load, falling back to default.', e);
      gsap.defaults({ ease: 'power2.out', duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll('.menu-list-item[data-shape]');
      const shapesContainer = containerRef.current!.querySelector('.ambient-background-shapes');

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute('data-shape');
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;

        if (!shape) return;

        const shapeEls = shape.querySelectorAll('.shape-element');

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll('.bg-shape').forEach((s) => s.classList.remove('active'));
          }
          shape.classList.add('active');

          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)', overwrite: 'auto' }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => shape.classList.remove('active'),
            overwrite: 'auto',
          });
        };

        item.addEventListener('mouseenter', onEnter);
        item.addEventListener('mouseleave', onLeave);

        (item as any)._cleanup = () => {
          item.removeEventListener('mouseenter', onEnter);
          item.removeEventListener('mouseleave', onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll('.menu-list-item[data-shape]');
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector('.nav-overlay-wrapper');
      const menu = containerRef.current!.querySelector('.menu-content');
      const overlay = containerRef.current!.querySelector('.overlay');
      const bgPanels = containerRef.current!.querySelectorAll('.backdrop-layer');
      const menuLinks = containerRef.current!.querySelectorAll('.nav-link');
      const fadeTargets = containerRef.current!.querySelectorAll('[data-menu-fade]');
      const menuButton = containerRef.current!.querySelector('.nav-close-btn');
      const menuButtonTexts = menuButton?.querySelectorAll('p');
      const menuButtonIcon = menuButton?.querySelector('.menu-button-icon');

      const tl = gsap.timeline();

      if (isMenuOpen) {
        // OPEN
        if (navWrap) navWrap.setAttribute('data-nav', 'open');

        tl.set(navWrap, { display: 'block' })
          .set(menu, { xPercent: 0 }, '<')
          .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
          .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, '<')
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, '<')
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, '<+=0.35');

        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: 'all' }, '<+=0.2');
        }
      } else {
        // CLOSE
        if (navWrap) navWrap.setAttribute('data-nav', 'closed');

        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, '<')
          .to(menuButtonTexts, { yPercent: 0 }, '<')
          .to(menuButtonIcon, { rotate: 0 }, '<')
          .set(navWrap, { display: 'none' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', index: 0 },
    { label: 'Resources', href: '/resources', index: 1 },
    { label: 'Payments', href: '/payments', index: 2 },
    { label: 'Staff', href: '/staff', index: 3 },
    { label: 'Suppliers', href: '/suppliers', index: 4 },
  ];

  return (
    <div ref={containerRef} className="sterling-gate-nav">
      {/* Menu Button */}
      <button onClick={toggleMenu} className="nav-close-btn fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        <span className="menu-button-icon">☰</span>
        <div className="flex flex-col overflow-hidden">
          <p>Menu</p>
          <p>Close</p>
        </div>
      </button>

      {/* Overlay */}
      <div className="overlay fixed inset-0 bg-black/50 opacity-0 pointer-events-none z-40" style={{ display: 'none' }} onClick={closeMenu} />

      {/* Navigation Wrapper */}
      <div className="nav-overlay-wrapper fixed inset-0 z-40 pointer-events-none" data-nav="closed" style={{ display: 'none' }}>
        <div className="menu-content fixed inset-0 pointer-events-auto">
          {/* Background Panels */}
          <div className="absolute inset-0">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="backdrop-layer absolute inset-0 bg-background/95" style={{ transform: 'translateX(101%)' }} />
            ))}
          </div>

          {/* Abstract shapes container */}
          <div className="ambient-background-shapes absolute inset-0 pointer-events-none">
            {menuItems.map((item) => (
              <div key={item.index} className={`bg-shape bg-shape-${item.index} absolute inset-0`}>
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="shape-element absolute rounded-full bg-primary/10"
                    style={{
                      width: `${100 + j * 50}px`,
                      height: `${100 + j * 50}px`,
                      left: `${20 + j * 15}%`,
                      top: `${30 + j * 20}%`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Menu Links */}
          <nav className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16">
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <li
                  key={item.index}
                  className="menu-list-item"
                  data-shape={item.index}
                  onMouseEnter={() => {
                    // Hover effect handled by GSAP
                  }}
                  onMouseLeave={() => {
                    // Hover effect handled by GSAP
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="nav-link text-4xl md:text-6xl font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Additional Links */}
            <div className="mt-12 pt-8 border-t border-border space-y-3" data-menu-fade>
              <Link href="/ai-assistant" onClick={closeMenu} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                AI Assistant
              </Link>
              <Link href="/dead-stock" onClick={closeMenu} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Dead Stock
              </Link>
              <Link href="/settings" onClick={closeMenu} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Settings
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
