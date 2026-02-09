import { useContext } from "react"
import Cart from "./Cart"
import { CartContext } from "./CartContext"

const Products = () => {
    const { addToCart, removeFromCart } = useContext(CartContext)

    const storedTheme = localStorage.getItem("theme")

    return <div className={`products content_${storedTheme}`}>
        <h1>Products page</h1>
        <Cart />
        <button onClick={addToCart}>Add to cart</button>
        <button onClick={removeFromCart}>Remove from cart</button>
    </div>
}

export default Products