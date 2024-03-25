"use client"
import useImageSlider from "@/hooks/Products/useImageSlider";
import useRecommandSlider from "@/hooks/Products/useRecommandSlider";
import { LeftArrow, RightArrow } from "../Button/iconSource";

function RecommandSlide() {
    //TODO 
    // 서버 컴포넌트 에서 이미지 갖고오고 프랍으로 받기

    const images = [
        'https://media.bunjang.co.kr/product/251168295_1_1706853342_w856.jpg',
        'https://media.bunjang.co.kr/product/251168295_2_1706853342_w856.jpg',
        'https://media.bunjang.co.kr/product/251168295_1_1706853342_w856.jpg',
        'https://media.bunjang.co.kr/product/251168295_2_1706853342_w856.jpg',
        'https://media.bunjang.co.kr/product/251168295_1_1706853342_w856.jpg',
        'https://media.bunjang.co.kr/product/251168295_2_1706853342_w856.jpg',
        'https://media.bunjang.co.kr/product/251168295_1_1706853342_w856.jpg',
        'https://media.bunjang.co.kr/product/251168295_2_1706853342_w856.jpg',
        'https://media.bunjang.co.kr/product/251168295_1_1706853342_w856.jpg',
        'https://media.bunjang.co.kr/product/251168295_2_1706853342_w856.jpg',
    ]
    // const { currentIndex, goNext, goPrev } = useImageSlider(images);
    const itemsPerPage = 5;
    const { currentIndex, goNext, goPrev, totalPages } = useRecommandSlider(images, itemsPerPage);
    const startIndex = currentIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = images.slice(startIndex, endIndex);


    return (
        <div className="relative mt-[30px]  max-w-full">
            <div className="flex mb-[30px] justify-between">
                <div className="flex items-center text-[18px] font-medium">
                    이런 상품은 어때요?
                </div>
                <div className="text-[16px]">{currentIndex + 1}/{totalPages}</div>
            </div>
            <div className="flex flex-wrap">
                {currentItems.map((image: string, index: number) => (
                    <div key={index} className="w-[159px] mr-[14px] flex-shrink-0 overflow-hidden min-w-[150px]">
                        <a className="relative cursor-pointer">
                            <div className="relative">
                                <img src={image} alt="product img" className="w-full block" />
                            </div>
                        </a>
                        <div className="w-full mt-[10px] overflow-x-hidden text-ellipsis text-center line-[1.4] text-[13px]">
                            상품 이름
                        </div>
                    </div>
                ))}

            </div>
            <button className="w-[50px] h-[50px] bg-white opacity-60 absolute top-1/2 -translate-y-1/2 flex justify-center items-center" onClick={goPrev}>
                <LeftArrow />
            </button>
            <button className="w-[50px] h-[50px] bg-white opacity-60 absolute top-1/2 -translate-y-1/2 flex justify-center items-center right-[0px]" onClick={goNext} >
                <RightArrow />
            </button>
        </div>
    )
}

export default RecommandSlide;