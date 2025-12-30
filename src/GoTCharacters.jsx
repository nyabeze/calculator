import CharacterCard from "./CharacterCard";
import "./GoTCharacters.css"
import {useState} from "react";



const GoTCharacters = () => {
    const characterList= [{'id': 0, 'imageUrl': 'https://thronesapi.com/assets/images/daenerys.jpg', 'name': 'Daenerys Targaryen',
        'title': 'Mother of Dragons', 'family': 'House Targaryen'},
       {'id': 1, 'imageUrl': 'https://thronesapi.com/assets/images/sam.jpg', 'name': 'Samwell Tarly',
        'title': 'Maester', 'family': 'House Tarly'},
       {'id': 2, 'imageUrl': 'https://thronesapi.com/assets/images/jon-snow.jpg', 'name': 'Jon Snow',
        'title': 'King of the North', 'family': 'House Stark'},
       {'id': 3, 'imageUrl': 'https://thronesapi.com/assets/images/arya-stark.jpg', 'name': 'Arya Stark',
        'title': 'No One', 'family': 'House Stark'},
       {'id': 4, 'imageUrl': 'https://thronesapi.com/assets/images/sansa-stark.jpeg', 'name': 'Sansa Stark',
        'title': 'Lady of Winterfell', 'family': 'House Stark'},
       {'id': 5, 'imageUrl': 'https://thronesapi.com/assets/images/bran-stark.jpg', 'name': 'Brandon Stark',
        'title': 'Lord of Winterfell', 'family': 'House Stark'},
       {'id': 6, 'imageUrl': 'https://thronesapi.com/assets/images/ned-stark.jpg', 'name': 'Ned Stark',
        'title': 'Lord of Winterfell', 'family': 'House Stark'},
       {'id': 7, 'imageUrl': 'https://thronesapi.com/assets/images/robert-baratheon.jpeg', 'name': 'Robert Baratheon',
        'title': 'Lord of the Seven Kingdoms', 'family': 'House Baratheon'},
       {'id': 8, 'imageUrl': 'https://thronesapi.com/assets/images/jaime-lannister.jpg', 'name': 'Jamie Lannister',
        'title': 'Lord Commander of the Kingsguard', 'family': 'House Lannister'},
       {'id': 9, 'imageUrl': 'https://thronesapi.com/assets/images/cersei.jpg', 'name': 'Cersei Lannister',
        'title': 'Lady of Casterly Rock', 'family': 'House Lannister'},
       {'id': 10, 'imageUrl': 'https://thronesapi.com/assets/images/catelyn-stark.jpg', 'name': 'Cateyln Stark',
        'title': 'Lady of Winterfell', 'family': 'House Stark'},
       {'id': 11, 'imageUrl': 'https://thronesapi.com/assets/images/robb-stark.jpg', 'name': 'Robb Stark',
        'title': 'Lord of Winterfell', 'family': 'House Stark'},
       {'id': 12, 'imageUrl': 'https://thronesapi.com/assets/images/theon.jpg', 'name': 'Theon Greyjoy',
        'title': 'Captain of Sea Bitch', 'family': 'House Greyjoy'},
       {'id': 13, 'imageUrl': 'https://thronesapi.com/assets/images/joffrey.jpg', 'name': 'Joffrey Baratheon',
        'title': 'Lord of the Seven Kingdoms, Protector of the Realm', 'family': 'House Lanister'},
       {'id': 14, 'imageUrl': 'https://thronesapi.com/assets/images/tyrion-lannister.jpg', 'name': 'Tyrion Lannister',
        'title': 'Hand of the Queen', 'family': 'House Lannister'},
       {'id': 15, 'imageUrl': 'https://thronesapi.com/assets/images/the-hound.jpg', 'name': 'Sandor Clegane',
        'title': 'The Hound', 'family': 'House Clegane'},
       {'id': 16, 'imageUrl': 'https://thronesapi.com/assets/images/littlefinger.jpg', 'name': 'Petyr Baelish',
        'title': 'Littlefinger', 'family': 'House Baelish'},
       {'id': 17, 'imageUrl': 'https://thronesapi.com/assets/images/davos-seaworth.png', 'name': 'Davos Seaworth',
        'title': 'Hand of the King', 'family': 'House Seaworth'},
       {'id': 18, 'imageUrl': 'https://thronesapi.com/assets/images/stannis.jpg', 'name': 'Stannis Baratheon',
        'title': 'Lord of Dragonstone', 'family': 'House Baratheon'},
       {'id': 19, 'imageUrl': 'https://thronesapi.com/assets/images/varys.jpg', 'name': 'Varys Unknown',
        'title': 'Master of Whisperers', 'family': 'Unknown'},
       {'id': 20, 'imageUrl': 'https://thronesapi.com/assets/images/khal-drogo.jpg', 'name': 'Khal Drogo',
        'title': 'Khal', 'family': 'House Targaryen'},
       {'id': 21, 'imageUrl': 'https://thronesapi.com/assets/images/margaery-tyrell.jpg', 'name': 'Margaery Tyrell',
        'title': 'Queen of the Seven Kingdoms', 'family': 'Tyrell'},
       {'id': 22, 'imageUrl': 'https://thronesapi.com/assets/images/ygritte.jpg', 'name': 'Ygritte None',
        'title': 'Spearwife', 'family': 'Free Folk'},
       {'id': 23, 'imageUrl': 'https://thronesapi.com/assets/images/brienne-tarth.jpeg', 'name': 'Brienne Tarth',
        'title': 'Lady Brienne', 'family': 'Tarth'},
       {'id': 24, 'imageUrl': 'https://thronesapi.com/assets/images/missandei.jpeg', 'name': 'Missandei None',
        'title': "Queen's Personal Advisor", 'family': 'Naathi'},
       {'id': 25, 'imageUrl': 'https://thronesapi.com/assets/images/gilly.jpg', 'name': 'Gilly None',
        'title': 'The Rabbit Keeper', 'family': 'None'},
       {'id': 26, 'imageUrl': 'https://thronesapi.com/assets/images/viserys-targaryan.jpg', 'name': 'Viserys Targaryan',
        'title': 'King Viserys III', 'family': 'Targaryan'},
       {'id': 27, 'imageUrl': 'https://thronesapi.com/assets/images/rickon.jpg', 'name': 'Rickon Stark',
        'title': 'Prince', 'family': 'Stark'},
       {'id': 28, 'imageUrl': 'https://thronesapi.com/assets/images/roose-bolton.jpg', 'name': 'Roose Bolton',
        'title': 'Lord of Dreadfort', 'family': 'Bolton'},
       {'id': 29, 'imageUrl': 'https://thronesapi.com/assets/images/daario.jpg', 'name': 'Daario Naharis',
        'title': 'Commander of the Second Sons', 'family': 'Naharis'},
       {'id': 30, 'imageUrl': 'https://thronesapi.com/assets/images/shae.jpg', 'name': 'Shae ', 'title': 'Mistress',
        'family': 'Lorathi'},
       {'id': 31, 'imageUrl': 'https://thronesapi.com/assets/images/tommen.jpg', 'name': 'Tommen Baratheon',
        'title': 'Prince', 'family': 'Baratheon'},
       {'id': 32, 'imageUrl': 'https://thronesapi.com/assets/images/gendry.jpg', 'name': 'Gendry Baratheon',
        'title': "Lord of Storm's End", 'family': 'Baratheon'},
       {'id': 33, 'imageUrl': 'https://thronesapi.com/assets/images/jorah-mormont.jpg', 'name': 'Jorah Mormont',
        'title': 'Knight', 'family': 'Mormont'},
       {'id': 34, 'imageUrl': 'https://thronesapi.com/assets/images/king-robert.jpg', 'name': 'Robert Baratheon',
        'title': 'King', 'family': 'Baratheon'},
       {'id': 35, 'imageUrl': 'https://thronesapi.com/assets/images/ramsey-bolton.jpg', 'name': 'Ramsey Bolton',
        'title': 'The Bastard of Bolton', 'family': 'Bolton'},
       {'id': 36, 'imageUrl': 'https://thronesapi.com/assets/images/talisa-stark.jpg', 'name': 'Talisa Stark',
        'title': 'Queen Consort', 'family': 'Stark'},
       {'id': 37, 'imageUrl': 'https://thronesapi.com/assets/images/lord-commander-mormont.jpg', 'name': 'Jeor Mormont',
        'title': "Lord Commander of the Knight's Watch", 'family': 'Mormont'},
       {'id': 38, 'imageUrl': 'https://thronesapi.com/assets/images/the-high-sparrow.jpg', 'name': 'The High Sparrow',
        'title': 'High Septon', 'family': 'Sparrow'},
       {'id': 39, 'imageUrl': 'https://thronesapi.com/assets/images/red-viper.jpg', 'name': 'Oberyn Martell',
        'title': 'Red Viper of Dorne', 'family': 'Viper'},
       {'id': 40, 'imageUrl': 'https://thronesapi.com/assets/images/melisandre.jpg', 'name': 'Melisandre The Red Woman',
        'title': 'Melisandre of Asshai', 'family': 'Unkown'},
       {'id': 41, 'imageUrl': 'https://thronesapi.com/assets/images/jaqen-hghar.jpg', 'name': "Jaqen H'ghar",
        'title': 'Faceless Men of Braavos', 'family': 'Lorath'},
       {'id': 42, 'imageUrl': 'https://thronesapi.com/assets/images/tywin-lannister.jpg', 'name': 'Tywin Lannister',
        'title': 'Lord Paramount of Westerlands', 'family': 'Lannister'},
       {'id': 43, 'imageUrl': 'https://thronesapi.com/assets/images/ellaria-sand.jpg', 'name': 'Ellaria Sand',
        'title': 'Paramour of Prince Oberyn Martell', 'family': 'Sand'},
       {'id': 44, 'imageUrl': 'https://thronesapi.com/assets/images/tormund-giantsbane.jpg',
        'name': 'Tormund Giantsbane', 'title': 'Free Folk Warrior', 'family': 'Free Folk'},
       {'id': 45, 'imageUrl': 'https://thronesapi.com/assets/images/yara-greyjoy.jpg', 'name': 'Yara Greyjoy',
        'title': 'Lady of the Iron Islands', 'family': 'Greyjoy'},
       {'id': 46, 'imageUrl': 'https://thronesapi.com/assets/images/euron-greyjoy.jpg', 'name': 'Euron Greyjoy',
        'title': 'King of the iron Islands', 'family': 'Greyjoy'},
       {'id': 47, 'imageUrl': 'https://thronesapi.com/assets/images/hodor.jpg', 'name': 'Wylis Hodor',
        'title': 'Servant of House Stark', 'family': 'Stark'},
       {'id': 48, 'imageUrl': 'https://thronesapi.com/assets/images/pycelle.jpg', 'name': ' Pycelle',
        'title': 'Grand Maester of the Seven Kingdoms', 'family': ''},
       {'id': 49, 'imageUrl': 'https://thronesapi.com/assets/images/greyworm.jpg', 'name': 'Grey Worm',
        'title': 'Commander of the Unsullied', 'family': 'Worm'},
       {'id': 50, 'imageUrl': 'https://thronesapi.com/assets/images/olenna-tyrell.jpg', 'name': 'Olenna Tyrell',
        'title': 'Queen of Thorns', 'family': 'Tyrell'},
       {'id': 51, 'imageUrl': 'https://thronesapi.com/assets/images/qyburn.jpg', 'name': 'Qyburn Grand Maester',
        'title': 'Former maester of the Citadel', 'family': 'Qyburn'},
       {'id': 52, 'imageUrl': 'https://thronesapi.com/assets/images/bronn.jpg', 'name': 'Lord Bronn',
        'title': 'Lord of Highgarden', 'family': 'Bronn'}]

        const [selectedFamily, setSelectedFamily] = useState("All");

  // ✅ FILTER LOGIC (NO useEffect)
  const filteredCharacters =
  selectedFamily === "All"
    ? characterList
    : characterList.filter(c =>
        c.family.toLowerCase().includes(selectedFamily.toLowerCase())
      );

      const families = [
  "All",
  "House Stark",
  "House Targaryen",
  "House Lannister",
  "Mormont",
  "Greyjoy",
  "House Baratheon",
  "Tyrell",
  "Free Folk"
];




    return <div className="character-container"> 

        <ul className="horizontal-list">
            {families.map(family => (
                <li
                key={family}
                className={selectedFamily === family ? "active" : ""}
                onClick={() => setSelectedFamily(family)}
                >
                {family === "All" ? "All" : family.replace("House ", "")}
                </li>
            ))}
        </ul>
        


        {filteredCharacters.map((character,index)=>(
            <CharacterCard
            key={index}
            imageUrl= {character.imageUrl}
            name={character.name}
            description={character.title}
            />

        ))}

    </div>
}
export default GoTCharacters;