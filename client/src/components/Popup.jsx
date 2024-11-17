import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getItembyId } from "@/api/items";
import { getCountLot } from "@/api/stock";
import moment from "moment";

const Popup = ({
  dialogType,
  isOpen,
  setIsDialogOpen,
  errorData,
  successData,
}) => {
  const [item, setItem] = useState()
  const [lot, setLot] = useState()
  useEffect(() => {
    const fetchData = async () => {
      if (!successData.item) return;
      const resItem = await getItembyId(successData.item)
      setItem(resItem)
      const resCountLot = await getCountLot(successData.item)
      setLot(resCountLot + 1) //* เพิ่มล็อตจากจำนวนล็อตที่มีล่าสุด
    }
    fetchData();
  }, [successData.item])
  const expireDate = (import_date, expire_in = "", expire_in_type = "") => {
    if (!expire_in || !expire_in_type) {
      return moment(successData.import_date).format('วันที่ DD/MM/YYYY เวลา HH:mm')
    }
    return moment(import_date).add(Number(expire_in), expire_in_type).format('วันที่ DD/MM/YYYY เวลา HH:mm')
  }
  const saveToDB = () => {
    //TODO : Save data to database
    console.log("Save")
  }
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
            <DialogHeader>
              <DialogTitle className="text-lg my-2">ยืนยันการนำเข้าข้อมูล</DialogTitle>
              <p>ชื่อน้ำยา: {item?.name || ""}</p>
              <p>จำนวน: {successData.amount} ชิ้น</p>
              <p>ล็อตที่นำเข้า: {lot || ""}</p>
              <p>เวลาที่นำเข้า: {expireDate(successData.import_date)}</p>
              <p>วันที่หมดอายุ: {expireDate(successData.import_date, item?.expire_in, item?.expire_in_type)}</p>
            </DialogHeader>
            <DialogFooter>
              <Button className="bg-red-400" onClick={() => setIsDialogOpen(false)}>ยกเลิก</Button>
              <Button className="bg-green-400" onClick={() => saveToDB()}>ตกลง</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>ข้อผิดพลาด</DialogTitle>
              <DialogDescription>
                กรุณากรอกข้อมูลในฟอร์มอีกครั้ง
              </DialogDescription>
              {errorData &&
                //* Loop แสดงข้อมูลตาม Object ภายใน
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

Popup.propTypes = {
  dialogType: PropTypes.oneOf(["success", "error"]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  errorData: PropTypes.objectOf(PropTypes.string),
  successData: PropTypes.objectOf(),
};

export default Popup;
