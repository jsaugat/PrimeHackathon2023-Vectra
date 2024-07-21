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
    <div className="absolute left-4 bg-white border shadow-md rounded-xl w-fit p-4 px-6 mx-auto m-4 grid gap-3">
      <div className="flex gap-3 mx-auto">
        <button className='rounded-full p-0.5 px-2.5 bg-blue-500 text-white' onClick={SpeechRecognition.startListening}>Start</button>
        <button className='rounded-full p-0.5 px-2.5 bg-red-500 text-white' onClick={SpeechRecognition.stopListening}>Stop</button>
        <button className='rounded-full p-0.5 px-2.5 bg-neutral-500 text-white' onClick={resetTranscript}>Reset</button>
      </div>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceAssist;
