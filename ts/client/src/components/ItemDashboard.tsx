import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../types/data.types";
import { Input } from "./ui/input";
import { debounce } from "@mui/material";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 270,
  },
  {
    field: "name",
    headerName: "Item Name",
    width: 200,
  },
  {
    field: "expire_in",
    headerName: "Expires in",
    width: 100,
  },
  {
    field: "expire_in_type",
    headerName: "Expire in type",
    flex: 150,
  },
];

export default function ItemDashboard() {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
    searchData: "",
    type: "all",
  });

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPageState((prev) => ({
      ...prev,
      page: model.page + 1,
      pageSize: model.pageSize,
    }));
  };

  const handleSearchChange = debounce((value: string) => {
    setPageState((prev) => ({ ...prev, page: 1, searchData: value }));
  }, 1000);
  
  const onInputChange = (event: { target: { value: string } }) => {
    handleSearchChange(event.target.value);
  };

  const handleSelectChange = (value : string) => {
    setPageState((prev) => ({...prev, type: value }));
  };

  console.log(pageState.type)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageState((prev) => ({ ...prev, isLoading: true }));
        const res = await axios.get(
          `http://localhost:3000/api/item/paginate?page=${pageState.page}&limit=${pageState.pageSize}&search=${pageState.searchData}&type=${pageState.type}`
        );
        setPageState((prev) => ({
          ...prev,
          isLoading: false,
          data: res.data.data,
          total: res.data.total,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
        setPageState((old) => ({ ...old, isLoading: false }));
      }
    };
    fetchData();
  }, [pageState.page, pageState.pageSize, pageState.searchData, pageState.type]);
  console.log(pageState)

  return (
    <div className="h-[700px] w-full flex flex-col gap-5">
      <h1 className="text-3xl">Item Dashboard</h1>
      <div className="flex gap-4 items-center justify-center">
        <Select value={pageState.type} onValueChange={handleSelectChange}>
              <SelectTrigger className="border w-1/4 placeholder:text-white">
                <SelectValue placeholder="เลือกรายการนำเข้าน้ำยา" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="all">
                    ค้นหารายการทั้งหมด
                  </SelectItem>
                  <SelectItem value="name">
                    ค้นหาชื่อน้ำยา
                  </SelectItem>
              </SelectContent>
            </Select>
        <Input 
          className="w-3/4"
          type="text"
          placeholder="Search..."
          onChange={onInputChange}
        />
      </div>
      
      <DataGrid
        className="h-[500px]"
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        pageSizeOptions={[10, 30, 50, 70, 100]}
        pagination
        paginationMode="server"
        paginationModel={{
          page: pageState.page - 1,
          pageSize: pageState.pageSize,
        }}
        onPaginationModelChange={handlePaginationChange}
        columns={columns}
        getRowId={(row: Item) => row._id}
      />
    </div>
  );
}
