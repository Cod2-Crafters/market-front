import ShopClient from "@/features/shop/ShopClient";
import { ShopDetail } from "@/types/ShopTypes";

const devUrl = process.env.NEXT_PUBLIC_API_HOST;


type paramShopPage = {
    params: {
        id: string
    }, searchParamse: {

    }
}


async function getDetail(shopName: string) {
    // const res = await fetch(devUrl + `/api/post/search?shopName=${shopName}&page=&size=10&postTitle=&sort=price,desc&sort=id&sort=createdAt,desc`)
    const res = await fetch(devUrl + `/api/post/search?shopName=${shopName}&page=&size=50&sort=createdAt,desc`)

    if (!res.ok) {
        throw new Error('Faield to fetch data');
    }
    return res.json();
}



async function Shop(props: paramShopPage) {
    const shopName = props.params.id;
    const data: ShopDetail = await getDetail(shopName);

    // console.log(data);



    return (
        <ShopClient detailData={data} shopName={shopName} />
    )

}

export default Shop;