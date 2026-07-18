import Constants from "expo-constants";

const UNSPLASH_API_KEY = Constants.expoConfig?.extra?.unsplashApiKey;

export const fetchData = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}&count=10`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchQueryData = async (searchQuery: string, page: number = 1) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${UNSPLASH_API_KEY}&per_page=10&page=${page}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
