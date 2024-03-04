import { CLOSE_MODAL, ModalActionTypes, OPEN_MODAL } from "@/types/modalActionTypes";



export const openModal = (content: React.ReactNode) : any => ({
    type: OPEN_MODAL,
    payload : content,
});

export const closeModal = () : ModalActionTypes => ({
    type: CLOSE_MODAL
})