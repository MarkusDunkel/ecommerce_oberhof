import React from 'react';
import './styles.scss';
import Image1 from "./../../assets/daniel_with_chicken.png";
import Image2 from "./../../assets/hofansicht.jpg";
import Image3 from "./../../assets/feuer.jpg";
import BubbleFrame from '../../components/BubbleFrame';

const Homepage = () => {
    return (
        <section className="homepage">
            <div className="canvas">

                <BubbleFrame id='1' image={Image1} width='20rem' height='20rem' left='5%' top='50%' delay='0s' />
                <BubbleFrame id='2' image={Image2} width='70rem' height='70rem' left='40%' top='10%' delay='-7s' />
                <BubbleFrame id='3' image={Image3} width='30rem' height='30rem' left='20%' top='20%' delay='-14s' />

            </div>
        </section >
    );
};

export default Homepage;