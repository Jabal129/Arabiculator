// App.jsx — changes highlighted
import React, { useState } from "react";
import PhonemeInputPage from "./components/PhonemeInputPage";
import SystemChoicePage from "./components/SystemChoicePage";
import ResultPage from "./components/ResultPage";
import { mapWithTa2wil } from "./components/MappingLogic";
import Header from "./components/Header";

export default function App() {
  const [step, setStep] = useState(1);
  const [consonants, setConsonants] = useState([]);
  const [vowels, setVowels] = useState([]);
  const [mapping, setMapping] = useState({});
  const [system, setSystem] = useState("abjad"); // <-- NEW

  const handleNext = (selectedConsonants, selectedVowels) => {
    setConsonants(selectedConsonants);
    setVowels(selectedVowels);
    setStep(2);
  };

  const handleSystemSelect = (chosenSystem) => {
    console.log("System selected:", chosenSystem);
    setSystem(chosenSystem); // <-- NEW: store the user choice
    const map = mapWithTa2wil(consonants, vowels, chosenSystem);
    setMapping(map);
    setStep(3);
  };

  const handleRestart = () => {
    setConsonants([]);
    setVowels([]);
    setMapping({});
    setSystem("abjad"); // optionally reset
    setStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0fff3] text-black">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="mb-4"></div>
        {step === 1 && <PhonemeInputPage onNext={handleNext} />}
        {step === 2 && <SystemChoicePage onSelectSystem={handleSystemSelect} />}
        {step === 3 && (
          <ResultPage
            mapping={mapping}
            onRestart={handleRestart}
            system={system} // <-- PASS system to ResultPage (and ArabicKeyboard)
          />
        )}
      </div>
    </div>
  );
}
