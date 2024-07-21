import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGesture } from '@use-gesture/react';

export default function Gesture() {
  const loco = useLocation();
  const navigate = useNavigate();
  const [chage, setChage] = useState(false);

  let longPressTimeout;

  const bind = useGesture({
    onPointerDown: (state) => {
      longPressTimeout = setTimeout(() => {
        // Trigger your function here
        if (loco.pathname === "/") {
          navigate("/imgcaption");
        } else if (loco.pathname === "/imgcaption") {
          navigate("/testmode1");
        } else if (loco.pathname === "/testmode1") {
          navigate("/testmode2");
        } else if (loco.pathname === "/testmode2") {
          navigate("/");
        }
      }, 500); 
    },
    onPointerUp: () => {
      clearTimeout(longPressTimeout); 
    },
    onPointerCancel: () => {
      clearTimeout(longPressTimeout);  
    },
  });

  return (
    <div style={{ backgroundImage: 'radial-gradient(circle, rgba(4,0,59,1) 0%, rgba(0,0,0,1) 100%)', height:"100%" }}  className='pt-5 gesture section bg-cyan-500' {...bind()}>
     
    </div>
  );
}
