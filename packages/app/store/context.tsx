// context.ts
import { useLocalStore } from 'mobx-react-lite';
import { createContext } from 'react';
import createStore, { TStore } from './store';

export const StoreContext = createContext<TStore | null>(null);

const StoreProvider = ({ children }: any) => {
  const store = useLocalStore(createStore);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
