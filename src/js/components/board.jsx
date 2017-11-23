import React from 'react';

import myImage from "../../../img/04134_sassolungo_800x480.jpg";
class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tileNumberFromLeft : this.props.tileNumberFromLeft,
            tileNumberFromTop  : this.props.tileNumberFromTop,

            divX : this.props.position.fromLeft * 160,
            divY : this.props.position.fromTop * 160,

            imageStartX : this.props.tileNumberFromLeft * 160,
            imageStartY : this.props.tileNumberFromTop * 160,

            divPositionFromLeft : this.props.position.fromLeft,
            divPositionFromTop  : this.props.position.fromTop,

            myKey : this.props.myKey,
        }
    }

    componentWillReceiveProps(nextProps){

        this.setState({
            tileNumberFromLeft : nextProps.tileNumberFromLeft,
            tileNumberFromTop  : nextProps.tileNumberFromTop,

            divX : nextProps.position.fromLeft * 160,
            divY : nextProps.position.fromTop * 160,

            imageStartX : nextProps.tileNumberFromLeft * 160,
            imageStartY : nextProps.tileNumberFromTop * 160,

            divPositionFromLeft : nextProps.position.fromLeft,
            divPositionFromTop  : nextProps.position.fromTop,

            myKey : this.props.myKey,
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

            backgroundColor : 'aquamarine',
            backgroundImage : `url(${myImage})`,
            backgroundSize : '500%',
            width : '160px',
            height : '160px',
            boxShadow : 'inset  1px  1px 1px 1px white, ' +
                        'inset -1px -1px 1px 1px aquamarine'
        };
        // ostatni kafelek jest pusty i nazywa się 14
        if( this.props.myKey === 14 ) {
            style.background = 'lightgrey';
        }
        return(
            <div style={style} onClick={this.clickOnTile} >
                {/*{this.state.tileNumberFromLeft},*/}
                {/*{this.state.tileNumberFromTop} <br/>*/}
                {/*myKey: {this.state.myKey}*/}
            </div>
        )
    }
}

// *************************************************************************

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            randomPositions: [],
            tilesTab : [],
            emptyPosition: {},
            tilesX: 5,
            tilesY: 3,
        }
    }

    render() {

        let tilesMap = [];
        if( this.state.tilesTab!==undefined && this.state.tilesTab.length!==0 ) {
            tilesMap = this.state.tilesTab.map( tile => {
                return tile;
            })
        }
        return(
            <div className="board" >
                {tilesMap}
            </div>
        )
    }

    componentDidMount() {
        this.generatePool();
    }

    generatePool = (clickedElement) => {

        const tilesTab = [];
        const randomTiles = this.state.randomPositions.length === 0 ? this.randomTilesPosition() : this.state.randomPositions ;
        let emptyPosition = {};

        for(let tileNumberFromTop=0; tileNumberFromTop<this.state.tilesY; tileNumberFromTop++ ){
            for(let tileNumberFromLeft=0; tileNumberFromLeft<this.state.tilesX; tileNumberFromLeft++ ){

                let key = tileNumberFromTop*5 + tileNumberFromLeft;
                let position = randomTiles[key];
                if( key === 14 ) {
                    // Ostatni kafelek będzie pusty
                    // Jego pozycję zapiszemy w state
                    emptyPosition = Object.assign({}, position);
                }

                if( clickedElement !== undefined && key === clickedElement.name ) {

                    position = {
                        fromLeft: clickedElement.left,
                        fromTop: clickedElement.top
                    }
                }

                tilesTab.push(
                    <Tile key={key}
                          tileNumberFromLeft={tileNumberFromLeft}
                          tileNumberFromTop={tileNumberFromTop}
                          position={position}
                          myKey={key}
                          callbackInfo={ this.handleClick }
                    />
                )
            }
        }

        this.setState({
            tilesTab : tilesTab,
            emptyPosition : emptyPosition,
            randomPositions: randomTiles
        })
    };

    randomTilesPosition = () => {
        const randomTiles = [];
        for (let j = 0; j < this.state.tilesY; j++ ) {
            for (let i = 0; i < this.state.tilesX; i++ ) {

                let coordinates = {
                    fromLeft: i,
                    fromTop: j
                };
                randomTiles.push(coordinates);
            }
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i-- ) {
                let j = Math.floor( Math.random() * (i + 1) );
                // podmiana elementów
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        // work on array
        shuffleArray(randomTiles);
        return randomTiles;
    };

    handleClick = (divPositionFromLeft, divPositionFromTop, myKey) => {

        // pusty kafelek
        let emptyX = this.state.emptyPosition.fromLeft;
        let emptyY = this.state.emptyPosition.fromTop;

        // kierunek do pustego kafelka
        const direction = {
            x : emptyX - divPositionFromLeft,
            y : emptyY - divPositionFromTop
        };

        // pusty kafelek powinien być sąsiadem
        if( direction.x === 0 || direction.y === 0 ) {
            if( 1===Math.abs(direction.x) || 1===Math.abs(direction.y) ){

                console.log('To sąsiedni kafelek!');

                // przygotowanie do edycji tablicy z pozycjami
                let newTab = this.state.tilesTab.slice();
                // wewnątrz nowej tablicy
                // kliknięty kafelek otrzyma pozycję "emptyPosition"
                newTab[myKey].props.position.fromLeft = emptyX;
                newTab[myKey].props.position.fromTop  =  emptyY;
                // pusty kafelek otrzyma pozycję klikniętego
                newTab[14].props.position.fromLeft = divPositionFromLeft;
                newTab[14].props.position.fromTop  = divPositionFromTop;

                this.setState({

                    // również "state.emptyPosition" otrzyma pozycję klikniętego
                    emptyPosition : {
                        fromLeft : divPositionFromLeft,
                        fromTop : divPositionFromTop,
                    },
                     // starą tablicę zastąpi nowa tablica
                     tilesTab : newTab
                });

                let kliknietyKafelek =  {
                    left: newTab[myKey].props.position.fromLeft,
                    top: newTab[myKey].props.position.fromTop,
                    name: myKey
                };
                this.generatePool(kliknietyKafelek);

            }
        }
    }
}

export {Board}
