import React from 'react';
import {Header} from './header.jsx';
import {Footer} from './footer.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div>

                <Header />

                <div className="container">
                    <div className="tile">1</div>
                    <div className="tile">2</div>
                    <div className="tile">3</div>
                    <div className="tile">4</div>
                    <div className="tile">5</div>
                    <div className="tile">6</div>
                    <div className="tile">7</div>
                    <div className="tile">8</div>
                    <div className="tile">9</div>
                    <div className="tile">10</div>
                    <div className="tile">11</div>
                    <div className="tile">12</div>
                    <div className="tile">13</div>
                    <div className="tile">14</div>
                    <div className="tile fifteen">15</div>
                </div>

                <Footer />

            </div>
        )
    }
}

export {App}
