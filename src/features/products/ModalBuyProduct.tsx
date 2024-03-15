import { useAppDispatch } from "@/hooks/rtkHooks";
import { closeDrawer } from "../drawer/drawerSlice";



function ModalBuyProduct() {

    const dispatch = useAppDispatch();
    const close = () => dispatch(closeDrawer());

    return <><h2 className="text-xl font-semibold">모달 제목</h2>
        <p className="mt-4">여기에 모달 내용을 추가하세요.</p>
    </>
}


export default ModalBuyProduct;