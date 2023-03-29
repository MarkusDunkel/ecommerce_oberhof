import { useEffect, useState } from "react";
// import { isFormatInitial, isViewportHeightInitial, isViewportWidthInitial } from "../App";

const isViewportWidthInitial = window.innerWidth;
const isViewportHeightInitial = window.innerHeight

let isFormatInitial: undefined | string = undefined;
if (isViewportWidthInitial > 2 * isViewportHeightInitial) {
    isFormatInitial = 'landscape';
} else if (isViewportWidthInitial > isViewportHeightInitial) {
    isFormatInitial = 'squareLandscape';
} else if (isViewportWidthInitial > 2 * isViewportHeightInitial) {
    isFormatInitial = 'squarePortrait';
} else {
    isFormatInitial = 'portrait';
}

let isMobileInitial: undefined | Boolean = undefined;
isViewportWidthInitial < 600 ? isMobileInitial = true : isMobileInitial = false;

export function useResizeEvent() {
    const [isViewportSize, setViewportSize] = useState([isViewportWidthInitial, isViewportHeightInitial]);
    window.onresize = () => {
        setViewportSize([
            window.innerWidth,
            window.innerHeight
        ]);
    };
    return (isViewportSize);
}

export function useFormatState(isViewportSize: number[]): undefined | string {
    const [isFormat, setIsFormat] = useState(isFormatInitial);
    useEffect(() => {
        if (isViewportSize[0] > 1.5 * isViewportSize[1]) {
            setIsFormat('landscape');
        } else if (isViewportSize[0] > isViewportSize[1]) {
            setIsFormat('squareLandscape');
        } else if (isViewportSize[0] > .5 * isViewportSize[1]) {
            setIsFormat('squarePortrait');
        } else {
            setIsFormat('portrait');
        }
    }, [isViewportSize]);
    return isFormat;
}

export function useMobileState(isViewportSize: number[]): undefined | Boolean {
    const [isMobile, setIsMobile] = useState(isMobileInitial);
    useEffect(() => {
        let im = undefined;
        isViewportSize[0] < 600 ? im = true : im = false;
        setIsMobile(im)
    }, [isViewportSize]
    )

    return isMobile;
}