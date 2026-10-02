export default function Toast({ toast, onClose }) {
  if (!toast) return null

  return (
    <div className={`toast-notification ${toast.type || 'info'}`} role="status">
      <div className="toast-content">
        <span className="toast-icon">{toast.icon || '✨'}</span>
        <span className="toast-message">{toast.message}</span>
      </div>
      <button className="toast-close-btn" onClick={onClose} aria-label="Close notification">
        ✕
      </button>
    </div>
  )
}
