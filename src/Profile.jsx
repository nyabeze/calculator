import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Nav from "./Nav"

const Profile = () => {
    const { id } = useParams()

    const [profileResponse, setProfileResponse] = useState("")



    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`"http://www.api.com/"${id}`, {
                method: "GET"
            })

            setProfileResponse("fetched")

            return "fetched"
        }
        fetchProfile()
    }, [])

    return (
        <div>
            <Nav />
            <h1>
                Hello {id}
            </h1>
            <p>{profileResponse}</p>
        </div>
    )
}

export default Profile