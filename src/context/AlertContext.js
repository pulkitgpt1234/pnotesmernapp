import { createContext, useState } from "react";
export const AlertContext = createContext();

export const AlertProvider=(props)=>{
    const [alert,setAlert]=useState(null);

    const showAlert=(text,type)=>{
        setAlert({message:text,alertType:type});
        setTimeout(()=>{
          setAlert(null);
        },2000);
      };
    
      return (
        <AlertContext.Provider value={{ alert, showAlert }}>
          {props.children}
        </AlertContext.Provider>
      );
}