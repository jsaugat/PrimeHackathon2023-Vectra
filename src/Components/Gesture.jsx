import React, { useEffect, useState } from 'react';
import { useDrag } from '@use-gesture/react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Gesture() {

    const loco = useLocation();

    const navigate = useNavigate();

    const [chage, setChage] = useState(false)

    const binnd = useDrag( ({ swipe:[swipeX], movement: [moveX]} )=>{
       
      if( moveX < 0 ){
       
        if( loco.pathname === "/home" ){
         if(chage){
          navigate("/imgcaption"); 
         } 
         
        }else if( loco.pathname === "/imgcaption" ){
          navigate("/testmode1");
        }else if( loco.pathname === "/testmode1" ){
          navigate("/testmode2");
        }else if( loco.pathname === "/testmode2" ){
          navigate("/home");
        }

        setTimeout(() => {
          setChage(true)
        }, 1000); 
       
      }else {
        console.log("ulta vayo");
      }

      } );
  
      console.log()

  return (
    <div style={{height:"100%"}} className='pt-5 gesture section  bg-cyan-500 ' {...binnd()} >
          
          </div>
  )
}
