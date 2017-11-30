import React from 'react';

let myImage  = getImg();
export {myImage};

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

            backgroundImage : `url(${myImage})`,
            backgroundSize : '500%',
            width : '160px',
            height : '160px',
            boxShadow : 'inset  1px  1px 2px white, ' +
                        'inset -1px -1px 3px -1px aqua'
        };
        // ostatni kafelek jest pusty i ma numer 14
        if( this.props.myKey === 14 ) {
            style.background = 'transparent';
            style.zIndex = '-2';
            style.boxShadow = 'none';
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

function getImg(){
    let nameArr = [
        '04081_lagoonnebula_800x480.jpg',
        '04086_queenstownfrombobspeak_800x480.jpg',
        '04087_riomaggioreatsunset_800x480.jpg',
        '04088_thebirthplaceofrivendell_800x480.jpg',
        '04089_desertstorm_800x480.jpg',
        '04096_gingerbread_800x480.jpg',
        '04100_incipientdawn_800x480.jpg',
        '04112_grosunset_800x480.jpg',
        '04134_sassolungo_800x480.jpg',
        '04136_therockatrainier_800x480.jpg',
        '04139_thefreshairofsaentismountain_800x480.jpg',
        '04140_coloradobackroad_800x480.jpg'
    ];
    let i = Math.floor( Math.random()*12 );
    return ('../../../img/'+nameArr[i]);
}

