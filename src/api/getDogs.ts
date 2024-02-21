export const getBreed = async (breed: string) => {
  const request = `https://dog.ceo/api/breed/${breed}/images`;
  try {
    const response = await fetch(request);
    const responseJson = await response.json();
    return responseJson.message;
  } catch (err) {
    console.error(err);
  }
};

export const getSubBreed = async (breed: string, subBreed: string) => {
  const request = `https://dog.ceo/api/breed/${breed}/${subBreed}/images`;
  try {
    const response = await fetch(request);
    const responseJson = await response.json();
    return responseJson.message;
  } catch (err) {
    console.error(err);
  }
};
