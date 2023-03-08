import React, {
  useEffect,
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Search from "./Seacrh";
import "./Styles.css";

const initialState = {
  favorites: [],
};
const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  //   console.log("Lo que trae el evento", event);
  //   console.log("Lo que trae el target", event.target);
  //   console.log("Lo que trae el value", event.target.value);

  // };

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);
  // const filteredUsers = characters.filter((user) => {
  //   //include sirve para cuando en una busqueda aparece alguna palabra relacionada a la busqueda
  //   // ejemplo: al escribir smi el programa realizara la busqueda que contengan esas letras
  //   //y arrojara en el ejemplo de este caso los de apellido smith
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });
  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );
  return (
    <div className="container">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />
      {filteredUsers.map((character, key) => (
        <div className="alinear" key={key}>
          <div className="row">
            <div className="col col-4">
              <img src={character.image} alt="imagen" />
              <h2>Nombre: {character.name}</h2>
              <h3>Estado : {character.status}</h3>
              <h4>Genero : {character.gender}</h4>
              <button type="button" onClick={() => handleClick(character)}>
                Agregar a favoritos
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;
