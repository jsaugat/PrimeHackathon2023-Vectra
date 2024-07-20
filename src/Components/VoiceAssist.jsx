import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const VoiceAssist = () => {
  const navigate = useNavigate(); // Create a navigate function using useNavigate
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
    <div className="border shadow-lg rounded-xl w-fit p-4 px-6 mx-auto m-4 grid gap-3">
      <span>🎤 Microphone - <span className="font-semibold">{listening ? 'ON' : 'OFF'}</span></span>
      <div className="flex gap-3">
        <button className='rounded-full p-0.5 px-2 bg-blue-300' onClick={SpeechRecognition.startListening}>Start</button>
        <button className='rounded-full p-0.5 px-2 bg-red-300' onClick={SpeechRecognition.stopListening}>Stop</button>
        <button className='rounded-full p-0.5 px-2 bg-neutral-300' onClick={resetTranscript}>Reset</button>
      </div>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceAssist;
