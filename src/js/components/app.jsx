import React from 'react';

import {Header} from './header.jsx';
import {Board}  from './board.jsx';
import {Footer} from './footer.jsx';
import {About} from './about.jsx';
import {myImage} from './tile.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div className="app" style={{backgroundImage: `url(${myImage})`}}>
                <Header />
                <Board  />
                <Footer />
            </div>
        )
    }

}

export {App}
