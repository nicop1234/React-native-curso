/** @format */
import React, {useState, useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { UserLoggedScreen } from "./UserLoggedScreen";
import { UsersGuestSceen } from "./userGuestScreen";
import { LoadingModal } from "../../components/shared"


export function AccountScreen() {

  const [hasLogged, setHasLogged] = useState("")

 
  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false)
    })
  },[])

  if (hasLogged === ""){
    return <LoadingModal text={"cargando"} show/>
  }

  return hasLogged ? <UserLoggedScreen/> : <UsersGuestSceen/>

;}