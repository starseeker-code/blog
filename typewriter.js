const phrases = [
  "Backend Developer",
  "DevOps Specialist",
  "Data and AI Engineer",
  "Software Professor",
  "Python and Go Expert",
  "Cloud Systems Architect"
];

const typedText = document.querySelector(".typed-text");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  const currentText = currentPhrase.substring(0, charIndex);
  typedText.textContent = currentText;
  
  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
    setTimeout(type, 120);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 200); // Short delay when starting new phrase
    } else {
      setTimeout(type, 2000); // Long delay after phrase is fully typed
    }
  }
}

type();
