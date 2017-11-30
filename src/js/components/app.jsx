import React from 'react';

import {Header} from './header.jsx';
import {Board}  from './board.jsx';
import {Footer} from './footer.jsx';
import {Background} from './background.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div className="global">
                <Header />
                <Board />
                <Footer />
                <Background />
            </div>
        )
    }
}

export {App}
