type NeumorphicButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
};

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
    children,
    onClick,
    type = "button",
    className = "",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`neumorphic-button ${className}`}
        >
            <div className="outer w-full">
                <div className="inner w-full">
                    <span className="block text-center w-full">{children}</span>
                </div>
            </div>
        </button>
    );
};
