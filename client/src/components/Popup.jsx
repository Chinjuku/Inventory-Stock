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

const Popup = ({
  dialogType,
  isOpen,
  setIsDialogOpen,
  errorData,
  successData,
}) => {
  const submitToForm = () => {
    // submit the success data to the form
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
          <DialogHeader>
            <DialogTitle>การส่งข้อมูลสำเร็จ</DialogTitle>
            {/* Show Data Dialog */}
          </DialogHeader>
        ) : (
          <DialogHeader>
            <DialogTitle>ข้อผิดพลาด</DialogTitle>
            <DialogDescription>
              กรุณาตรวจสอบข้อมูลในฟอร์มอีกครั้ง
            </DialogDescription>
            {errorData &&
              Object.values(errorData).map((data, index) => (
                <p key={index} className="text-red-600 mt-2">
                  - {data}
                </p>
              ))}
          </DialogHeader>
        )}
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)}>ปิด</Button>
        </DialogFooter>
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
