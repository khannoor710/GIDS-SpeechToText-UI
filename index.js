// Polyfill global for browser environments
if (typeof global === 'undefined') {
    window.global = window;
}