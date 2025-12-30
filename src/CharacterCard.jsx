import "./CharacterCard.css"

const CharacterCard = ({imageUrl, name, description}) => {


    return <div className="character-card">
        <img src={imageUrl} alt="" />
        <span><h2>{name}</h2></span>
        <p>{description}</p>

    </div>
}
export default CharacterCard;