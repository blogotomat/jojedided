// DOM Elements
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const reverseBtn = document.getElementById('reverse-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const notification = document.getElementById('notification');

// Functions
function reverseString(str) {
  return str.split('').reverse().join('');
}

function reverseWords(str) {
  return str.split(' ').map(word => reverseString(word)).join(' ');
}

function updateStats() {
  const text = inputText.value;
  charCount.textContent = text.length;
  wordCount.textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
}

function showNotification(message) {
  notification.textContent = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Event Listeners
reverseBtn.addEventListener('click', () => {
  const text = inputText.value;
  const reverseType = document.querySelector('input[name="reverse-type"]:checked').value;
  const preserveSpaces = document.getElementById('preserve-spaces').checked;
  
  if (!text.trim()) {
    showNotification('Please enter some text first');
    return;
  }
  
  let result;
  if (reverseType === 'all') {
    if (preserveSpaces) {
      // Preserve line breaks and spaces while reversing
      result = text.split('\n').map(line => {
        return line.split(' ').map(word => reverseString(word)).reverse().join(' ');
      }).join('\n');
    } else {
      result = reverseString(text);
    }
  } else {
    result = reverseWords(text);
  }
  
  outputText.value = result;
});

clearBtn.addEventListener('click', () => {
  inputText.value = '';
  outputText.value = '';
  updateStats();
});

copyBtn.addEventListener('click', async () => {
  if (!outputText.value) {
    showNotification('No text to copy');
    return;
  }
  
  try {
    await navigator.clipboard.writeText(outputText.value);
    showNotification('Text copied to clipboard!');
  } catch (err) {
    showNotification('Failed to copy text');
  }
});

inputText.addEventListener('input', updateStats);

// Initialize stats
updateStats();
