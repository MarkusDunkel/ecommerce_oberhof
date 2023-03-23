import './styles.scss';
import Image1 from "./../../assets/daniel_with_chicken.png";
import Image2 from "./../../assets/hofansicht.jpg";
import BubbleFrame from '../../components/BubbleFrame';
import Image3 from "./../../assets/feuer.jpg";
import Image4 from "./../../assets/natur.jpg";

interface HomepageProps {
    isFormat: String | undefined;
    isViewportSize: number[];
};

const images = [Image1, Image2, Image3, Image4];

const Homepage = ({ isFormat, isViewportSize }: HomepageProps) => {


    //Daniel, Hofansicht, Feuer, Natur
    const widths = [
        ['15vw', '38vw', '20vw', '23vw'], // landscape
        ['20vw', '33vw', '25vw', '26vw'], // squareLandscape
        ['35vw', '50vw', '42vw', '40vw'], // squarePortrait
        ['43vw', '58vw', '51vw', '48vw']  // portrait
    ];

    const lefts = [
        ['2%', '60.3%', '17.1%', '37.2%'], // landscape
        ['2%', ' 60.3%', '17.1%', '37.2%'], // squareLandscape
        ['2%', '47%', '2%', '45%'], // squarePortrait
        ['0%', '37%', '2%', '45%']  // portrait
    ];

    const tops = [
        ['60%', '1%', '20%', '45%'], // landscape
        ['65%', '1%', '13%', '55%'], // squareLandscape
        ['75%', '1%', '28%', '55%'], // squarePortrait
        ['79%', '1%', '31%', '56%']  // portrait
    ];

    const animationDelay = ['-0s', '-5s', '-10s', '-15s'];


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

    const fontSize = `${Math.sqrt(isViewportSize[0] * isViewportSize[1] * 0.01)}px`;

    console.log('fontsize', fontSize);


    return (
        <section className="homepage">
            <div className="canvas">
                <div className="homeText" style={{ fontSize: fontSize }}>
                    Permakultur ist das Schaffen von kleinen Paradiesen hier auf der Erde.
                </div>
                {images.map((img, index) => (
                    <BubbleFrame id={index} image={img} //Daniel
                        width={width[index]}
                        height={height[index]}
                        left={left[index]}
                        top={top[index]}
                        delay={animationDelay[index]} />
                ))}
            </div>
        </section >
    );
};

export default Homepage;