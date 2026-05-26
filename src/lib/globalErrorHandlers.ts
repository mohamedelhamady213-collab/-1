export function initGlobalErrorHandlers() {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('error', (event) => {
    console.error('Unhandled browser error:', event.error ?? event.message, event);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });
}
