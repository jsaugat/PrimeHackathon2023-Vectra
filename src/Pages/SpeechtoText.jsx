// src/SpeechToText.js
import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

export const SpeechToText = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [loading, setLoading] = useState(false);

  const handleVoiceCommand = async () => {
    if (transcript) {
      setLoading(true);
      console.log('Transcript:', transcript); // Log the transcript

      try {
        const apiKey = 'AIzaSyDrLW5Q9ulAs4gX3xlmBLFIZLL3Pr8NVl0';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        // Send POST request to the API
        const response = await axios.post(apiUrl, {
          prompt: transcript,
          // Add any additional parameters required by the API
        });

        console.log('API Response:', response); // Log the full response

        // Extract generated text from the response
        const generatedText = response.data.candidates[0].content.parts[0].text || 'No text generated';
        console.log('Generated Text:', generatedText); // Log the generated text

        if ('speechSynthesis' in window) {
          // Text-to-Speech using Web Speech API
          const utterance = new SpeechSynthesisUtterance(generatedText);
          window.speechSynthesis.speak(utterance);
        } else {
          console.error('Speech Synthesis is not supported in this browser.');
        }
      } catch (error) {
        console.error('Error fetching data from API', error);
      } finally {
        setLoading(false);
        resetTranscript();
      }
    }
  };

  return (
    <div>
      <button onClick={handleVoiceCommand} disabled={loading}>
        {loading ? 'Processing...' : 'Speak'}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};
