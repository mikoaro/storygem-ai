"use client"

// context/UserDetailContext.js
import { createContext, useContext, useState } from "react";

const UserDetailContext = createContext();

export const UserDetailProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState([]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export const useUserDetail = () => useContext(UserDetailContext);

// Mine 2

// import { createContext, useState } from 'react';

//    export const UserDetailContext = createContext({});

//    export const UserDetailProvider = ({ children }) => {
//     const [userDetail, setUserDetail] = useState([]);

//        return (
//         UserDetailContext.Provider value={{userDetail, setUserDetail}}>
//                {children}
//            </UserDetailContext.Provider>
//        );
//    };

// Mine 1

// "use client"

// import React, { createContext, useState } from "react";

// const UserDetailContext = createContext();

// const UserDetailProvider = ({ children }) => {
//     const [userDetail, setUserDetail] = useState("mikoaro");

//   return (
//     <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
//       {children}
//     </UserDetailContext.Provider>
//   );
// };

// export { UserDetailContext, UserDetailProvider };

// Tube

// "use client"

// import { createContext, useContext, useState } from "react"

// export const UserDetailContext = createContext()

// export const UserDetailContextProvider = ({ children }) => {
//     const [userDetail, setUserDetail] = useState([]);

//     return (
//       <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
//         {children}
//       </UserDetailContext.Provider>
//     );
// };

// export const useUserDetailStateContext = () => {
//     const userDetailState = useContext(UserDetailContext);

//     if (!userDetailState)
//       throw new Error(
//         "useUserDetailStateContext must be used within the UserDetailContext provider"
//       );

//     return userDetailState;
//   };
