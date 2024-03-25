'use client';

import type { DialogContentTypes } from '@/types/Dialogs';

import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import SelectLoginPopup from './SelectLoginPopup';

import { cn } from '@/lib/utils';
import { IOpenDialog } from '@/types/Dialogs';
import { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalOverlayProps {
    isOpen?: boolean;
    setDialogInfo: Dispatch<SetStateAction<IOpenDialog>>;
    contentType: DialogContentTypes;
    dialogContent?: ReactNode;
}

const ModalOverlay = ({ isOpen = false, contentType, setDialogInfo, dialogContent, ...props }: ModalOverlayProps) => {
    const [portalElement, setPortalElement] = useState<Element | null>(null);
    const refDialog = useRef<HTMLDialogElement>(null);

    const [popupContent, SetPopupContent] = useState<Record<DialogContentTypes, ReactNode>>({
        registerForm: <RegisterPopup setDialogInfo={setDialogInfo} />,
        selectLoginType: <SelectLoginPopup setDialogInfo={setDialogInfo} />,
        login: <LoginPopup setDialogInfo={setDialogInfo} />,
        emptyNode: <Fragment />,
    });

    // 직접 지정한 content가 있는 경우 contentType를 무시하고, 우선 적용
    const content = dialogContent !== undefined ? dialogContent : popupContent[contentType];

    useEffect(() => {
        setPortalElement(document.getElementById('portal'));
    }, [portalElement, []]);

    if (portalElement !== null) {
        if (isOpen == true && content !== undefined && content !== null) {
            const o = ReactDOM.createPortal(
                <>
                    <dialog
                        ref={refDialog}
                        open={isOpen}
                        className="relative"
                        // dialog input enter key 누를 시 종료되는 현상 방지
                        onKeyDown={(event) => {
                            if (event?.key === 'Enter') {
                                event.preventDefault();
                            }
                        }}
                    >
                        <BackDrop>
                            {/* <h1>TEST - {contentType}</h1> */}
                            {content}
                        </BackDrop>
                    </dialog>
                </>,
                portalElement
            );
            return o;
        } else {
            return ReactDOM.createPortal(null, portalElement);
        }
    }
};

type BackDropProps = {
    children: ReactNode;
    className?: string;
};

const BackDrop = ({ children, className }: BackDropProps) => {
    return (
        <div
            id="modal-backdrop"
            className={cn('scrollbar-hide fixed left-0 top-0 h-full w-full bg-black bg-opacity-80', className)}
        >
            {children}
        </div>
    );
};

export default ModalOverlay;
