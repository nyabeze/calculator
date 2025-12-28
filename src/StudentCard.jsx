import "./StudentCard.css"
const StudentCard = ({ image,name,age,grade}) => {
    return <div className="student-box"> 
        <img src={image} alt="" />
        <h1>{name}</h1>
        <p>Age :{age}</p>
        <p>Grade :{grade}</p>

    </div>

}

export default StudentCard;