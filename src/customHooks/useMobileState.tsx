import { useEffect, useState } from "react";
import { isViewportWidthInitial } from "../variables";

let isMobileInitial: undefined | Boolean = undefined;
isViewportWidthInitial < 600 ? isMobileInitial = true : isMobileInitial = false;

function useMobileState(isViewportSize: number[]): undefined | Boolean {
    const [isMobile, setIsMobile] = useState(isMobileInitial);
    useEffect(() => {
        let im = undefined;
        isViewportSize[0] < 600 ? im = true : im = false;
        setIsMobile(im)
    }, [isViewportSize]
    )

    return isMobile;
}

export default useMobileState;