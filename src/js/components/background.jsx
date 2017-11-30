import React from 'react';

import {myImage} from './tile.jsx';

class Background extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        let style = {
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundImage: `url(${myImage})`,
            width: '100vw',
            height: '100vh'
        };

        return(
            <div style={style} className="background">
            </div>
        )
    }
}

export {Background}
