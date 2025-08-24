import { useImperativeHandle, forwardRef, useState, useEffect } from "react";

const ConfirmModal = forwardRef(({ confirm, abort }, ref) => {
  const [styles, setStyles] = useState(["modal-container"]);
  const [message, setMessage] = useState("");
  const [isVisible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show(msg) {
      setMessage(msg);
      setStyles(["modal-container", "show"]);
      setVisible(true);
    },
    hide() {
      setStyles(["modal-container"]);
      setVisible(false);
    },
  }));

  const onConfirm = () => {
    ref.current.hide();
    confirm?.();
  };

  const onAbort = () => {
    ref.current.hide();
    abort?.();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isVisible) {
        ref.current.hide();
        abort?.();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, abort, ref])

  return (
    <div className={styles.join(' ')} onClick={onAbort}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onAbort}>No</button>
        </div>
      </div>
    </div>
  )
});

export default ConfirmModal;