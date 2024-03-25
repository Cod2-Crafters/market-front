import ProductsClient from "@/features/products/ProductsClient";

type paramProductPage = {
    params: {
        id: string
    },
    searchParams: {

    }
}

function Products(props: paramProductPage) {
    return (
        <ProductsClient />
    )
}


export default Products;