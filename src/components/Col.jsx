import React from "react";


const Col = ({isOver, children}) => {
    const className = isOver ? ' bg-red-100' : '';

    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}

export default Col;