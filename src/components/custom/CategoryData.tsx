import CategoryList from './CategoryList';

type TCategoryList = {
    className?: string;
};

async function getCategories() {
    const res = await fetch(`http://13.125.249.102:8080/api/category/list`, { cache: 'no-cache' });
    console.log('categories');
    return res.json();
}

export interface ICategory {
    id: number;
    name: string;
    count: number;
    parentId: number;
    selected?: boolean;
    child?: Array<ICategory>;
}

const CategoryData = async ({ className }: TCategoryList) => {
    const categories: ICategory[] = await getCategories();
    return (
        <>
            <CategoryList className={className} categories={categories} />
        </>
    );
};

export default CategoryData;
