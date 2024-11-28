import { StockForm } from './components/StockForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StockContextProvider } from './context/StockContextProvider';

const App = () => {
  return (
    <StockContextProvider>
      <div className='min-h-screen w-full items-center justify-center flex flex-col border'>
        <ToastContainer />
        <div className='w-1/3 items-center justify-center flex flex-col px-10 py-12 bg-white rounded-lg shadow-md border border-black/20'>
          <h1 className='text-4xl font-semibold bg-clip-text bg-gradient-to-b from-[#2419FB] to-[#FF7AD1] text-transparent'>แบบฟอร์มนำเข้า Stock</h1>
          <StockForm />
        </div>
      </div>
    </StockContextProvider>
  )
}

export default App
