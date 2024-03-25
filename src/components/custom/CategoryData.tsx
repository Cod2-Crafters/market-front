import { headers } from 'next/headers';

type TCategoryList = {
    className?: string;
};

function getIPFromServer() {
    const FALLBACK_IP_ADDRESS = '0.0.0.0';
    const forwardedFor = headers().get('x-forwarded-for');

    if (forwardedFor) {
        return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
    }

    return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
}

async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/list`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'x-forwarded-for': getIPFromServer(),
        },
    });
    console.log('categories');
    return res.json();
}

const CategoryData = async ({ className }: TCategoryList) => {
    const categories: CategoryState[] = await getCategories();
    return <>{/* <CategoryList className={className} categories={categories} /> */}</>;
};

export default CategoryData;
