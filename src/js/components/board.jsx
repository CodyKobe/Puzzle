import React from 'react';

import myImage from "../../../img/04134_sassolungo_800x480.jpg";
class Tile extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tileNumberFromLeft : this.props.i,
            tileNumberFromTop  : this.props.j,

            divX : this.props.position.m * 160,
            divY : this.props.position.n * 160,

            imageStartX : this.props.i * 160,
            imageStartY : this.props.j * 160,

            myKey : this.props.myKey,
        };

    }

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
            <div style={style}
                 className="tile"
            >
                {this.state.tileNumberFromLeft}
                ,&nbsp;
                {this.state.tileNumberFromTop}
            </div>
        )
    }
}
// -----
class Board extends React.Component{
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
            }
        }
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
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        // work on object
        shuffleArray(randomTiles);
        return randomTiles;
    };

    handleClick = () => {
        console.log('działa!');
    };

    render(){

        const tilesTab = [];
        const randomTiles = this.randomTilesPosition();

        for(let i = 0; i<this.state.tilesX; i++ ){
            for(let j = 0; j<this.state.tilesY; j++ ){

                let key = i*3+j;
                let position = randomTiles[key];
                let empty = false;
                if( key === 14 ) empty = true;

                tilesTab.push(
                    <Tile key={key} i={i} j={j}
                          position={position}
                          empty={empty} myKey={key}
                          onClick={ this.handleClick }  />
                )
            }
        }

        let crossTheBorder = (tileX, tileY) => {
            if( tileX<0||tileX>=5||tileY<0||tileY>=3 )
                return true;
            return false;
        };

        const tilesMap = tilesTab.map( tile => {
            return tile;
        });

        return(
            <div className="board" style={this.state.style}>
                {tilesMap}
            </div>
        )
    }
}
export {Board}
