import { useState, createContext } from "react"
import PropTypes from "prop-types";

export const StockContext = createContext({})

export const StockContextProvider = ({ children }) => {
    const [stock, setStock] = useState(null)
    return (
        <StockContext.Provider value={{ stock, setStock }}>
            {children}
        </StockContext.Provider>
    )
}

StockContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};