import React from 'react';

function emoji(props) {
    switch(props){
        case 'happy':
            return '😄';
        case 'calm':
            return '😊';
        case 'sad':
            return '😔';
        case 'annoyed':
            return '🤨';
        default:
            return '';
    }
}

const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {emoji(props.symbol)}
    </span>
);
export default Emoji;