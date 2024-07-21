import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

export const SpeechToText = () => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [loading, setLoading] = useState(false);
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    if (transcript.toLowerCase().includes('hello sanu')) {
      setAwake(true);
      resetTranscript();
      const utterance = new SpeechSynthesisUtterance("How can I help you today?");
      window.speechSynthesis.speak(utterance);
    } else if (awake && transcript && !listening) {
      handleGeminiAPI(transcript);
    }
  }, [transcript, listening]);

  const handleVoiceCommand = async () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      await SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleGeminiAPI = async (command) => {
    setLoading(true);
    console.log('Command:', command);

    try {
      const apiKey = 'AIzaSyDrLW5Q9ulAs4gX3xlmBLFIZLL3Pr8NVl0';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

      const response = await axios.post(apiUrl, {
        prompt: command,
      });

      console.log('API Response:', response);

      const generatedText = response.data.candidates[0]?.content?.parts[0]?.text || 'No text generated';
      console.log('Generated Text:', generatedText);

      if ('speechSynthesis' in window) {
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
      setAwake(false);
    }
  };

  return (
    <div>
      <button onClick={handleVoiceCommand}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Status: {awake ? 'Awake' : 'Asleep'}</p>
      <p>Transcript: {transcript}</p>
    </div>
  );
};