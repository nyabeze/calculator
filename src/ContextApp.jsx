import { useContext } from "react"
import ThemeToggleButton from "./ThemeToggleButton"
import { ThemeContext } from "./ThemeContext"
import "./context_app.css"

const ContextApp = () => 
    {
    const {theme} = useContext(ThemeContext)

    return <div className={`${theme} content`}>
        <h1>Light/Dark mode toggle theme</h1>
        <ThemeToggleButton />
    </div>
}

export default ContextApp