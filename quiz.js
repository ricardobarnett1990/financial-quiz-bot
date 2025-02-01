// =====================
// QUIZ CONFIGURATION
// =====================
const quizData = {
  start: {
    question: "What's your primary financial goal?",
    answers: [
      { text: "🏠 Property Investment", next: "property" },
      { text: "🌴 Retirement Planning", next: "retirement" },
      { text: "💼 Business Legacy Building", next: "legacy" }
    ]
  },
  property: [
    {
      question: "How much emergency fund do you maintain?",
      answers: [
        { text: "<3 months expenses", score: 1, gap: "Emergency fund too small" },
        { text: "3-6 months", score: 3 },
        { text: ">6 months", score: 5 }
      ]
    },
    {
      question: "How do you evaluate rental properties?",
      answers: [
        { text: "Purchase price alone", score: 1, gap: "Lacking cash flow analysis" },
        { text: "Price + local amenities", score: 3 },
        { text: "Full market analysis", score: 5 }
      ]
    }
  ],
  // Add retirement/legacy sections similarly
};

// =====================
// QUIZ ENGINE (DON'T TOUCH)
// =====================
let currentSection = 'start';
let totalScore = 0;
let identifiedGaps = [];

function displayQuestion() {
  const container = document.getElementById('question');
  const answersDiv = document.getElementById('answers');
  
  if (currentSection === 'start') {
    const data = quizData.start;
    container.innerHTML = `<h2>${data.question}</h2>`;
    answersDiv.innerHTML = data.answers.map(answer => `
      <button class="answer-btn" onclick="nextSection('${answer.next}')">
        ${answer.text}
      </button>
    `).join('');
  } else {
    const questions = quizData[currentSection];
    const question = questions[0];
    
    container.innerHTML = `<h2>${question.question}</h2>`;
    answersDiv.innerHTML = question.answers.map(answer => `
      <button class="answer-btn" onclick="handleAnswer(${answer.score}, '${answer.gap || ''}')">
        ${answer.text}
      </button>
    `).join('');
  }
}

function nextSection(section) {
  currentSection = section;
  displayQuestion();
}

function handleAnswer(score, gap) {
  totalScore += score;
  if (gap) identifiedGaps.push(gap);
  endQuiz(); // For simplicity - add more questions later
}

function endQuiz() {
  document.getElementById('question').innerHTML = `
    <h2>Quiz Complete!</h2>
    <p>Your financial preparedness score: ${totalScore}/10</p>
    ${identifiedGaps.length ? 
      `<p>Key areas to improve:<br>${identifiedGaps.join('<br>')}</p>` : 
      '<p>Great financial foundation!</p>'}
  `;
  document.getElementById('answers').innerHTML = '';
  document.getElementById('lead-form').style.display = 'block';
}

// Start quiz when page loads
document.addEventListener('DOMContentLoaded', displayQuestion);
