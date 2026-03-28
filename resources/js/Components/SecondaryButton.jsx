export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center px-6 py-3 bg-white border-2 border-retro-purple rounded-lg font-bold text-retro-purple uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(77,43,140,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-retro-pink focus:ring-offset-2 transition-all duration-150 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
