"use client"
import useImageSlider from "@/hooks/Products/useImageSlider";
import { ProductImage } from "@/types/Product";

// const ProductsClient: React.FC<{ detailData: ProductDetail }> = ({ detailData }) => {

const ImageSlide: React.FC<{ imageList: ProductImage[] }> = ({ imageList }) => {
    //TODO 
    // 서버 컴포넌트 에서 이미지 갖고오고 프랍으로 받기 
    const images = imageList.map((item: ProductImage) => process.env.NEXT_PUBLIC_API_HOST + item.imagePath);
    // 더미 이미지
    const dummy = ['https://media.bunjang.co.kr/product/246556049_1_1708054149_w856.jpg', 'https://media.bunjang.co.kr/product/246556049_2_1708054149_w856.jpg', 'https://media.bunjang.co.kr/product/246556049_3_1708054149_w856.jpg'];
    // const images = imageList.map(() => dummy[Math.floor(Math.random() * dummy.length)]);
    // const images = [
    //     'https://media.bunjang.co.kr/product/251168295_1_1706853342_w856.jpg',
    //     'https://media.bunjang.co.kr/product/251168295_2_1706853342_w856.jpg',
    // ]
    const { currentIndex, goNext, goPrev } = useImageSlider(images);



    return (
        <div className="w-[430px] h-[430px] mr-10 flex-shrink-0">
            <div className="w-full h-full border border-[#eeeeeee] relative">
                <div className="w-full h-full relative">
                    {images.map((image: string, index: number) => (
                        <img src={image} key={index} className={`w-full h-full absolute transition-opacity duration-200 ease-in-out object-cover ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                    {/* <img src="https://media.bunjang.co.kr/product/251168295_2_1706853342_w856.jpg" className="w-full absolute transition-opacity duration-200 ease-in-out opacity-100 object-cover" /> */}
                </div>
                {currentIndex < images.length - 1 && (
                    <button onClick={goNext} className="absolute top-1/2 right-5 translate-y-[-50%] w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.5)] flex items-center justify-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" ><path fill="currentColor" d="M8.6 3.4L14.2 9H2v2h12.2l-5.6 5.6L10 18l8-8l-8-8z"></path></svg>
                    </button>
                )}
                {currentIndex > 0 && (
                    <button onClick={goPrev} className="absolute top-1/2 left-5 translate-y-[-50%] w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.5)] flex items-center justify-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m2 10l8 8l1.4-1.4L5.8 11H18V9H5.8l5.6-5.6L10 2z"></path></svg>
                    </button>
                )}
            </div>

        </div>
    )
}

export default ImageSlide;