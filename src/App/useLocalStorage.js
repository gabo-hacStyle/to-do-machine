import React from "react";

function useLocalStorage (itemName, initialValue) {
    //Creating states 
    const [sincronizedItem, setSincronizedItem] = React.useState(true)
    const [loading, setLoading] = React.useState(true);//For loading
    const [item, setItem] = React.useState(initialValue);//The item brough from Ls
    const [error, setError] = React.useState(false)//For errors
  
    React.useEffect(() =>{
      setTimeout(() =>{
        try{
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
        
        
          if(!localStorageItem){ //If the clients' localStorage is initially empty
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
          } else {
            parsedItem = JSON.parse(localStorageItem);
          }
    
          setItem(parsedItem)
          setLoading(false)
          setSincronizedItem(true)
  
        } catch(error){
          setError(error)
        }
        
      }, 1500)
    }, [sincronizedItem])
   
    const saveItem = (newItem) => {
      try {
        const stringifiedItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifiedItem);
        setItem(newItem);
      } catch (error) {
        setError(error)
      }
      
    } 

    const sincronizeItem = () => {
      setLoading(true);
      setSincronizedItem(false)
    }

    return {
      item,
      saveItem,
      loading,
      error,
      sincronizeItem
    }
  }
export {useLocalStorage}