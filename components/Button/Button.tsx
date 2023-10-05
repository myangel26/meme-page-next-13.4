import React, { useEffect, useState } from "react";

type ButtonProps = {
    children: React.ReactNode,
    isLoading?: boolean,
    className?: string,
    type?: "button" | "submit" | "reset",
    colorStroke?: string,
    colorStrokeHover?: string,
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
    isLoading,
    className,
    type,
    children,
    colorStroke,
    colorStrokeHover,
    onClick
}) => {

    const handleMouseHover = (_evt: any) => {
        _evt.stopPropagation();
        setColorLoading(colorStrokeHover);
    }

    const handleMouseLeave = (_evt: any) => {
        _evt.stopPropagation();
        setColorLoading(colorStroke);
    }

    const [colorLoading, setColorLoading] = useState(colorStroke);

    return (
        <>
            <button 
                type={type} 
                className={className}
                onMouseOver={ handleMouseHover }
                onMouseLeave={ handleMouseLeave }
                onClick={ onClick }
                disabled={isLoading}
            >
                {
                    isLoading &&
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="1.3em"
                        height="1.3em"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                    >
                        <circle
                            cx={50}
                            cy={50}
                            fill="none"
                            stroke={ colorLoading }
                            strokeWidth={10}
                            r={35}
                            strokeDasharray="164.93361431346415 56.97787143782138"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                repeatCount="indefinite"
                                dur="1s"
                                values="0 50 50;360 50 50"
                                keyTimes="0;1"
                            />
                        </circle>
                    </svg>
                }
                {
                    !isLoading && 
                    <span style={{ pointerEvents: 'none' }}>{children}</span>
                }
            </button>
        </>
    )
}

Button.defaultProps = {
    colorStroke: '#95d5ee',
    colorStrokeHover: '#de201f'
}

export default Button;