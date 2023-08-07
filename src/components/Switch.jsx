import { useState } from "react";
export default function Switch({ label, defaultOn, onChange }) {
  const [on, setOn] = useState(defaultOn);

  const handleToggle = () => {
    const newOn = !on;
    setOn(newOn);

    // 调用父组件传递的回调函数，将开关状态传递给父组件
    if (onChange) {
      onChange(newOn);
    }
  };
  return (
    <div className="switch-container">
    <p className="switch-label">{label}</p>
      <div className={`switch ${on ? "on" : "off"}`} onClick={handleToggle}>
        {/* <span className="label">{label}</span> */}
        <div className={`slider ${on ? "on" : "off"}`} />
      </div>
    </div>
  );
}
