let timeoutId = null;

function debounce(callback) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(callback, 200);
}

export { debounce };
