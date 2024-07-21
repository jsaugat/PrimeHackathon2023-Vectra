import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGesture } from '@use-gesture/react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Gesture() {
  const loco = useLocation();
  const navigate = useNavigate();

  const [tapped, setTapped] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  let longPressTimeout;

  const bind = useGesture({
    onPointerDown: (state) => {
      longPressTimeout = setTimeout(() => {
        // Trigger your function here
        if (loco.pathname === "/") {
          navigate("/imgcaption");
        } else if (loco.pathname === "/imgcaption") {
          navigate("/location");
        } else if (loco.pathname === "/location") {
          navigate("/speechtotext");
        } else if (loco.pathname === "/speechtotext") {
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


  const bindGesture = useGesture({
    onDoubleClick: (state) => {
      console.log('Double tap detected!');
      setTapped(true);
      setTapCount(prevCount => prevCount + 1);
      
      setTimeout(() => {
        setTapped(false);
      }, 1000);
    },
  });

  // speech
  const [command, setCommand] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    commands: [
      {
        command: ['Go to * page', 'Open * page', 'Go to *', 'Open *'],
        callback: (page) => {
          // Define your pages and their routes
          const routes = {
            'home': '/',
            'object detection': '/objectdetection',
            'image caption': '/imgCaption',
            'location': '/location',
          };
          if (routes[page.toLowerCase()]) {
            navigate(routes[page.toLowerCase()]);
          } else {
            alert('Page not found');
          }
        }
      }
    ]
  });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div style={{ backgroundImage: ' radial-gradient(circle, rgba(4,0,59,1) 0%, rgba(0,0,0,1) 100%)', height:"100%" }}  className='pt-5 gesture section bg-cyan-500' {...bind() }>
    <div className='absolute bottom-20'>
    <div style={{width:"360px" ,height:"60px"}} className="absolute left-4 bg-white border shadow-md mx-auto grid gap-3">
      <div className="flex justify-between w-full">
        <button className=' p-0.5 w-1/2 px-2.5 bg-blue-500 text-white' onClick={SpeechRecognition.startListening}></button>
        <button className=' p-0.5 w-1/2 px-2.5 bg-red-500 text-white' onClick={SpeechRecognition.stopListening}></button>
      </div>
    </div>
    </div>

    </div>
  );
}
