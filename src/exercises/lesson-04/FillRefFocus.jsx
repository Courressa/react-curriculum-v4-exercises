// TOPIC: Correct useRef usage to control DOM elements
// TASK: Implement focusing an input field when the button is clicked.

import { useRef } from 'react';
export default function FillRefFocus() {
  const refFocus = useRef(null);

  function focusInput() {
    refFocus.current.focus();
  }

  return (
    <div>
      <h2>useRef: Focusing an Input</h2>

      <input ref={refFocus} type="text" placeholder="Type here..." />

      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
