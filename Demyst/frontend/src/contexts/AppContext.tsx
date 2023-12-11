import { createContext, useReducer } from "react";
import { AppStateType, appReducer, initialState } from "../redux/appReducer";

export const AppContext = createContext<{
  state: AppStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState(),
  dispatch: () => null
});

interface Props {
  children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState());

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
