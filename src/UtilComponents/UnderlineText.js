import { getAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import './UnderlineText.scss';

const UnderlineText = (props) => {
    const selected = {
        textDecoration: "underline",
        textDecorationColor: "#02C39A",
        textDecorationThickness: "2px"
    };

    const [style, setStyle] = useState({});

    function handleClick(e) {
        setStyle(selected);
    }

    return(
        <a id="line" className="underline" style={{...style, ...props.style}} onMouseUp={handleClick}>{props.children}</a>
    );
}

export default UnderlineText;