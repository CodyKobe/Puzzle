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
        if( typeof this.props.callbackInfo === 'function' ) {
            this.props.callbackInfo(
                this.state.divPositionFromLeft,
                this.state.divPositionFromTop,
                this.state.myKey
            );
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

        if( this.props.position.m === this.props.empty.m &&
            this.props.position.n === this.props.empty.n ) {
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

            tilesTab : [],
            emptyPosition: {},
            tilesX: 5,
            tilesY: 3
        }
    }

    componentDidMount() {
        this.generatePool();
    }

    randomTilesPosition = () => {
        const randomTiles = [];
        for (let j = 0; j < this.state.tilesY; j++) {
            for (let i = 0; i < this.state.tilesX; i++) {

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

    handleClick = (divPositionFromLeft, divPositionFromTop, myKey) => {

        let emptyX = this.state.emptyPosition.m;
        let emptyY = this.state.emptyPosition.n;

        const direction = {
            x : emptyX-divPositionFromLeft,
            y : emptyY-divPositionFromTop
        };
        
        if( direction.x === 0 || direction.y === 0 ) {
            if( 1===Math.abs(direction.y) || 1===Math.abs(direction.x) ){
                console.log('to sąsiednie pole');

                let newTab = this.state.tilesTab.slice();

                newTab[myKey].props.position.m = emptyX;
                newTab[myKey].props.position.n = emptyY;

                console.log(this.state.tilesTab);
                 console.log(myKey);
                console.log(newTab);
                //
                // this.setState({
                //     emptyPosition: {
                //         m: divPositionFromLeft,
                //         n: divPositionFromTop,
                //     },
                //     tilesTab : newTab
                // })
            }
        }
    };

    generatePool = () => {

        const tilesTab = [];
        const randomTiles = this.randomTilesPosition();
        let emptyPosition = {};

            for(let tileNumberFromTop=0; tileNumberFromTop<this.state.tilesY; tileNumberFromTop++ ){
                for(let tileNumberFromLeft=0; tileNumberFromLeft<this.state.tilesX; tileNumberFromLeft++ ){

                let key = tileNumberFromTop*5 + tileNumberFromLeft;
                let position = randomTiles[key];
                if( key === 14 ) {
                    emptyPosition = Object.assign({}, position);
                }

                tilesTab.push(
                    <Tile key={key}
                          tileNumberFromLeft={tileNumberFromLeft}
                          tileNumberFromTop={tileNumberFromTop}
                          position={position}
                          myKey={key}
                          empty={emptyPosition}
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
        if(this.state.tilesTab!=undefined && this.state.tilesTab.length!=0){
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
