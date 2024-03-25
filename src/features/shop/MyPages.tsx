'use client'
import { ShopDetail } from "@/types/ShopTypes";
import { timeSince } from "@/utils/utils";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const devUrl = process.env.NEXT_PUBLIC_API_HOST;

const MyPage: React.FC<{ detailData: ShopDetail, shopName: string }> = ({ detailData, shopName }) => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState(detailData.content || []);
    const ShopInfo = detailData;
    const memberInfo = ShopInfo.content[0].simpleMemberResponse;
    const sinceTime = timeSince(memberInfo.createdAt);
    const [sortType, setSortType] = useState(0);

    const [loading, setLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    // const Products = ShopInfo.content;
    console.log(detailData);
    function formatPrice(price: number): string {
        return new Intl.NumberFormat().format(price);
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !loading && !isLastPage) {
                setPage(prevPage => prevPage + 1);
            }
        });

        const lastProductElement = document.querySelector('#last-product');
        if (lastProductElement) observer.observe(lastProductElement);

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            console.log(page);
            // setLoading(true);
            let url = `${devUrl}/api/post/search?shopName=${shopName}&page=${page}&size=50`;
            if (sortType === 0) url += "&sort=createdAt,desc";
            if (sortType === 2) url += "&sort=price,asc";
            if (sortType === 3) url += "&sort=price,desc";

            const res = await fetch(url);
            const newData = await res.json();
            setProducts(prevProducts => [...prevProducts, ...newData.content]);
            // setLoading(false);
        };
        fetchData();
    }, [page, sortType]);

    useEffect(() => {
        setProducts([]); // 기존 데이터를 초기화
        setPage(0); // sortType 변경 시 페이지를 1로 초기화
        // setIsLastPage(false); 
        // const fetchData = async () => {
        //     switch(sortType){
        //         case 0:
        //             const res = await fetch(devUrl + `/api/post/search?shopName=${shopName}&page=${page}&size=10&postTitle=&sort=price,desc&sort=id&sort=createdAt,desc`);
        //             break;
        //         case 1:
        //         case 2:
        //         case 3:
        //     }
        //     const newData = await res.json();
        //     setProducts((prevProducts) => [...prevProducts, ...newData.content]);
        // };

        // fetchData();
    }, [sortType]);

    return <div className="w-full h-full flex flex-col">
        <div className="w-full h-[250px]">
            <div className="flex flex-col w-full h-full items-center justify-between">
                <div className="w-4/5 h-full border-[1px] rounded-[10px] border-solid ">
                    <div className="flex h-full">
                        <div className="w-1/4 border-r-[1px] border-solid flex flex-col items-center justify-between">
                            <div className="pt-[40px] flex flex-col items-center">
                                <img className="w-[50px] h-[50px] rounded-full" src="https://media.bunjang.co.kr/images/crop/982324112_w96.jpg" alt="Rounded avatar" />

                                <p className="pt-[15px]">{memberInfo.shopName}</p>
                            </div>

                        </div>
                        <div className="w-3/4">
                            <div className="flex flex-col bottom-[20px] w-full p-[30px] ">
                                <p className="text-[20px]">{memberInfo.shopName}</p>
                                <p className="pt-[10px]">{memberInfo.email}</p>
                            </div>
                            <div className="flex w-full p-[50px]">
                                <div className="flex flex-col items-center w-full h-full border-r-[1px] border-solid">
                                    <p className="text-[10px]">상점 오픈일</p>
                                    <p className="text-[10px]">{sinceTime}</p>
                                </div>
                                <div className="flex flex-col items-center w-full h-full border-r-[1px] border-solid">
                                    <p className="text-[10px]">상점 방문수</p>
                                    <p className="text-[10px]">~~일전</p>
                                </div>
                                <div className="flex flex-col items-center w-full h-full border-r-[1px] border-solid">
                                    <p className="text-[10px]">상품판매</p>
                                    <p className="text-[10px]">~~회</p>
                                </div>
                                <div className="flex flex-col items-center w-full h-full">
                                    <p className="text-[10px]">상점 오픈일</p>
                                    <p className="text-[10px]">~~일전</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div className="flex flex-col w-full h-full items-center justify-between">
            <div className="pt-[60px] w-4/5 h-full">
                <div className="flex justify-between w-full items-center">
                    <div className="flex">
                        <p>{products.length}개의 상품</p>
                    </div>
                    <div className="flex space-x-[5px]">
                        <p onClick={() => setSortType(0)} className={`border-r-[1px] border-solid text-[12px] mr-[5px] pr-[5px] ${sortType === 0 ? 'font-bold underline' : ''} hover: cursor-pointer`}>최신순</p>
                        {/* <p onClick={() => setSortType(1)} className={`border-r-[1px] border-solid text-[12px] mr-[5px] pr-[5px] ${sortType === 1 ? 'font-bold underline' : ''} hover: cursor-pointer`}>인기순</p> */}
                        <p onClick={() => setSortType(2)} className={`border-r-[1px] border-solid text-[12px] mr-[5px] pr-[5px] ${sortType === 2 ? 'font-bold underline' : ''} hover: cursor-pointer`}>저가순</p>
                        <p onClick={() => setSortType(3)} className={`text-[12px] ${sortType === 3 ? 'font-bold underline' : ''} hover: cursor-pointer`}>고가순</p>
                    </div>
                </div>
                {/* <div className="flex">
                    <div className="w-1/4 space-x-[10px]"> <img src={devUrl + '/api/file/static/139.jpg'} /></div>
                    <div className="w-1/4 space-x-[10px]"> <img src={devUrl + '/api/file/static/139.jpg'} /></div>
                    <div className="w-1/4 space-x-[10px]"> <img src={devUrl + '/api/file/static/139.jpg'} /></div>
                    <div className="w-1/4 space-x-[10px]"> <img src={devUrl + '/api/file/static/139.jpg'} /></div>

                </div> */}
                <div className="flex flex-wrap -mx-2">
                    {products.map((product, index) => (
                        <div key={index} className="w-1/4 px-2 mb-4"> {/* 각 이미지를 감싸는 div에 패딩을 적용하여 간격을 조정합니다. */}
                            <div className="flex flex-col">
                                <Link href={`/products/${product.id}`}>
                                    <img src={devUrl + product.thumbnailPath} className="w-full h-[150px] object-cover cursor-pointer" />
                                </Link>
                                <p className="text-[10px]">{product.title}</p>
                                <p className="text-[13px]">{formatPrice(product.price)}원</p>
                                <p className="text-[9px] pt-[10px]">{timeSince(product.createdAt)}</p>
                            </div>
                        </div>
                    ))}
                    <div id="last-product">로딩중...</div>

                </div>
            </div>

        </div>
    </div >
}




export default MyPage;