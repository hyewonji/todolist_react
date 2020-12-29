import React, { Component } from 'react';
import './Palette.css';

class Palette extends Component {
    render() {
        const { color, onColorClick } = this.props;
        const style = {
            background: color
        }
        return (
            <div className="palette" >
                <div className="0" onClick={onColorClick}></div>
                <div className="1" onClick={onColorClick}></div>
                <div className="2" onClick={onColorClick}></div>
                <div className="3" onClick={onColorClick}></div>
            </div>
        )
    }
}

export default Palette;