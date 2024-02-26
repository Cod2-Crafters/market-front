"use client"

import { useState } from "react";

function useImageSlider(images: any[]) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return { currentIndex, goNext, goPrev };
}


export default useImageSlider;