import React, { useEffect, useState } from 'react';

interface SpeechRecognitionProps {
  lang: string;
  toggle: boolean;
  setText: (text: string) => void;
}

const SpeechRecognitionComponent: React.FC<SpeechRecognitionProps> = ({ lang, toggle, setText }) => {
  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) {
      console.error("このブラウザはSpeechRecognitionをサポートしていません。");
      return;
    }

    let recognition: any;
    if (toggle) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onresult = (event: any) => {
        const { transcript } = event.results[event.results.length - 1][0];
        setText(transcript);
      };

      recognition.onend = () => {
        setText(""); // 会話が止まった際にテキストをクリア
        if (toggle) {
          recognition.start();
        }
      };

      recognition.start();
    }

    return () => {
      if (recognition) {
        recognition.stop();
        recognition.onend = null; // イベントハンドラの解除
      }
    };
  }, [lang, toggle, setText]);

  return null;
};

export default SpeechRecognitionComponent;
