import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
  const { characterId } = useParams();
  const [oneCharacter, setOneCharacter] = useState({});
  useEffect(() => {
    async function getOneChar() {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        const data = await response.json();
        console.log(data);
        setOneCharacter(data);
      } catch (error) {
        console.log(error);
      }
    }
    getOneChar();
  }, [characterId]);
  //   if (!oneCharacter) {
  //     return <p>Loading....</p>;
  //   }

  return (
    <div>
      <img alt="character image" src={oneCharacter?.image} />
      <h2>Name: {oneCharacter ? oneCharacter.name : null}</h2>
      <h2>Species: {oneCharacter?.species}</h2>
    </div>
  );
};
export default CharacterDetail;
