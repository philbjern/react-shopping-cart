import { useImperativeHandle, forwardRef, useState, useEffect } from "react";

const ConfirmModal = forwardRef((props, ref) => {
  const [styles, setStyles] = useState(["modal-container"]);
  const [message, setMessage] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [onConfirmHandler, setOnConfirmHandler] = useState(() => {});
  const [onAbortHandler, setOnAbortHandler] = useState(() => {});
  
  useImperativeHandle(ref, () => ({
    show(msg, onConfirm = () => {}, onAbort = () => {}) {
      setMessage(msg);
      setOnConfirmHandler(() => onConfirm);
      setOnAbortHandler(() => onAbort);
      setStyles(["modal-container", "show"]);
      setVisible(true);
    },
    hide() {
      setStyles(["modal-container"]);
      setVisible(false);
    },
  }));

  const handleConfirm = () => {
    ref.current.hide();
    console.log(onConfirmHandler);
    onConfirmHandler();
  };

  const handleAbort = () => {
    ref.current.hide();
    onAbortHandler();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isVisible) {
        ref.current.hide();
        onAbortHandler();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, ref])

  return (
    <div className={styles.join(' ')} onClick={handleAbort}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleAbort}>No</button>
        </div>
      </div>
    </div>
  )
});

export default ConfirmModal;