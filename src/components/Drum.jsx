import { useState, useRef, useEffect } from "react";
import Range from "./Range";
import Switch from "./Switch";

export default function Drum() {
  const [text , setText] = useState("")
  const [isPower, setIsPower] = useState(true);
  const [activeKey, setActiveKey] = useState(null);
  const [volume , setVolume] = useState(0.5)
  const [audios, setAudios] = useState([
    {
      key: "Q",
      value: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      text: "Heater 1",
    },
    {
      key: "W",
      value: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      text: "Heater 2",
    },
    {
      key: "E",
      value: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      text: "Heater 3",
    },
    {
      key: "A",
      value: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      text: "Heater 4",
    },
    {
      key: "S",
      value: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      text: "Clap",
    },
    {
      key: "D",
      value: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      text: "Open HH"
    },
    {
      key: "Z",
      value: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      text: "Kick n' Hat"
    },
    {
      key: "X",
      value: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      text: "Kick"
    },
    {
      key: "C",
      value: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      text: "Closed HH"
    },
  ]);

  const DrumPad = () =>
    audios.map((audio) => (
      <button
        key={audio.key}
        className={`drum-pad ${activeKey === audio.key ? "active" : ""}`}
        onClick={() => handlePlay(audio)}
        type="button"
      >
        <span>{audio.key}</span>
        <audio hidden src={audio.value}></audio>
      </button>
    ));

  const handlePlay = (audio) => {
    setText(audio.text)
    if(isPower) {
      const audioElement = new Audio(audio.value);
      audioElement.volume = volume
      audioElement.play();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const pressedKey = event.key.toUpperCase();
      const audio = audios.find((audio) => audio.key === pressedKey);
      if (audio && isPower) {
        handlePlay(audio);
        setActiveKey(pressedKey);
        
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [audios, isPower]);

  return (
    <main className="drum-panel">
      <div className="drum-left">
        <DrumPad />
      </div>
      <div className="drum-right">
        <div>
          <Switch label='isPower' defaultOn={isPower} onChange={setIsPower}/>
        </div>
        <div className="drum-text">
          {text}
        </div>
        <div>
          <Range defaultVal={volume} min={parseFloat(0.0)} max={parseFloat(1.0)}  onChange={setVolume}/>
        </div>
      </div>
    </main>
  );
}
