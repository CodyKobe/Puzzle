import React from 'react';

import {Tile} from './tile.jsx';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // tablica z komponentami
            tilesTab : [],
            // pozycja pustego kafelka
            emptyPosition : {},
            // tablica 15 koordynatów
            randomizedTilesPositions: []
        }
    }

    render() {
        let tilesMap;
        if( this.state.tilesTab!==undefined && this.state.tilesTab.length!==0 ){
            tilesMap = this.state.tilesTab.map( tile => tile );
        }
        return(
            <div className="board">
                {tilesMap}
            </div>
        )
    }
    // -------------------------------------------------------------------------
    componentDidMount() {
        this.generateBoard();
    }
    // -------------------------------------------------------------------------

    generateBoard = () => {

        let randomTilesPositions = this.randomPositions() ;
        const tilesTab = [];
        let emptyPosition = {};

        for(let tileNumberFromTop=0; tileNumberFromTop<3; tileNumberFromTop++ ){
            for(let tileNumberFromLeft=0; tileNumberFromLeft<5; tileNumberFromLeft++ ){

                let key = tileNumberFromTop*5 + tileNumberFromLeft;
                let position = randomTilesPositions[key];
                if( key === 14 ) {
                    // Ostatni kafelek będzie pusty
                    // Jego pozycję zapiszemy w state
                    emptyPosition = Object.assign( {}, position );
                }

                tilesTab.push(
                    <Tile key = { key }
                          tileNumberFromLeft = { tileNumberFromLeft }
                          tileNumberFromTop  = { tileNumberFromTop }
                          position = { position }
                          myKey = { key }
                          callbackInfo = { this.handleClick }
                    />
                )
            }
        }
        this.setState({
            tilesTab : tilesTab,
            emptyPosition : emptyPosition,
            randomizedTilesPositions : randomTilesPositions
        })
    };
    // -------------------------------------------------------------------------

    refreshBoard = (clickedTile, oldEmpty) => {

        const tilesTab = [];
        let newPositions = [];
        const randomizedTilesPositions = this.state.randomizedTilesPositions ;

        for(let tileNumberFromTop=0; tileNumberFromTop<3; tileNumberFromTop++ ){
            for(let tileNumberFromLeft=0; tileNumberFromLeft<5; tileNumberFromLeft++ ){

                let key = tileNumberFromTop*5 + tileNumberFromLeft;
                let position = randomizedTilesPositions[key];

                if( key === clickedTile.key ) {
                    position = {
                        fromLeft : oldEmpty.left,
                        fromTop  : oldEmpty.top
                    }
                }
                // oldEmpty.key zawsze wynosi 14
                if( key === oldEmpty.key ) {
                    position = {
                        fromLeft : clickedTile.left,
                        fromTop  : clickedTile.top
                    }
                }
                newPositions.push(position);

                tilesTab.push(
                    <Tile key={ key }
                          tileNumberFromLeft = { tileNumberFromLeft }
                          tileNumberFromTop  = { tileNumberFromTop }
                          position = { position }
                          myKey = { key }
                          callbackInfo = { this.handleClick }
                    />
                )
            }
        }
        return {
            tiles : tilesTab,
            newPositions : newPositions
        }
    };
    // -------------------------------------------------------------------------

    // funkcja wywoływana na początku funkcji generateBoard
    randomPositions = () => {
        const randomCoordinates = [];
        for (let j=0; j<3; j++ ) {
            for (let i=0; i<5; i++ ) {

                let coordinates = {
                    fromLeft: i,
                    fromTop: j
                };
                randomCoordinates.push(coordinates);
            }
        }
        function shuffleArray(array) {
            for(let i=array.length-1; i>0; i-- ) {
                let j = Math.floor( Math.random()*(i+1) );
                // podmiana elementów
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        // work on array
        shuffleArray(randomCoordinates);
        return randomCoordinates;
    };
    // -------------------------------------------------------------------------

    handleClick = ( divPositionFromLeft, divPositionFromTop, clickedKey ) => {

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
                // kliknięty kafelek przesunie się na pozycję ze "state.emptyPosition"
                newTab[clickedKey].props.position.fromLeft = emptyX;
                newTab[clickedKey].props.position.fromTop  = emptyY;
                // 14 - pusty kafelek - otrzyma pozycję klikniętego
                newTab[14].props.position.fromLeft = divPositionFromLeft;
                newTab[14].props.position.fromTop  = divPositionFromTop;

                let clickedTile = {
                    left: divPositionFromLeft,
                    top: divPositionFromTop,
                    key: clickedKey
                };
                let oldEmpty = {
                    left: emptyX,
                    top: emptyY,
                    key: 14
                };

                let elem = this.refreshBoard( clickedTile, oldEmpty );

                this.setState({

                    // "state.emptyPosition" otrzyma pozycję klikniętego kafelka
                    emptyPosition : {
                        fromLeft : divPositionFromLeft,
                        fromTop  : divPositionFromTop,
                    },
                    // stare tablice zastąpią nowe tablice
                    tilesTab : elem.tiles,
                    randomizedTilesPositions : elem.newPositions
                })
            }
        }
    }
}

export {Board}
