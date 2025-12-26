const Card = ({ img_src,heading_text,content_text }) => {
return <div>
    <img src={img_src} alt="" />
    <h2>{heading_text}</h2>
    <p>{content_text}</p>
</div>
}

export default Card