import React, { Component } from 'react';
import './Palette.css';

class Palette extends Component {
    render() {
        return (
            <div className="palette" >
                <div className="black" onClick=""></div>
                <div className="red"></div>
                <div className="green"></div>
                <div className="blue"></div>
            </div>
        )
    }
}

export default Palette;