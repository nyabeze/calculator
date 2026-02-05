import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

const ThemeToggleButton = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)

    return <button onClick={toggleTheme}>
        Current Theme: {theme[0].toUpperCase() + theme.slice(1)}
    </button>
}

export default ThemeToggleButton