/* ============================================================
   Cedarville Schools - Rule-Based Chatbot
   NO API or external services. Loads its knowledge base from
   /data/chatbot-responses.json so non-developers can edit
   responses without touching this file. See CMS-GUIDE.md.
   ============================================================ */

let chatbotData = null;
let lastFallbackIndex = -1;

async function loadChatbotData() {
  try {
    const res = await fetch('data/chatbot-responses.json', { cache: 'no-cache' });
    chatbotData = await res.json();
  } catch (err) {
    console.warn('Chatbot: could not load knowledge base, using minimal fallback.', err);
    chatbotData = {
      responses: {
        greeting: "Hello! Welcome to Cedarville Private Schools. How can I help you today?",
        fallback: "I'm having trouble reaching my knowledge base right now. Please call us at +234 813 745 1764."
      },
      keywords: { greeting: ["hello", "hi", "hey"] }
    };
  }
}

function pickResponse(value) {
  if (Array.isArray(value)) {
    // Avoid repeating the exact same line twice in a row for topics with variants
    let idx = Math.floor(Math.random() * value.length);
    if (value.length > 1 && idx === lastFallbackIndex) idx = (idx + 1) % value.length;
    lastFallbackIndex = idx;
    return value[idx];
  }
  return value;
}

function matchResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  if (!chatbotData) return "One moment, still loading...";

  for (const [category, words] of Object.entries(chatbotData.keywords)) {
    for (const word of words) {
      if (input.includes(word)) {
        return pickResponse(chatbotData.responses[category] || chatbotData.responses.fallback);
      }
    }
  }
  return pickResponse(chatbotData.responses.fallback);
}

function appendMessage(text, sender) {
  const messages = document.getElementById('chatbot-messages');
  if (!messages) return;
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  // Preserve intentional line breaks in bot responses (e.g. numbered lists)
  text.split('\n').forEach((line, i) => {
    if (i > 0) div.appendChild(document.createElement('br'));
    div.appendChild(document.createTextNode(line));
  });
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTypingIndicator() {
  const messages = document.getElementById('chatbot-messages');
  if (!messages) return null;
  const div = document.createElement('div');
  div.className = 'chat-msg bot chat-typing';
  div.setAttribute('aria-label', 'Cedarville assistant is typing');
  div.innerHTML = '<span></span><span></span><span></span>';
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

async function sendMessage(text) {
  const input = document.getElementById('chatbot-input-field');
  const msg = text || (input ? input.value.trim() : '');
  if (!msg) return;

  appendMessage(msg, 'user');
  if (input) input.value = '';

  if (!chatbotData) await loadChatbotData();

  const typingEl = showTypingIndicator();
  const delay = 350 + Math.random() * 350;
  setTimeout(() => {
    if (typingEl) typingEl.remove();
    appendMessage(matchResponse(msg), 'bot');
  }, delay);
}

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('chatbot-btn');
  const win = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const sendBtn = document.getElementById('chatbot-send');
  const inputField = document.getElementById('chatbot-input-field');
  const quickBtns = document.querySelectorAll('.quick-btn');
  const messagesEl = document.getElementById('chatbot-messages');

  if (messagesEl) messagesEl.setAttribute('aria-live', 'polite');

  loadChatbotData();

  if (!btn) return;

  btn.addEventListener('click', async function () {
    win.classList.toggle('open');
    if (win.classList.contains('open') && messagesEl && messagesEl.children.length === 0) {
      if (!chatbotData) await loadChatbotData();
      setTimeout(() => appendMessage(pickResponse(chatbotData.responses.greeting), 'bot'), 200);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', () => win.classList.remove('open'));
  if (sendBtn) sendBtn.addEventListener('click', () => sendMessage());

  if (inputField) {
    inputField.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') sendMessage();
    });
  }

  quickBtns.forEach((b) => b.addEventListener('click', () => sendMessage(b.dataset.msg)));
});
