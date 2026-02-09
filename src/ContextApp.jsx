import { useContext } from "react"
import ThemeToggleButton from "./ThemeToggleButton"
import { ThemeContext } from "./ThemeContext"
import "./context_app.css"
import Cart from "./Cart"

const ContextApp = () => 
    {
    const {theme} = useContext(ThemeContext)

    const storedTheme = localStorage.getItem("theme")

    return <div className={`content_${storedTheme}`}>
        <h1>Light/Dark mode toggle theme</h1>
        <Cart />
        <ThemeToggleButton />
    </div>
}

export default ContextApp