import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import { Logo } from './components/logo/logo';
import { Button } from './components/button/button';
import { Input } from './components/input/input';
import { Card } from './components/card/card';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dogs, setDogs] = useState<{ [key: string]: string[] }[]>([]);
  const [breeds, setBreeds] = useState<Map<string, string[]>>(new Map());
  const [breedImages, setBreedImages] = useState<string[]>([]);
  const [subBreedImages, setSubBreedImages] = useState<string[][]>([]);
  const [hasSubBreeds, setHasSubBreeds] = useState<Boolean>(false);
  const [showSubBreeds, setShowSubBreeds] = useState<Boolean>(false);
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const getDogs = useCallback(
    async () => {
      try {
        const request = 'https://dog.ceo/api/breeds/list/all';
        const response = await fetch(request);
        const responseJson = await response.json();
        const data = responseJson.message;
        const dogsObjArr = Object.entries(data).map(d => ({ [d[0]]: d[1] as Array<string> }));
        setDogs(dogsObjArr);
      } catch (err) {
        setError(err);
      }
    },
    []
  );

  const getBreedImages = useCallback(
    async (breed: string) => {
      if (!breed) {
        return;
      }
      setLoading(true);
      const request = `https://dog.ceo/api/breed/${breed}/images`;
      try {
        const response = await fetch(request);
        const responseJson = await response.json();
        const images = responseJson.message;
        if (Array.isArray(images)) {
          if (!breeds.has(breed)) {
            setBreeds(new Map(breeds.set(breed, images)));
          }
          setNoResults(false);
          setBreedImages(breeds.get(breed));
        } else {
          setNoResults(true);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    },
    []
  );

  const getSubBreeds = useCallback(
    async (breed: string) => {
      if (!breed) {
        return;
      }
      setLoading(true);
      const request = `https://dog.ceo/api/breed/${breed}/list`;
      try {
        const response = await fetch(request);
        const responseJson = await response.json();
        const list = responseJson.message;
        if (Array.isArray(list)) {
          if (!list.length) {
            setHasSubBreeds(false);
          } else {
            setHasSubBreeds(true);
            let output = [];
            for (let i = 0; i < list.length; i++) {
              const request = `https://dog.ceo/api/breed/${breed}/${list[i]}/images/random`;
              const response = await fetch(request);
              const responseJson = await response.json();
              const result = responseJson.message;
              output.push(Array(list[i], String(result)));
            }
            setSubBreedImages(output);
          }
        }
        setLoading(false);
      } catch (err) {
        setError(err)
      }
    },
    []
  );

  useEffect(() => {
    getBreedImages(searchTerm);
    getSubBreeds(searchTerm);
    getDogs();
  }, [getDogs, getBreedImages, getSubBreeds, searchTerm]);

  const handleSearchClick = () => {
    setShowSubBreeds(false);
    getBreedImages(searchTerm);
  };

  const handleBackClick = () => {
    setShowSubBreeds(false);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setShowSubBreeds(false);
      setSearchTerm(event.currentTarget.value);
      getBreedImages(searchTerm);
    }
  };

  const handleSubBreedsClick = () => {
    getSubBreeds(searchTerm);
    setShowSubBreeds(true);
  };

  const handleMenuClick = (term: string) => {
    setSearchTerm(term);
    getBreedImages(term);
    getSubBreeds(term);
    setShowSubBreeds(true);
    setShowMenu(false);
  };

  const handleSeeAll = () => {
    setShowMenu(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Logo text="Woofer" />
      </header>
      <div className="Form">
        <div className="Search" role="search">
          <Input onKeyUp={handleKeyUp} label="Search for a dog breed" showLabel={false} placeholder="Dog type" type="search" hasError={Boolean(error)} errorText={error?.message} />
          <Button onClick={handleSearchClick} label="Search" type="button" />
        </div>
        <Button onClick={handleSeeAll} label="See all breeds" type="button" theme="secondary" />
      </div>
      {noResults && (
        <h2 role="region" aria-live="polite">No results found for "{searchTerm}"</h2>
      )}
      {
        showMenu && (
          <>
            <h2>All Breeds:</h2>
            <ul className="Menu">
              {dogs.map((obj, _) => (
                Object.entries(obj).map(([key, value], i) => (
                  <li key={i}>
                    <span>{key}</span>
                    {!!value.length && <Button key={`${i}-0`} showAsLink label="See sub-breeds" type="button" onClick={() => handleMenuClick(key)} />}
                  </li>
                ))
              ))}
            </ul>
          </>
        )
      }
      {!noResults && !error && !!breedImages.length && !showMenu &&
        <>
          <div className="Breed">
            <h2>Breed: {searchTerm}</h2>
            {showSubBreeds && <Button type="button" label="Back to breed results" onClick={handleBackClick} showAsLink />}
            {hasSubBreeds && !showSubBreeds && <Button type="button" label="See sub-breeds" onClick={handleSubBreedsClick} showAsLink />}
          </div>
          <div className="Cards">
            {showSubBreeds ? (
              subBreedImages.map((arr, i) => (
                loading ? <Skeleton key={i} height={250} /> : <Card key={i} label={arr[0]} img={arr[1]} />
              ))
            ) : (
              breedImages.map((img, i) => (
                loading ? <Skeleton key={i} height={250} /> : <Card key={i} img={img} label={searchTerm} showLabel={false} />
              ))
            )
            }
          </div>
        </>
      }
    </div>
  );
}

export default App;
