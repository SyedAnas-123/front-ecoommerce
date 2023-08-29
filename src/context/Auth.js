
// import axios from "axios";
import { useState,useContext,createContext,useEffect} from "react";  // where we wanana use context we can use there useContext




//create context and save it in variable auth .
const AuthContext = createContext();




//creating an Provider
//globally state bana di he kahin se bh state access kr skte hen  

const AuthProvider = ({children}) => {

    //creating an state

const [auth,setAuth] = useState({

    user:null,
    token :"",

})


//this workis for private routes for dispalying of admin page and adding derfault axios property if dont want to add header or get the topken fromheader in privateroute.js to abh by defaultjo bh req jaeegi usme gheaders rahega hamara.

// axios.defaults.headers.common['Authorization'] = auth?.token  //jbj kbh private route wali api callhogi to khudhi8 headersetoken bh ajeega 


//making use effect , use effect is a function in which we can execute multiple functions , here we can also add dependency , iska kam ye he ke refresh hoon ek abd bh local stoeage me jo data he wo delete nhb hoga 
useEffect( ()=>{
    //first we create fucntion abh local storage se jo data aeega usko data ke variable me save krlengen 

    const data =localStorage.getItem("auth")
    if(data){
        const parseData = JSON.parse(data)
        setAuth({
            ...auth,
            user : parseData.user,
            token : parseData.token,

        })
    }
     // eslint-disable-next-line 
} ,[] );
return(

    <AuthContext.Provider value={[ auth , setAuth ]}>
        {children}
    </AuthContext.Provider>
)


}

//custom hook every hook starts with use so wiht this we can easily update or change our states with useAuth.thats why we do it otherwise we did it using props
const useAuth = () => useContext(AuthContext)

export {useAuth,AuthProvider}





















