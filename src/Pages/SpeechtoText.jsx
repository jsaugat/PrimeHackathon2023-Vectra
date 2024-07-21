import React, { useState, useCallback, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

export const SpeechToText = () => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [answer, setAnswer] = useState('');
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const speechSynthesisRef = useRef(null);  // Ref to manage speech synthesis

  const handleVoiceCommand = useCallback(async () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    if (listening) {
      // Stop listening and send the transcription to Gemini API
      SpeechRecognition.stopListening();
      await handleGeminiAPI(transcript);
    } else {
      // Interrupt any ongoing speech
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
      // Start listening
      await SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening, transcript]);

  const handleGeminiAPI = async (command) => {
    setGeneratingAnswer(true);
    setAnswer('Loading your answer... \n It might take up to 10 seconds');
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDrLW5Q9ulAs4gX3xlmBLFIZLL3Pr8NVl0`,
        {
          contents: [{ parts: [{ text: command }] }],
        }
      );

      const generatedText = response.data.candidates[0]?.content?.parts[0]?.text || 'No text generated';
      setAnswer(generatedText);

      // Speak the generated text
      speak(generatedText);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
      speak("Sorry - Something went wrong. Please try again!");
    } finally {
      setGeneratingAnswer(false);
      resetTranscript(); // Clear the transcript after processing
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesisRef.current = utterance;  // Save the utterance in ref
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech Synthesis is not supported in this browser.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 h-screen p-3 flex flex-col justify-center items-center">
      <button
        onClick={handleVoiceCommand}
        className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ${
          generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={generatingAnswer}
      >
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
        <p className="p-4">Transcript: {transcript}</p>
        <p className="p-4">Response: {answer}</p>
      </div>
    </div>
  );
};
