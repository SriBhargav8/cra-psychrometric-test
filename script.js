document.addEventListener("DOMContentLoaded", function () {
    const questionsContainer = document.getElementById("questions-container");
    const submitButton = document.getElementById("submit-button");
    const resultsContainer = document.getElementById("results-container");
    const resultMessage = document.getElementById("result-message");

    const questions = [
        {
            domain: "Sales and Marketing",
            question: "1. How important is product knowledge in sales and marketing?",
            options: ["Not important", "Slightly important", "Moderately important", "Important", "Extremely important"]
        },
        {
            domain: "Sales and Marketing",
            question: "2. Which skill is most crucial in sales:",
            options: ["Communication", "Negotiation", "Product knowledge", "Persistence", "Listening"]
        },
        {
            domain: "Sales and Marketing",
            question: "3. What is the role of market research in sales and marketing?",
            options: ["Gathering customer data", "Setting sales targets", "Managing sales teams", "Product development", "Customer support"]
        },
        {
            domain: "Sales and Marketing",
            question: "4. In a sales presentation, what is essential to gain a potential client's trust?",
            options: ["Data-driven insights", "Simplicity", "Pressure tactics", "Technical jargon", "Exaggeration"]
        },
        {
            domain: "Sales and Marketing",
            question: "5. How would you handle a challenging client who is hesitant to make a purchase?",
            options: ["Offer a discount", "Build rapport", "Push for a quick decision", "Give up and move on", "Ask for a referral"]
        },
        {
            domain: "HR Skills",
            question: "1. What is the primary role of an HR department in an organization?",
            options: ["Managing finances", "Employee development", "Marketing", "Legal affairs", "Product development"]
        },
        {
            domain: "HR Skills",
            question: "2. How do HR professionals contribute to employee satisfaction?",
            options: ["By offering the highest salary", "Through training and development programs", "By increasing workload", "By enforcing strict policies", "By reducing benefits"]
        },
        {
            domain: "HR Skills",
            question: "3. How would you handle a situation where two employees are in a conflict?",
            options: ["Blame both employees", "Fire one of them", "Mediate and find a solution", "Ignore the issue", "Report to senior management"]
        },
        {
            domain: "HR Skills",
            question: "4. Rate your ability to maintain confidentiality and handle sensitive information (1-5):",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            domain: "HR Skills",
            question: "5. What is the significance of diversity and inclusion in the workplace?",
            options: ["Not important", "Slightly important", "Moderately important", "Important", "Extremely important"]
        },
        {
            domain: "Online Presence and Digital Skills",
            question: "1. What is responsive web design, and why is it important?",
            options: ["I don't know", "It's not important", "It ensures websites adapt to various devices", "It helps with email marketing", "It's about website color schemes"]
        },
        {
            domain: "Online Presence and Digital Skills",
            question: "2. What is SEO (Search Engine Optimization), and how does it benefit a website?",
            options: ["I don't know", "It doesn't benefit websites", "It helps improve website rankings in search engines", "It's a type of web design", "It's about website security"]
        },
        {
            domain: "Online Presence and Digital Skills",
            question: "3. What is a content management system (CMS) used for in web development?",
            options: ["I don't know", "It manages customer data", "It's not relevant to web development", "It's a type of digital marketing", "It helps manage website content"]
        },
        {
            domain: "Online Presence and Digital Skills",
            question: "4. Which of the following is NOT a common social media platform for digital marketing?",
            options: ["Facebook", "Twitter", "LinkedIn", "YouTube", "Spotify"]
        },
        {
            domain: "Online Presence and Digital Skills",
            question: "5. Rate your proficiency in digital marketing (1-5):",
            options: ["1", "2", "3", "4", "5"]
        }
    ];

    const userResponses = [];

    let currentQuestion = 0;

    // Load the first question
    displayQuestion();

    function displayQuestion() {
        if (currentQuestion < questions.length) {
            const questionData = questions[currentQuestion];
            const questionHTML = `
                <h3>${questionData.domain} - Question ${currentQuestion + 1}</h3>
                <p>${questionData.question}</p>
                <form id="question-form">
                    ${questionData.options.map((option, index) => `
                        <label>
                            <input type="radio" name="answer" value="${index}">
                            ${option}
                        </label>
                    `).join("")}
                    <button type="submit">Next</button>
                </form>
            `;
            questionsContainer.innerHTML = questionHTML;

            // Add event listener to submit the answer
            const questionForm = document.getElementById("question-form");
            questionForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const selectedAnswer = parseInt(questionForm.answer.value);
                userResponses.push(selectedAnswer);
                currentQuestion++;
                displayQuestion();
            });
        } else {
            showResults();
        }
    }

    function showResults() {
        questionsContainer.style.display = "none";
        submitButton.style.display = "none";

        const salesMarketingScore = calculateScore(0, 4);
        const hrSkillsScore = calculateScore(5, 9);
        const digitalSkillsScore = calculateScore(10, 14);

        let bestFit = "No specific category";
        let maxScore = 0;

        if (salesMarketingScore > maxScore) {
            bestFit = "Sales and Marketing";
            maxScore = salesMarketingScore;
        }

        if (hrSkillsScore > maxScore) {
            bestFit = "HR Skills";
            maxScore = hrSkillsScore;
        }

        if (digitalSkillsScore > maxScore) {
            bestFit = "Online Presence and Digital Skills";
        }

        resultMessage.innerHTML = `Based on your responses, you are best suited for a career in ${bestFit}.`;
        resultsContainer.style.display = "block";
    }

    function calculateScore(startIndex, endIndex) {
        let score = 0;
        for (let i = startIndex; i <= endIndex; i++) {
            score += userResponses[i];
        }
        return score;
    }
});
