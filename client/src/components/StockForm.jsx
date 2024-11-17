import { getItems } from "@/api/items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Popup from "@/components/Popup";

export const StockForm = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    note: "",
  });
  const [error, setError] = useState({});
  const [isOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [success, setSuccess] = useState({});

  // Fetch items on component mount
  useEffect(() => {
    const fetchData = async () => {
        const res = await getItems();
        setItems(res);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, item: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { item, quantity, note } = formData;
    const newErrors = {};

    // Validate item
    if (!item) {
      newErrors.item = "กรุณาเลือกรายการนำเข้าน้ำยา";
    }

    // Validate quantity
    if (!quantity) {
      newErrors.quantity = "กรุณาใส่จำนวนน้ำยา";
    } else if (quantity > 9999 || quantity <= 0) {
      newErrors.quantity = "กรุณาใส่จำนวนน้ำยาน้อยกว่า 9999 หรือมากกว่า 0";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setDialogType("error"); // Set dialog to error case
      setIsDialogOpen(true); // Open the dialog
      return;
    }

    // const countlot
    setSuccess({
      // lot:
      item: item,
      quantity: quantity,
      note: note,
    })
    setError({});
    setDialogType("success"); // Set dialog to success case
    setIsDialogOpen(true); // Open the dialog
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-9 mt-5">
        <div className="flex gap-4">
          <div className="flex flex-col text-[#999] gap-2 w-1/2">
            <h3 className="text-2xl">
              รายการนำเข้าน้ำยา <span className="text-red-600">*</span>
            </h3>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="border border-black bg-[#999] text-white placeholder:text-white">
                <SelectValue placeholder="เลือกรายการนำเข้าน้ำยา" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col text-[#999] gap-2 w-1/2">
            <h3 className="text-2xl">
              จำนวน <span className="text-red-600">*</span>
            </h3>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border border-black bg-[#999] text-white placeholder:text-white"
              placeholder="ใส่จำนวน Item ไม่เกิน 9999 ชิ้น"
            />
          </div>
        </div>

        <div className="flex flex-col text-[#999] gap-2">
          <h3 className="text-2xl">โน้ต</h3>
          <Textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="border border-black bg-[#999] text-white placeholder:text-white"
            placeholder="พิมพ์โน้ตเพิ่มเติม..."
            rows="7"
          />
        </div>

        <div className="w-full flex justify-end">
          <Button type="submit" className="text-lg font-semibold px-6 py-4">
            Submit
          </Button>
        </div>
      </form>

      {/* Popup Dialog */}
      <Popup
        dialogType={dialogType}
        isOpen={isOpen}
        setIsDialogOpen={setIsDialogOpen}
        errorData={error}
        successData={success}
      />
    </>
  );
};
