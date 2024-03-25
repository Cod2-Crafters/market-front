"use client"

import { useState } from "react";

function useRecommandSlider(images: any[], itemsPerPage: number) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalPages = Math.ceil(images.length / itemsPerPage);

    const goNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }

    const goPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
    }

    return { currentIndex, goNext, goPrev, totalPages };
}


export default useRecommandSlider;