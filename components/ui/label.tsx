import React from 'react';

const Label: React.FC<{
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ htmlFor, children, className = '' }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      style={{ backgroundColor: '#ffffff', color: '#000000' }}
    >
      {children}
    </label>
  );
};

export default Label;