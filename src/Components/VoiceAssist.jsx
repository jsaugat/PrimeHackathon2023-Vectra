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
            'image caption': '/imgCaption'
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
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceAssist;
