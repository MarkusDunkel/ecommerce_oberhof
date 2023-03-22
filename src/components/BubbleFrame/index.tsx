import './styles.scss';

interface BubbleFrameProps {
    id: number,
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
                <div style={{ width: 'calc(100% + 3px)', transform: 'translateX(-1.5px) translateY(-1.5px)', height: 'calc(100% + 3px)' }}>
                    <svg width="100%" height="100%">
                        <defs>
                            <mask id={id.toString()}>
                                <rect width="100%" height="100%" fill="white" key={Math.random()} />
                                <ellipse className="ellipse" fill="black" style={{ animationDelay: delay }} key={Math.random()} />
                            </mask>
                        </defs>

                        <rect x="0" y="0" width="100%" height="100%" fill="white" mask={`url(#${id})`}></rect>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default BubbleFrame;