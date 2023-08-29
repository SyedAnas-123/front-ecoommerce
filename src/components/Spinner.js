import {React,useEffect,useState} from 'react';
import { useNavigate,useLocation} from 'react-router-dom';



const Spinner = ({path ="login"}) => {
    // making state of count of displaying of loading formean time 
    const [count ,setCount] = useState(3) //initialtimeis 5 secand in setcount nav itto disffeent page 
    const navigate = useNavigate();
    const location = useLocation();


    //creating use effect and at initial time we create a fucnction for it 
    useEffect(  () =>{
        //first get countand its initialtime and use set intervals fucntion  to 1secands and  set count in it  we arefirst setting count timetop 5 sec then use setinterval fucntion and inthis fucntion we set count value and pass the paarmeter of prevvalue means 5 sec and then -- prevalue means we 5-1  then 4-1 thenm 3-1 like that this 1 we giveto it  1000 in interval after whgen 0 value comes of coount after muinus it redirects us to login page and in return we are clearing our interval fucntion 
        const interval = setInterval(()=>{

            setCount((prevValue)=> --prevValue)
        }, 1000);
        count === 0 && navigate(`/${path}`,{
            state :location.pathname , //fromthis we get current path ofuer usisng use Location hook and alos this ho9ok in login page and there in navigate variable where we are navigating it to /means home checkimngconfiiting there 
        })
        //cleanup fucntion interval ko terminate kr dnegen
        return () => clearInterval(interval)
    },[count,navigate,location,path])

  return (
    <>

<div className="d-flex flex-cclumn justify-content-center align-items-center Spinner" style={{height :"100vh" , color: "#45f3ff"}}>
    <h1 className='Text-center' style={{fontFamily: "'Playfair Display', serif" , fontWeight:"500px"}}> Redirecting you to login page in {count} second </h1>
  <div className="spinner-border" style={{margin:  "30px" }} role="status">
   
  </div>
</div>
      
    </>
  );
}

export default Spinner;
