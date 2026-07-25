// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render
import { useRef } from 'react';
export default function FindCorrectHook() {
  const clickCount = useRef(1);
  const countDisplay = useRef(null);

  function handleClick() {
    countDisplay.current.textContent = `${clickCount.current++} Clicks`;
  }

  return (
    <div>
      <h2>useRef vs useState Decision</h2>
      <button onClick={handleClick} ref={countDisplay}>
        0 Clicks
      </button>
    </div>
  );
}
