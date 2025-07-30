let flashcards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "2 + 2 equals?", answer: "4" },
  { question: "HTML stands for?", answer: "HyperText Markup Language" }
];

let currentCard = 0;
let flipped = false;

const card = document.getElementById("flashcard");
const cardInner = document.getElementById("cardInner");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");

function showCard(index) {
  const cardData = flashcards[index];
  cardFront.textContent = cardData.question;
  cardBack.textContent = cardData.answer;
  card.classList.remove("flipped");
  flipped = false;
}

function flipCard() {
  card.classList.toggle("flipped");
  flipped = !flipped;
}

function nextCard() {
  currentCard = (currentCard + 1) % flashcards.length;
  showCard(currentCard);
}

function prevCard() {
  currentCard = (currentCard - 1 + flashcards.length) % flashcards.length;
  showCard(currentCard);
}

function addCard() {
  const q = document.getElementById("newQuestion").value.trim();
  const a = document.getElementById("newAnswer").value.trim();
  if (q && a) {
    flashcards.push({ question: q, answer: a });
    currentCard = flashcards.length - 1;
    showCard(currentCard);
    clearInputs();
  }
}

function editCard() {
  const q = document.getElementById("newQuestion").value.trim();
  const a = document.getElementById("newAnswer").value.trim();
  if (q && a && flashcards.length > 0) {
    flashcards[currentCard] = { question: q, answer: a };
    showCard(currentCard);
    clearInputs();
  }
}

function deleteCard() {
  if (flashcards.length === 0) return;
  flashcards.splice(currentCard, 1);
  currentCard = Math.max(0, currentCard - 1);
  if (flashcards.length > 0) showCard(currentCard);
  else {
    cardFront.textContent = "No cards!";
    cardBack.textContent = "";
    card.classList.remove("flipped");
  }
}

function clearInputs() {
  document.getElementById("newQuestion").value = "";
  document.getElementById("newAnswer").value = "";
}

// Show first card on load
window.onload = () => showCard(currentCard);
