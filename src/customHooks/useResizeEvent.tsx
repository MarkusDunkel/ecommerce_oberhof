import { useState } from "react";
import { isViewportHeightInitial, isViewportWidthInitial } from "../variables";

function useResizeEvent() {
    const [isViewportSize, setViewportSize] = useState([isViewportWidthInitial, isViewportHeightInitial]);
    window.onresize = () => {
        setViewportSize([
            window.innerWidth,
            window.innerHeight
        ]);
    };
    return (isViewportSize);
}

export default useResizeEvent;