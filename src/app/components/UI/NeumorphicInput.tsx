'use client'

type NeumorphicInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string
}

export const NeumorphicInput = ({ className = "", ...props }: NeumorphicInputProps) => {
    return (
        <input
            {...props}
            className={`neumorphic-input ${className}`}
        />
    )
}