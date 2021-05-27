/*
  React Context Api
  Fetches video list from the server
  on new video upload, updates the video list
*/
import React, { createContext, useEffect, useState } from 'react';

export const AppStateContext = createContext();

const AppStoreProvider = ({ children }) => {
  const [data, setData] = useState({
    successMsg: {
      msg: '',
      show: false,
    },
    errorMsg: {
      msg: '',
      show: false,
    },
  });

  const updateData = (object) => setData({ ...data, ...object });
  return (
    <AppStateContext.Provider
      value={{
        StoreData: data,
        updateData,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStoreProvider;
