import React from 'react';
import { Link } from 'react-router-dom';

export const BrandLogo = ({ size = 'md' }) => {
  const imgH = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-14' : 'h-11';

  return (
    <Link to="/" className="flex items-center group flex-shrink-0" aria-label="Naik Foods Home">
      {/*
        mix-blend-multiply: multiplies pixel colors with background.
        White navbar (255,255,255) × any color = that color → the pure black
        background of the logo becomes invisible, leaving only the graphic.
        Works perfectly on white / cream backgrounds.
      */}
      <img
        src="/naik-logo.png"
        alt="Naik Foods"
        className={`${imgH} w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200`}
        draggable={false}
      />
    </Link>
  );
};
