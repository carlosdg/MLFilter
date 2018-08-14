export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js').then(console.log).catch(console.error)
  }
}
