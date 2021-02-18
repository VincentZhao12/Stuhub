import { getAllByAltText } from '@testing-library/react';
import React, { useState } from 'react';
import './UnderlineText.scss';

const UnderlineText = (props) => {
    const selected = {
        textDecoration: "underline",
        textDecorationColor: "#02C39A",
        textDecorationThickness: "2px"
    };

    console.log(props);

    return(
        <a id="line" className="underline" style={props.selected ? {...selected, ...props.style} : props.style} onClick={() => props.onClick()}>{props.children}</a>
    );
}

export default UnderlineText;