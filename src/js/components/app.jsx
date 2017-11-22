import React from 'react';

import {Header} from './header.jsx';
import {Board}  from './board.jsx';
import {Footer} from './footer.jsx';

import {About} from './about.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div>
                <Header />
                <Board  />
                <Footer />
            </div>
        )
    }

}

export {App}
