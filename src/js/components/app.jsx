import React from 'react';
import {Header} from './header.jsx';
import {About} from './footer.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div class="container">
                <div class="tile">1</div>
                <div class="tile">2</div>
                <div class="tile">3</div>
                <div class="tile">4</div>
                <div class="tile">5</div>
                <div class="tile">6</div>
                <div class="tile">7</div>
                <div class="tile">8</div>
                <div class="tile">9</div>
                <div class="tile">10</div>
                <div class="tile">11</div>
                <div class="tile">12</div>
                <div class="tile">13</div>
                <div class="tile">14</div>
                <div class="tile fifteen">15</div>
            </div>
        )
    }
}

export {App}
