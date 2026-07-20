import { createContext, useContext, useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProfileDataObject, IUserContextInterface, IContextProps } from "../types";

const DataContext = createContext<IUserContextInterface>({} as IUserContextInterface);

const STORAGE_KEY = "userImgData";

const DataContextProvider = ({ children }: IContextProps) => {
  const [userSavedImg, setUserSavedImg] = useState<IProfileDataObject[]>([]);
  const isHydrated = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) setUserSavedImg(JSON.parse(stored));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        isHydrated.current = true;
      });
  }, []);

  useEffect(() => {
    if (!isHydrated.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userSavedImg)).catch((error) =>
      console.log(error),
    );
  }, [userSavedImg]);

  const contextValue: IUserContextInterface = {
    userSavedImg: userSavedImg,
    setUserSavedImg: setUserSavedImg,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
export const useDataContext = () => useContext(DataContext);

export default DataContextProvider;