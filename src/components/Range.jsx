
export default function Range({ defaultVal, min , max , onChange }) {
  const handleRangeChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };
  return (
    <input
      type="range"
      value={defaultVal}
      onChange={handleRangeChange}
      min={min}
      max={max}
      step={0.01}
    />
  );
}
