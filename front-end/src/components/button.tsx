import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";



const buttonVariants = tv({
    base: 'px-5 font-medium flex items-center justify-center gap-2 rounded-lg',
    variants: {
        variant: {
            primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
        },
        size: {
            default: 'py-2',
            full: 'w-full h-11' 
        },
    },

    defaultVariants: {
        variant: 'primary',
        size: 'default'
    }
});

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    children: ReactNode // passar conteudo para um componente como propriedade - tipado
}

export function Button({ children, variant, size, ...buttonProps}: ButtonProps) {
    // lib tailwind-variant para controlar as classes de forma dinâmica 

    return (

        <button {...buttonProps}
                className={buttonVariants({ variant, size })}>
            {children}
        </button>
    );
}