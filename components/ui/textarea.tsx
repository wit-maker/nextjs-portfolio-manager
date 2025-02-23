import React from 'react';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`
        flex min-h-[80px] w-full rounded-md border border-[#e0e0e0] 
        bg-white dark:bg-[#1a1a1a] 
        px-3 py-2 text-sm 
        placeholder:text-[#666666] 
        focus:outline-none focus:ring-2 focus:ring-[#c5a572] 
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;