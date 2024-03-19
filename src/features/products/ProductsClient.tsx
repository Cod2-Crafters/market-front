'use client'
import ImageSlide from "@/components/Products/imageSlide";
import RecommandSlide from "@/components/Products/recommandSlide";
import { ProductDetail, ProductImage, ProductMember } from "@/types/Product";
import { timeSince } from "@/utils/utils";
import { Button } from "@/components/ui/buttonProduct"
import { facebook, follow, naver, offHeart, tag } from "@/components/Button/iconSource";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from "@/store/store";
import { openModal } from "@/actions/modalActions";
import { Drawer, DrawerClose, DrawerContent, DrawerOverlay, DrawerTrigger } from "@/components/ui/drawer";
import { useAppDispatch, useAppSelector, useAppStore } from "@/hooks/rtkHooks";
import { closeDrawer, openDrawer, toggleDrawer } from "../drawer/drawerSlice";
import DrawerComponent from "@/components/custom/Drawer";
import Portal from "@/components/custom/MordalPortal";
import ModalBuyProduct from "./ModalBuyProduct";



const ProductsClient: React.FC<{ detailData: ProductDetail }> = ({ detailData }) => {
    const ProductInfo: ProductDetail = detailData;
    const { title, price, modifyedAt, content, hashtagList, bookmarkCount, views } = ProductInfo;

    const ProductMember: ProductMember = ProductInfo.member;
    const ProductImageList: ProductImage[] = ProductInfo.imageList;

    const formattedPrice = formatPrice(price);
    console.log(detailData);
    function formatPrice(price: number): string {
        return new Intl.NumberFormat().format(price);
    }
    const sinceTime = timeSince(modifyedAt);

    // 팔로우 버튼 클릭 이벤트 핸들러
    const handleFollowClick = async (followId: number) => {
        const url = `http://13.125.249.102:8080/api/follow/${followId}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    // 필요한 경우 인증 헤더 등 추가
                },
            });

            if (!response.ok) {
                throw new Error('팔로우 요청 실패');
            }
            console.log('팔로우 성공');
        } catch (error) {
            console.error('팔로우 요청 중 오류 발생', error);
        }
    };

    const store = useAppStore();
    const dispatch = useAppDispatch();

    const handlePurchaseClick = () => {
        dispatch(openDrawer(<ModalBuyProduct detailData={detailData} />));
    };


    return (
        <>
            <div className="flex flex-col items-center justify-between">
                <div>
                    <div className="py-20 flex">
                        <ImageSlide imageList={ProductImageList} />
                        <div className="flex-grow">
                            <div className="text-[24px] mb-[25px] font-semibold leading-relaxed">
                                {title}
                            </div>
                            <div className="flex items-end gap-[10px]">
                                <div className="text-[40px] font-medium">
                                    {formattedPrice}
                                    <span className="text-[28px] font-[400] ml-[5px]">원</span>
                                </div>
                            </div>
                            <hr className="h-ful w-full bg-gray-200 dark:bg-gray-700" />

                            <div className="h-[30px] mt-[15px] mb-[25px] flex justify-between" >
                                <div className="flex items-center h-full">
                                    <div className="flex items-center h-full text-[#606060] ">
                                        <span>
                                            {sinceTime}</span>
                                    </div>
                                    <div className="flex items-center h-full text-[#606060] pl-[10px]">
                                        조회수 {views}
                                    </div>
                                    <div className="flex items-center h-full text-[#606060] pl-[10px]">
                                        찜 {bookmarkCount}
                                    </div>
                                </div>
                            </div>
                            <div className="m-0 p-0 border-0 font-inherit align-baseline">
                                <div className="flex mb-[25px]">
                                    <div className="relative w-[120px] pl-[15px]">
                                        <div className="relative w-[90px] pl-[15px] text-[#606060]">
                                            - 상품 상태
                                        </div>
                                    </div>
                                    <div className="relative">새 상품</div>
                                </div>
                                <div className="flex mb-[25px]">
                                    <div className="relative w-[120px] pl-[15px]">
                                        <div className="relative w-[90px] pl-[15px] text-[#606060]">
                                            - 교환 여부
                                        </div>
                                    </div>
                                    <div className="relative">교환불가능</div>
                                </div>
                                <div className="flex mb-[25px]">
                                    <div className="relative w-[120px] pl-[15px]">
                                        <div className="relative w-[90px] pl-[15px] text-[#606060]">
                                            - 배송비
                                        </div>
                                    </div>
                                    <div className="relative">배송비 별도</div>
                                </div>
                                <div className="flex mb-[25px]">
                                    <div className="relative w-[120px] pl-[15px]">
                                        <div className="relative w-[90px] pl-[15px] text-[#606060]">
                                            - 거래지역
                                        </div>
                                    </div>
                                    <div className="relative">전국</div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="relative flex w-[180px] mr-[10px] justify-between h-[56px] items-center">
                                    <Button className="" style={{ backgroundColor: 'rgb(204, 204, 204)' }} size="lg">{offHeart()}찜</Button>
                                </div>
                                <div className="relative flex w-[180px] mr-[5px] justify-between h-[56px] items-center">
                                    <Button style={{ backgroundColor: 'rgb(255, 164, 37)' }} size="lg">채팅하기</Button>
                                </div>
                                <div className="relative flex w-[180px] mr-[5px] justify-between h-[56px] items-center">
                                    <Button onClick={handlePurchaseClick} style={{ backgroundColor: 'rgb(247, 0, 0)' }} size="lg">구매하기</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[50px] border-b-[1px] border-solid flex justify-items-end items-center">
                        {/* <Button variant="image" className="relative w-[28px] h-[28px] flex justify-center items-center mr-[10px]">
                        {naver()}
                    </Button>
                    <Button className="relative w-[28px] h-[28px] flex justify-center items-center mr-[10px]">
                        {facebook()}
                    </Button> */}
                    </div>
                    <div className="flex h-[500px]">
                        <div className="flex-grow flex-shrink basis-0">
                            <div className="pr-[30px] h-full border-solid border-r-[1px] border-r-gray-50">
                                <div>
                                    <div className="text-[18px] p-[48px] pb-[16px] border-b border-gray-50">상품정보</div>
                                    <div>
                                        <div className="whitespace-pre-wrap break-words my-[40px] leading-6">
                                            <p className="w-[663px]">
                                                {content}
                                            </p>
                                        </div>
                                        <div className="pt-[20px] pb-[20px] border-t-[1px] border-solid broder-b-[1px] border-gray-50 flex">
                                            <div className="w-[221px] border-r-[1px] border-solid border-gray-50">
                                                <div className="flex items-center justify-center mb-[16px] text-xs text-gray-50">
                                                    {tag()}상품태그
                                                </div>
                                                <div className="text-[13px] text-gray-50 px-[15px] flex flex-wrap justify-center leading-6 min-h-[19px]">
                                                    {hashtagList.map((tag, index) => (
                                                        <a key={index} className="mr-[5px]">
                                                            #{tag}
                                                        </a>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="w-[330px]">
                            <div className="h-full border-r border-gray-200 pr-[32px] pl-[32px] pb-[118px] relative">
                                <div>
                                    <div className="text-[18px] p-[48px] pb-[16px] border-b border-gray-50">상점정보</div>
                                    <div className="pl-[10px] pr-[10px]">
                                        <div className="flex mt-[20px] mb-[16px]">
                                            <a className="mr-[16px]">
                                                <img src="https://media.bunjang.co.kr/images/crop/982324112_w96.jpg" width="48" height="48" className="rounded-full" alt="판매자 프로필 이미지" />
                                            </a>
                                            <div>
                                                <a className="block mt-[4px] mb-[11px]">{ProductMember.shopName}</a>
                                                <div className="flex">
                                                    <a className="relative mr-[17px] text-[13px] text-gray-600">상품 39</a>
                                                    <a className="relative mr-[17px] text-[13px] text-gray-600">팔로워 1439</a>
                                                </div>
                                            </div>
                                        </div>
                                        <Button onClick={() => handleFollowClick(ProductMember.id)} className="w-full bg-gray-50">{follow()}팔로우</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RecommandSlide />


                </div>



            </div >
        </>
    )
}

export default ProductsClient;