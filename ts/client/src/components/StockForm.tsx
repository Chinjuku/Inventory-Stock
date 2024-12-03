import { useEffect, useState, useContext, ChangeEvent, FormEvent } from "react";
import { getItems } from "../api/items";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import Popup from "../components/Popup";
import { StockContext } from "../context/StockContext";
import { FormData, ErrorData } from "../types/stockform.type";
import { Item } from "../types/data.types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const StockForm = () => {
  const { setStock } = useContext(StockContext);
  const [items, setItems] = useState<Item[]>([]);
  const [formData, setFormData] = useState<FormData>({
    item: "",
    amount: "",
    note: "",
  });
  const [error, setError] = useState<ErrorData>({});
  const [isOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getItems();
      setItems(res);
    };
    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSelectChange = (value: string) => {
  //   setFormData((prev) => ({ ...prev, item: value }));
  // };
  console.log(formData)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { item, amount } = formData;
    const errors: ErrorData = {};

    if (!item) {
      errors.item = "กรุณาเลือกรายการนำเข้าน้ำยา";
    }
    const selectItem = items.find((data) => data._id === item);
    const amountNumber = Number(amount);
    if (!amount) {
      errors.amount = "กรุณาใส่จำนวนน้ำยา";
    } else if (amountNumber > 9999 || amountNumber < 1) {
      errors.amount = "กรุณาใส่จำนวนน้ำยาน้อยกว่า 9999 หรือมากกว่า 0";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setDialogType("error");
      setIsDialogOpen(true);
      return;
    }

    setStock({
      item,
      amount: amountNumber,
      note: formData.note,
      import_date: new Date(),
      expire_in: selectItem ? selectItem.expire_in : "",
      expire_in_type: selectItem ? selectItem.expire_in_type : "",
      name: selectItem ? selectItem.name : "",
    });
    setError({});
    setDialogType("success");
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      item: "",
      amount: "",
      note: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-9 mt-5">
        <div className="flex gap-4">
          <div className="flex flex-col text-[#999] gap-2 w-1/2">
            <h3 className="text-2xl">
              รายการนำเข้าน้ำยา <span className="text-red-600">*</span>
            </h3>
            <Autocomplete
              disablePortal
              options={items}
              getOptionLabel={(option) => option.name || ""}
              value={items.find((item) => item._id === formData.item) || null}
              className="border-black border rounded-md"
              onChange={(e, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  item: newValue ? newValue._id : ""
                }));
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="กรุณาเลือกรายการ"
                  variant="outlined"
                  className="flex w-full rounded-md border border-black px-3 text-base"
                />
              )}
            />
            {/* <Select value={formData.item} onValueChange={handleSelectChange}>
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
            </Select> */}
          </div>

          <div className="flex flex-col text-[#999] gap-2 w-1/2">
            <h3 className="text-2xl">
              จำนวน <span className="text-red-600">*</span>
            </h3>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="border border-black h-14 text-xl text-black"
              placeholder="ใส่จำนวนน้ำยา"
            />
          </div>
        </div>

        <div className="flex flex-col text-[#999] gap-2">
          <h3 className="text-2xl">โน้ต</h3>
          <Textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="border border-black text-black"
            placeholder="พิมพ์โน้ตเพิ่มเติม..."
            rows={7}
          />
        </div>

        <div className="w-full flex justify-end">
          <Button type="submit" className="text-lg font-semibold px-6 py-4">
            Submit
          </Button>
        </div>
      </form>

      <Popup
        dialogType={dialogType}
        isOpen={isOpen}
        setIsDialogOpen={setIsDialogOpen}
        errorData={error}
        resetForm={resetForm}
      />
    </>
  );
};
