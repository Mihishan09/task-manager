import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext({ success: () => {}, error: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const push = useCallback((type, message) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => remove(id), 3000);
  }, [remove]);

  const api = useMemo(() => ({
    success: (msg) => push('success', msg),
    error: (msg) => push('error', msg),
  }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded-xl shadow-lg border backdrop-blur text-sm ${
              t.type === 'success'
                ? 'bg-emerald-900/80 border-emerald-700/50 text-emerald-200'
                : 'bg-red-900/80 border-red-700/50 text-red-200'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}


