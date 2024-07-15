window.global = window;
// Polyfill global for browser environments
if (typeof global === 'undefined') {
    var global = window;
}