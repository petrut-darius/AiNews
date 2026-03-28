export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-6 py-3 bg-retro-purple border-2 border-retro-purple rounded-lg font-bold text-white uppercase tracking-widest hover:bg-retro-pink hover:border-retro-pink active:bg-retro-purple focus:outline-none focus:ring-2 focus:ring-retro-pink focus:ring-offset-2 transition-all duration-150 shadow-[4px_4px_0px_0px_rgba(238,167,39,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
