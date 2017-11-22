import React from 'react';

import myImage from "../../../img/04134_sassolungo_800x480.jpg";
class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tileNumberFromLeft : this.props.tileNumberFromLeft,
            tileNumberFromTop  : this.props.tileNumberFromTop,

            divX : this.props.position.m * 160,
            divY : this.props.position.n * 160,

            imageStartX : this.props.tileNumberFromLeft * 160,
            imageStartY : this.props.tileNumberFromTop * 160,

            divPositionFromLeft : this.props.position.m,
            divPositionFromTop  : this.props.position.n,

            myKey : this.props.myKey,
        };

    }
    clickOnTile = () => {
        if ( typeof this.props.callbackInfo === 'function' ) {
            this.props.callbackInfo(this.state.divPositionFromLeft, this.state.divPositionFromTop);
        }
    };
    render(){
        let style = {
            position : 'absolute',

            left : this.state.divX,
            top  : this.state.divY,

            backgroundPositionX : -this.state.imageStartX,
            backgroundPositionY : -this.state.imageStartY,

            backgroundColor : 'aquamarine',
            backgroundImage : `url(${myImage})`,
            backgroundSize : '500%',
            width : '160px',
            height : '160px',
            boxShadow : 'inset  1px  1px 1px 1px white, ' +
                        'inset -1px -1px 1px 1px aquamarine',
        };

        if( this.props.empty === true ) {
            style.background = 'grey';
        }
        return(
            <div style={style} className="tile" onClick={this.clickOnTile} >
                {this.state.tileNumberFromLeft}
                ,&nbsp;
                {this.state.tileNumberFromTop}
            </div>
        )
    }
}
// *****************************************************

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            var: 'value',
            numberOfTiles: 14,

            top: 0,
            left: 0,

            tilesX: 5,
            tilesY: 3,

            style: {
                position: 'relative'
            },

            tilesTab : [],
            emptyPosition: {}
        };
    }

    componentDidMount() {
        this.generatePool();
    }

    randomTilesPosition = () => {
        const randomTiles = [];
        for (let i = 0; i < this.state.tilesX; i++) {
            for (let j = 0; j < this.state.tilesY; j++) {

                let coordinates = {
                    m: i,
                    n: j
                };
                randomTiles.push(coordinates);
            }
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                // podmiana elementów
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        // work on object
        shuffleArray(randomTiles);
        return randomTiles;
    };

    handleClick = (responseX, responseY) => {

        let emptyX = this.state.emptyPosition.m;
        let emptyY = this.state.emptyPosition.n;

        const direction = {
            x : emptyX-responseX,
            y : emptyY-responseY
        };

        if( direction.x === 0 || direction.y === 0 ) {
            console.log('poprawna kolumna lub wiersz');
            if( 1===Math.abs(direction.y) || 1===Math.abs(direction.x) ){
                console.log('to sąsiednie pole!');

                console.log(this.state.tilesTab)

                // this.setState({
                //     emptyPosition : {
                //         m: responseX,
                //         n: responseY,
                //     }
                // })

            }
        }

    };

    crossTheBorder = (tileX, tileY) => {
        if( tileX<0 || tileX>=5 || tileY<0 || tileY>=3 )
            return true;
        return false;
    };

    generatePool = () => {

        const tilesTab = [];
        const randomTiles = this.randomTilesPosition();
        let emptyPosition = {};

        for(let tileNumberFromLeft = 0; tileNumberFromLeft<this.state.tilesX; tileNumberFromLeft++ ){
            for(let tileNumberFromTop = 0; tileNumberFromTop<this.state.tilesY; tileNumberFromTop++ ){

                let key = tileNumberFromLeft*3+tileNumberFromTop;
                let position = randomTiles[key];
                let empty = false;
                if( key === 14 ) {
                    empty = true;
                    emptyPosition = position;
                }

                tilesTab.push(
                    <Tile key={key} tileNumberFromLeft={tileNumberFromLeft} tileNumberFromTop={tileNumberFromTop}
                          position={position}
                          empty={empty} myKey={key}
                          callbackInfo={ this.handleClick }
                    />
                )
            }
        }
        this.setState({
            tilesTab : tilesTab,
            emptyPosition : emptyPosition
        });

    };

    render(){

        let tilesMap;
        if( this.state.tilesTab!=undefined && this.state.tilesTab.length!=0 ) {
            tilesMap = this.state.tilesTab.map( tile => {
                return tile;
            });
        }

        return(
            <div className="board" style={this.state.style} >
                {tilesMap}
            </div>
        )
    }
}
export {Board}
