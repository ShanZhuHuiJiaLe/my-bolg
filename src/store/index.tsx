'use client';
import React, { createContext, ReactElement, useContext } from 'react';
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite';
import createStore, { IStore } from './rootStore';

interface IProps {
  initialValue: Record<any, any>;
  children: ReactElement;
}

enableStaticRendering(!process.browser); //浏览器环境为false,true表示是ssr项目

const StoreContext = createContext({});

export const StoreProvider = ({ initialValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue));//创建可被观察响应式的数据
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore=()=>{
    const store:IStore=useContext(StoreContext)as IStore
    if(!store){
        throw new Error('数据不存在')
    }
    return store
}
