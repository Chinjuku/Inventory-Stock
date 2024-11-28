import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import clsx from "clsx";
import { Button } from "../components/ui/button";
import { useEffect, useState, useContext } from "react";
import { createStock, getCountLot } from "../api/stock";
import moment from "moment";
import { toast } from "react-toastify";
import { StockContext } from "../context/StockContext";
import { PopupProps } from "../types/stockform.type";

// Define the Popup component
const Popup = ({
  dialogType,
  isOpen,
  setIsDialogOpen,
  errorData,
  resetForm,
}: PopupProps) => {
  const { stock } = useContext(StockContext);
  const [lot, setLot] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!stock) return;
      const resCountLot = await getCountLot(stock.item);
      setLot(resCountLot + 1);
    };
    fetchData();
  }, [isOpen, stock]);

  const expireDate = (
    import_date: Date,
    type: "format" | "iso",
    expire_in?: string,
    expire_in_type?: string
  ) => {
    if (!import_date) return "";
    if (!expire_in || !expire_in_type) {
      return type === "format"
        ? moment(import_date).format("วันที่ DD/MM/YYYY เวลา HH:mm")
        : moment(import_date).toISOString();
    }
    return type === "format"
      ? moment(import_date)
          .add(
            Number(expire_in),
            expire_in_type as moment.unitOfTime.DurationConstructor
          )
          .format("วันที่ DD/MM/YYYY เวลา HH:mm")
      : moment(import_date)
          .add(
            Number(expire_in),
            expire_in_type as moment.unitOfTime.DurationConstructor
          )
          .toISOString();
  };

  // Function to confirm and save stock data
  const handleConfirm = async (
    item_code: string,
    lot: number | null,
    amount: number,
    note: string | undefined,
    import_datetime: string,
    expire_datetime: string
  ) => {
    const formData = {
      item_code,
      lot,
      amount,
      note,
      import_datetime,
      expire_datetime,
    };
    const res = await createStock(formData);
    setIsDialogOpen(false);
    resetForm();
    if (res === 201) {
      toast.success("จัดเก็บน้ำยาเข้าคลังสำเร็จ!");
    } else {
      toast.error("เกิดข้อผิดพลาดในการจัดเก็บน้ำยาเข้าคลัง!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent
        className={clsx({
          "bg-green-200": dialogType === "success",
          "bg-red-100": dialogType !== "success",
        })}
      >
        {dialogType === "success" ? (
          <>
            {stock && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-lg my-2">
                    ยืนยันการนำเข้าข้อมูล
                  </DialogTitle>
                  <p>ชื่อน้ำยา: {stock.name || ""}</p>
                  <p>จำนวน: {stock.amount} ชิ้น</p>
                  <p>ล็อตที่นำเข้า: {lot || ""}</p>
                  <p>
                    เวลาที่นำเข้า:{" "}
                    {expireDate(stock.import_date || new Date(), "format")}
                  </p>
                  <p>
                    วันที่หมดอายุ:{" "}
                    {expireDate(
                      stock.import_date || new Date(),
                      "format",
                      stock.expire_in,
                      stock.expire_in_type
                    )}
                  </p>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="bg-red-400"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    className="bg-green-400"
                    onClick={() =>
                      handleConfirm(
                        stock.item,
                        lot,
                        stock?.amount || 0,
                        stock?.note,
                        expireDate(stock.import_date || new Date(), "iso"),
                        expireDate(
                          stock.import_date || new Date(),
                          "iso",
                          stock.expire_in,
                          stock.expire_in_type
                        )
                      )
                    }
                  >
                    ตกลง
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>ข้อผิดพลาด</DialogTitle>
              <DialogDescription>
                กรุณากรอกข้อมูลในฟอร์มอีกครั้ง
              </DialogDescription>
              {errorData &&
                Object.values(errorData).map((data, index) => (
                  <p key={index} className="text-red-600 mt-2">
                    - {data}
                  </p>
                ))}
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Ok</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
