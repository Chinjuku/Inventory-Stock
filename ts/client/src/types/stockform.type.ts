export type FormData = {
    item: string;
    amount: string;
    note: string;
};

export type ErrorData = {
    item?: string;
    amount?: string;
    note?: string;
};

export type PopupProps = {
    dialogType: "success" | "error" | "";
    isOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    errorData?: ErrorData;
    resetForm: () => void;
};

export type SubmitData = {
    item_code: string,
    lot: number | null,
    amount: number,
    note: string | undefined,
    import_datetime: string,
    expire_datetime: string
}