import { createContext, useContext, useState, useEffect } from "react";
import { IProfileDataObject, IUserContextInterface, IContextProps } from "../types";

const DataContext = createContext<IUserContextInterface>({} as IUserContextInterface);

const DataContextProvider = ({ children }: IContextProps) => { 
  const [userSavedImg, setUserSavedImg] = useState<IProfileDataObject[]>([]);
  
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