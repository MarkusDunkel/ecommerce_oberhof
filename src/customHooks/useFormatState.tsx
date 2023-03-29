import { useEffect, useState } from "react";
import { isViewportHeightInitial, isViewportWidthInitial } from "../variables";

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

export default useFormatState;