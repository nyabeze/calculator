import { useContext, useEffect } from "react"
import { CartContext } from "./CartContext"

const Cart = () => {
    const { count } = useContext(CartContext)

    const storedTheme = localStorage.getItem("theme")

    return <div className={`cart content_${storedTheme}`}>
        <h2>{count === 0 ? "No" : count}{" "}{count === 1 ? "item" : "items"}{" in the cart"}</h2>
    </div>
}


export default Cart