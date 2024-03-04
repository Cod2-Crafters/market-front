import ProductsClient from "@/features/products/ProductsClient";
import { ProductDetail } from "@/types/Product";

type paramProductPage = {
    params: {
        id: string
    },
    searchParams: {

    }
}

async function getDetail(postId: string) {
    const res = await fetch('http://13.125.249.102:8080/api/post/' + postId);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}



async function Products(props: paramProductPage) {
    const postId = props.params.id;
    const data: ProductDetail = await getDetail(postId);
    return (
        <ProductsClient detailData={data} />
    )
}


export default Products;