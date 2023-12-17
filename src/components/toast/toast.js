import React, { useState, useEffect } from 'react';
import './toast.css'; // 스타일링 파일을 따로 생성

const Toast = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible ? (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
    </div>
  ) : null;
};

export default Toast;
