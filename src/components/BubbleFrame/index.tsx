import './styles.scss';

interface BubbleFrameProps {
    id: string,
    image: string,
    width: string,
    height: string,
    left: string,
    top: string,
    delay: string
}

const BubbleFrame = ({ id, image, width, height, left, top, delay }: BubbleFrameProps) => {
    return (
        <div className="positionOnCanvas" style={{
            left: left,
            top: top,
            width: width,
            height: height
        }}>
            <div className="image" style={{ backgroundImage: "url(" + image + ")" }}>
                <svg width="100%" height="100%">
                    <defs>
                        <mask id={id}>
                            <rect width="100%" height="100%" fill="white" key={Math.random()} />
                            <ellipse className="ellipse" fill="black" style={{ animationDelay: delay }} key={Math.random()} />
                        </mask>
                    </defs>

                    <rect x="0" y="0" width="100%" height="100%" fill="white" mask={`url(#${id})`}></rect>
                </svg>
            </div>
        </div>
    );
}

export default BubbleFrame;