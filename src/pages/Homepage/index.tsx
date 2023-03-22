import './styles.scss';
import Image1 from "./../../assets/daniel_with_chicken.png";
import Image2 from "./../../assets/hofansicht.jpg";
import BubbleFrame from '../../components/BubbleFrame';
import Image3 from "./../../assets/feuer.jpg";
import Image4 from "./../../assets/natur.jpg";

interface HomepageProps {
    isFormat: String | undefined;
};

const images = [Image1, Image2, Image3, Image4];

const Homepage = ({ isFormat }: HomepageProps) => {


    //Daniel, Hofansicht, Feuer, Natur
    const widths = [
        ['15vw', '38vw', '20vw', '23vw'], // landscape
        ['15vw', '38vw', '20vw', '23vw'], // squareLandscape
        ['35vw', '50vw', '42vw', '40vw'], // squarePortrait
        ['35vw', '50vw', '42vw', '40vw']  // portrait
    ];

    const lefts = [
        ['2%', '60.3%', '17.1%', '37.2%'], // landscape
        ['2%', ' 60.3%', '17.1%', '37.2%'], // squareLandscape
        ['2%', '47%', '2%', '45%'], // squarePortrait
        ['2%', '47%', '2%', '45%']  // portrait
    ];

    const tops = [
        ['75%', '1%', '20%', '45%'], // landscape
        ['75%', '1%', '20%', '45%'], // squareLandscape
        ['60%', '1%', '25%', '57%'], // squarePortrait
        ['60%', '1%', '25%', '57%']  // portrait
    ];


    let width: string[] = [''];
    let height: string[] = [''];
    let left: string[] = [''];
    let top: string[] = [''];
    if (isFormat === 'landscape') {
        width = widths[0];
        height = widths[0];
        left = lefts[0];
        top = tops[0];
    } else if (isFormat === 'squareLandscape') {
        width = widths[1];
        height = widths[1];
        left = lefts[1];
        top = tops[1];
    } else if (isFormat === 'squarePortrait') {
        width = widths[2];
        height = widths[2];
        left = lefts[2];
        top = tops[2];
    } else if (isFormat === 'portrait') {
        width = widths[3];
        height = widths[3];
        left = lefts[3];
        top = tops[3];
    }

    console.log('isFormat', isFormat);

    return (
        <section className="homepage">
            <div className="canvas">

                {images.map((img, index) => (
                    <BubbleFrame id={index} image={img} //Daniel
                        width={width[index]}
                        height={height[index]}
                        left={left[index]}
                        top={top[index]}
                        delay='0s' />
                ))}

                {/* <BubbleFrame id='1' image={Image1} //Daniel
                    width=width[0]
                height=height[]
                left='2%'
                top={isPortrait ? '75%' : '60%'}
                    delay='0s' />
                <BubbleFrame id='2' image={Image2}  // hofansicht
                    width={isPortrait ? '50vw' : '38vw'}
                    height={isPortrait ? '50vw' : '38vw'}
                    left={isPortrait ? '47%' : '60.3%'}
                    top='1%' delay='-8s' />
                <BubbleFrame id='3' image={Image3} //fire
                    width={isPortrait ? '42vw' : '20vw'}
                    height={isPortrait ? '42vw' : '20vw'}
                    left={isPortrait ? '2%' : '17.1%'}
                    top={isPortrait ? '25%' : '20%'}
                    delay='-16s' />
                <BubbleFrame id='4' image={Image4} //nature
                    width={isPortrait ? '40vw' : '23vw'}
                    height={isPortrait ? '40vw' : '23vw'}
                    left={isPortrait ? '45%' : '37.2%'}
                    top={isPortrait ? '57%' : '45%'}
                    delay='-24s' /> */}

            </div>
        </section >
    );
};

export default Homepage;