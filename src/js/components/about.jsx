import React from 'react';

import myImage from "../../../img/04134_sassolungo_800x480.jpg";

class About extends React.Component{
    render(){
        return <div> 
            O nas 
            <p>
                Nie podoba mi się twój bihejwior, zapomnij o urlopach
                i podwyżkach, ale jak coś to wiesz, zawsze możesz kupić
                sobie kota. Ciężka sprawa, bo kołczing to coś, czego wam trzeba,
                dlatego zapomnijmy na chwilę o gajdlajnsach i zróbmy to po swojemu.
                ASAP. Nie mamy akceptu, czlendż jest taki pasjonujący, dlatego
                trzeba obrać nowy target. Zresztą chyba czytałeś w njusleterze:
                będziesz lidował w tym projekcie.
            </p>

            <div style={
                {
                    backgroundImage: `url(${myImage})`,
                    backgroundSize: '500%',
                    height: '160px',
                    width: '160px',
                    backgroundPositionX: '0px',
                    backgroundPositionY: '0px',
                }
            }>
            </div>

            <div style={
                {
                    backgroundImage: `url("./img/04134_sassolungo_800x480.jpg")`,
                    backgroundSize: '500%',
                    height: '160px',
                    width: '160px',
                    backgroundPositionX: '0px',
                    backgroundPositionY: '-160px',
                }
            }>
            </div>

            <div className="monsterOne" > </div>
        </div>;
    }
}

export {About}
