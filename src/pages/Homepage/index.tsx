import './styles.scss';
import Image1 from "./../../assets/daniel_with_chicken.png";
import Image2 from "./../../assets/hofansicht.jpg";
import BubbleFrame from '../../components/BubbleFrame';
import Image3 from "./../../assets/feuer.jpg";
import Image4 from "./../../assets/natur.jpg";

interface HomepageProps {
    isPortrait: Boolean | undefined;
};

const Homepage = ({ isPortrait }: HomepageProps) => {
    return (
        <section className="homepage">
            <div className="canvas">

                <BubbleFrame id='1' image={Image1} //Daniel
                    width={isPortrait ? '35vw' : '15vw'}
                    height={isPortrait ? '35vw' : '15vw'}
                    left='2%'
                    top={isPortrait ? '75%' : '60%'}
                    delay='0s' />
                <BubbleFrame id='3' image={Image3} //fire
                    width={isPortrait ? '42vw' : '20vw'}
                    height={isPortrait ? '42vw' : '20vw'}
                    left={isPortrait ? '2%' : '17.1%'}
                    top={isPortrait ? '25%' : '20%'}
                    delay='-16s' />
                <BubbleFrame id='2' image={Image2}  // hofansicht
                    width={isPortrait ? '50vw' : '38vw'}
                    height={isPortrait ? '50vw' : '38vw'}
                    left={isPortrait ? '47%' : '60.3%'}
                    top='1%' delay='-8s' />
                <BubbleFrame id='4' image={Image4} //nature
                    width={isPortrait ? '40vw' : '23vw'}
                    height={isPortrait ? '40vw' : '23vw'}
                    left={isPortrait ? '45%' : '37.2%'}
                    top={isPortrait ? '57%' : '45%'}
                    delay='-24s' />

            </div>
        </section >
    );
};

export default Homepage;