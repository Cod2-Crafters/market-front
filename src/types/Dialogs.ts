// Dialog Type
type DialogContentTypes = 'registerForm' | 'selectLoginType' | 'login' | 'emptyNode';

interface IOpenDialog {
    contentType: DialogContentTypes;
    isOpen: boolean;
}

export type { DialogContentTypes, IOpenDialog };
