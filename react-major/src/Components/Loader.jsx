import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ 
  size = 'medium', 
  fullScreen = false,
  color = '#3b82f6'
}) => {
  // Determine size class
  const sizeClass = 
    size === 'small' ? styles.loaderSmall :
    size === 'large' ? styles.loaderLarge : 
    styles.loaderMedium;

  // Create inline style for custom color
  const customStyle = { 
    borderTopColor: color,
    borderLeftColor: color 
  };

  // Container class
  const containerClass = fullScreen 
    ? styles.fullScreenContainer 
    : styles.loaderContainer;

  return (
    <div className={containerClass} role="alert" aria-busy="true">
      <div 
        className={`${styles.loader} ${sizeClass}`}
        style={customStyle}
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader;
