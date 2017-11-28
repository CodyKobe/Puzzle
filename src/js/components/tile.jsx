import React from 'react';

import myImage from "../../../img/04134_sassolungo_800x480.jpg";

class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            divPositionFromLeft : this.props.position.fromLeft,
            divPositionFromTop  : this.props.position.fromTop,

            divX : this.props.position.fromLeft * 160,
            divY : this.props.position.fromTop  * 160,

            myKey : this.props.myKey,

            tileNumberFromLeft : this.props.tileNumberFromLeft,
            tileNumberFromTop  : this.props.tileNumberFromTop,

            imageStartX : this.props.tileNumberFromLeft * 160,
            imageStartY : this.props.tileNumberFromTop  * 160,
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            divPositionFromLeft : nextProps.position.fromLeft,
            divPositionFromTop  : nextProps.position.fromTop,

            divX : nextProps.position.fromLeft * 160,
            divY : nextProps.position.fromTop  * 160,

            myKey : nextProps.myKey,

            tileNumberFromLeft : nextProps.tileNumberFromLeft,
            tileNumberFromTop  : nextProps.tileNumberFromTop,

            imageStartX : nextProps.tileNumberFromLeft * 160,
            imageStartY : nextProps.tileNumberFromTop  * 160,
        })
    }

    clickOnTile = () => {
        if( typeof this.props.callbackInfo === 'function' ) {
            this.props.callbackInfo(
                this.state.divPositionFromLeft,
                this.state.divPositionFromTop,
                this.state.myKey
            )
        }
    };

    render(){
        let style = {
            position : 'absolute',

            left : this.state.divX,
            top  : this.state.divY,

            backgroundPositionX : -this.state.imageStartX,
            backgroundPositionY : -this.state.imageStartY,

            backgroundColor : 'aqua',
            backgroundImage : `url(${myImage})`,
            backgroundSize : '500%',
            width : '160px',
            height : '160px',
            boxShadow : 'inset  1px  1px 3px white, ' +
            'inset -1px -1px 3px aqua'
        };
        // ostatni kafelek jest pusty i ma numer 14
        if( this.props.myKey === 14 ) {
            style.background = 'transparent';
            style.zIndex = '-2'
        }
        return(
            <div className="tile" style={style} onClick={this.clickOnTile} >
                {/*{this.state.tileNumberFromLeft},*/}
                {/*{this.state.tileNumberFromTop} <br/>*/}
                {/*myKey: {this.state.myKey}*/}
            </div>
        )
    }
}

export {Tile}
