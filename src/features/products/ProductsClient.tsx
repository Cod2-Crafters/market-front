import ImageSlide from "@/components/Products/imageSlide";
import RecommandSlide from "@/components/Products/recommandSlide";



function ProductsClient() {

    return (
        <main>
            <div>
                <div className="py-20 flex">
                    <ImageSlide />
                    <div className="flex-grow">
                        <div className="text-[24px] mb-[25px] font-semibold leading-relaxed">
                            title
                        </div>
                        <div className="flex items-end gap-[10px]">
                            <div className="text-[40px] font-medium">
                                99,000
                                <span className="text-[28px] font-[400] ml-[5px]">원</span>
                            </div>
                        </div>
                        <div className="h-[30px] mt-[15px] mb-[25px] flex justify-between" >
                            <div className="flex items-center h-full">
                                <div className="flex items-center h-full">
                                    찜
                                </div>
                                <div className="flex items-center h-full">
                                    조회수
                                </div>
                                <div className="flex items-center h-full">
                                    업로드날짜
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RecommandSlide />

            </div>
        </main >
    )
}

export default ProductsClient;