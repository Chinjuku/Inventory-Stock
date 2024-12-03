import { StockForm } from "./components/StockForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StockContextProvider } from "./context/StockContextProvider";
import ItemDashboard from "./components/ItemDashboard";

const App = () => {
  return (
    <StockContextProvider>
      <div className="min-h-screen w-full flex border">
        <ToastContainer />
        <div className="w-1/2 items-center justify-center flex">
          <div className="flex w-[90%] flex-col px-10 py-12 bg-white rounded-lg shadow-md border border-black/20">
            <ItemDashboard />
          </div>
        </div>
        <div className="w-1/2 items-center justify-center flex">
          <div className="w-2/3 items-center justify-center flex flex-col px-10 py-12 bg-white rounded-lg shadow-md border border-black/20">
            <h1 className="text-4xl font-semibold text-black">
              แบบฟอร์มนำเข้า Stock
            </h1>
            <StockForm />
          </div>
        </div>
      </div>
    </StockContextProvider>
  );
};

export default App;
