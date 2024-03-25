import { CLOSE_MODAL, ModalActionTypes, OPEN_MODAL } from "@/types/modalActionTypes";
import { ModalState } from "@/types/modalTypes";




const initialState: ModalState = {
    isOpen : false,
    content : null,
}

// export const modalReducer = (state = initialState, action: ModalActionTypes) : ModalState
export const modalReducer = (state = initialState, action: ModalActionTypes) : ModalState  => {
    switch(action.type){
        case OPEN_MODAL:
            return {
                ...state,
                isOpen:true,
                content: action.payload
            }
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                content: null
            };
        default:
            return state;
    }
    
} 