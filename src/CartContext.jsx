import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [count, setCount] = useState(0)

    const storedCart = JSON.parse(localStorage.getItem("cart"))

    const currentCount = parseInt(storedCart.count)

    const addToCart = () => {
        setCount((prev) => prev + 1)
        localStorage.setItem("cart", JSON.stringify({
            ...items,
            count: currentCount + 1
        }))
    }

    const removeFromCart = () => {
        if (count === 0) return
        localStorage.setItem("cart", JSON.stringify({
            ...items,
            count: currentCount - 1
        }))
        
    }

    return (
        <CartContext.Provider value={{ count, addToCart, removeFromCart }}  >
            {children}
        </CartContext.Provider>
    )
}