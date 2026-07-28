import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    
    // Mapeamento visual das variantes do botão
    const variantClasses = {
      default: "", // Herda a classe padrão passada por você nas páginas
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-white/10 bg-transparent hover:bg-white/5",
      secondary: "bg-white/10 text-white hover:bg-white/20",
      ghost: "hover:bg-white/10 hover:text-white bg-transparent",
      link: "underline-offset-4 hover:underline text-yellow-500",
    };

    // Mapeamento visual dos tamanhos
    const sizeClasses = {
      default: "",
      sm: "h-9 px-3 text-xs",
      lg: "h-11 px-8 text-lg",
      icon: "h-10 w-10 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };