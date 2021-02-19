import React, { useState } from 'react';
import './UnderlineText.scss';

const UnderlineText = (props) => {
    const selected = {
        textDecoration: "underline",
        textDecorationColor: "#02C39A",
        textDecorationThickness: "2px"
    };
    const [style, setStyle] = useState({});

    function handleClick() {
        setStyle(selected);
    }

    return(
        <a id="line" className="underline" style={props.selected ? {...selected, ...props.style} : {...props.style, textDecoration: "none"}} onClick={props.onClick ? () => props.onClick() : handleClick}>{props.children}</a>
    );
}

export default UnderlineText;