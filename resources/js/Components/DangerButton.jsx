export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-6 py-3 bg-red-600 border-2 border-red-700 rounded-lg font-bold text-white uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(153,27,27,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
