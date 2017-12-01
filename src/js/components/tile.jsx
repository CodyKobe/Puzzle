import React from 'react';

let myImage  = getImg();

class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            divPositionFromLeft : this.props.position.fromLeft,
            divPositionFromTop  : this.props.position.fromTop,

            divX : this.props.position.fromLeft * 160,
            divY : this.props.position.fromTop  * 160,

            myKey : this.props.myKey,

            tileNumberFromLeft : this.props.tileNumberFromLeft,
            tileNumberFromTop  : this.props.tileNumberFromTop,

            imageStartX : this.props.tileNumberFromLeft * 160,
            imageStartY : this.props.tileNumberFromTop  * 160,
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            divPositionFromLeft : nextProps.position.fromLeft,
            divPositionFromTop  : nextProps.position.fromTop,

            divX : nextProps.position.fromLeft * 160,
            divY : nextProps.position.fromTop  * 160,

            myKey : nextProps.myKey,

            tileNumberFromLeft : nextProps.tileNumberFromLeft,
            tileNumberFromTop  : nextProps.tileNumberFromTop,

            imageStartX : nextProps.tileNumberFromLeft * 160,
            imageStartY : nextProps.tileNumberFromTop  * 160,
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

            backgroundImage : `url(${myImage})`,
            backgroundSize : '500%',
            width : '160px',
            height : '160px',
            boxShadow : 'inset  1px  1px 1px -1px white, '
                      + 'inset -1px -1px 1px -1px azure'
        };
        // ostatni kafelek jest pusty i ma numer 14
        if( this.props.myKey === 14 ) {
            style.background = 'transparent';
            style.zIndex = '0';
            style.boxShadow = 'none';
        }
        return(
            <div className="tile" style={style} onClick={this.clickOnTile} >
                {/*{this.state.tileNumberFromLeft},*/}
                {/*{this.state.tileNumberFromTop} <br/>*/}
                {/*myKey: {this.state.myKey}*/}
            </div>
        )
    }
}

export {Tile};
export {myImage};

function getImg(){
    let nameArr = [
        "03431_preikestolennorway_800x480.jpg",
        "03432_sunsetamenity_800x480.jpg",
        "03433_starsoverjoshuatree_800x480.jpg",
        "03434_antelopecanyon_800x480.jpg",
        "03476_midwayhorse_800x480.jpg",
        "03502_leopard_800x480.jpg",
        "03550_deathvalley_800x480.jpg",
        "03568_earthwindandfire_800x480.jpg",
        "03613_lonesometree_800x480.jpg",
        "03630_theoasis_800x480.jpg",
        "03637_radhusettbanastockholm_800x480.jpg",
        "03685_jonesbeachsunrise_800x480.jpg",
        "03687_manarola5terre_800x480.jpg",
        "03722_fallingdarkness_800x480.jpg",
        "03723_ulurusunrise_800x480.jpg",
        "03727_morningcolor_800x480.jpg",
        "03728_nocturnal_800x480.jpg",
        "03731_trebarwithstrand_800x480.jpg",
        "03743_enchantingporto_800x480.jpg",
        "03748_sunriseoverbomboheadland_672x420.jpg",
        "03832_blandfordroad_800x480.jpg",
        "03843_morningsunongunungbatur_800x480.jpg",
        "03856_monacowintercloudspanorama_800x480.jpg",
        "03872_konttaineninnorthernlight_800x480.jpg",
        "03878_olympiastadionberlin_800x480.jpg",
        "03884_hooverdamaerial_800x480.jpg",
        "03892_the4amcampfire_800x480.jpg",
        "03903_tauntingeyes_800x480.jpg",
        "03909_insidebrycecanyon_800x480.jpg",
        "03919_mesquiteflat_800x480.jpg",
        "03927_skogafossrawpower_800x480.jpg",
        "03934_sunsetonsrilanka_800x480.jpg",
        "03935_empireofthealps_800x480.jpg",
        "03943_endlesslights_800x480.jpg",
        "03955_monacofogsummersunrise2015_800x480.jpg",
        "03966_upondescent_800x480.jpg",
        "03990_autumncapital_800x480.jpg",
        "03993_nebulacity_800x480.jpg",
        "04023_clearskieswithachanceofprotonbombardment_800x480.jpg",
        "04032_earthrise_800x480.jpg",
        "04047_hongkongcityafterraining_800x480.jpg",
        "04068_lameije_800x480.jpg",
        "04078_tothemountains_800x480.jpg",
        "04081_lagoonnebula_800x480.jpg",
        "04082_vermillionlakestars_800x480.jpg",
        "04086_queenstownfrombobspeak_800x480.jpg",
        "04087_riomaggioreatsunset_800x480.jpg",
        "04088_thebirthplaceofrivendell_800x480.jpg",
        "04089_desertstorm_800x480.jpg",
        "04096_gingerbread_800x480.jpg",
        "04100_incipientdawn_800x480.jpg",
        "04112_grosunset_800x480.jpg",
        "04134_sassolungo_800x480.jpg",
        "04136_therockatrainier_800x480.jpg",
        "04139_thefreshairofsaentismountain_800x480.jpg",
        "04140_coloradobackroad_800x480.jpg"
    ];
    let i = Math.floor( Math.random()*nameArr.length );
    return ('../../../img/'+nameArr[i]);
}

