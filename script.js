document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Quiz Functionality
    const quizQuestions = [
        {
            question: "What is the correct form of the verb in this sentence: 'She _____ to school every day.'?",
            options: ["go", "goes", "going", "gone"],
            answer: 1
        },
        {
            question: "Which sentence is in the present continuous tense?",
            options: [
                "I eat breakfast at 7 AM.",
                "I am eating breakfast now.",
                "I ate breakfast an hour ago.",
                "I have eaten breakfast."
            ],
            answer: 1
        },
        {
            question: "Identify the noun in this sentence: 'The quick brown fox jumps over the lazy dog.'",
            options: ["quick", "fox", "jumps", "lazy"],
            answer: 1
        },
        {
            question: "What is the past participle of 'write'?",
            options: ["write", "wrote", "written", "writed"],
            answer: 2
        }
    ];
    
    let currentQuestion = 0;
    const quizQuestionElement = document.getElementById('quiz-question');
    const quizOptionsElement = document.querySelector('.quiz-options');
    const quizFeedbackElement = document.getElementById('quiz-feedback');
    const quizNextButton = document.getElementById('quiz-next');
    
    function loadQuestion() {
        const question = quizQuestions[currentQuestion];
        quizQuestionElement.innerHTML = `<p>${question.question}</p>`;
        
        quizOptionsElement.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(index));
            quizOptionsElement.appendChild(button);
        });
        
        quizFeedbackElement.textContent = '';
        quizNextButton.style.display = 'none';
    }
    
    function checkAnswer(selectedIndex) {
        const question = quizQuestions[currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === question.answer) {
                option.style.backgroundColor = 'red';
                option.style.color = 'white';
                option.style.borderColor = 'red';
            } else if (index === selectedIndex && index !== question.answer) {
                option.style.backgroundColor = 'red';
                option.style.color = 'white';
                option.style.borderColor = 'red';
            }
        });
        
        if (selectedIndex === question.answer) {
            quizFeedbackElement.textContent = 'Correct! Well done.';
            quizFeedbackElement.style.color =' green';
        } else {
            quizFeedbackElement.textContent = `Incorrect. The correct answer is "${question.options[question.answer]}".`;
            quizFeedbackElement.style.color = 'red';
        }
        
        quizNextButton.style.display = 'block';
    }
    
    quizNextButton.addEventListener('click', function() {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            quizQuestionElement.innerHTML = '<p>Quiz completed! You can try again if you want.</p>';
            quizOptionsElement.innerHTML = '';
            quizFeedbackElement.textContent = '';
            quizNextButton.textContent = 'Restart Quiz';
            currentQuestion = 0;
        }
    });
    
    // Initialize the quiz
    loadQuestion();
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
});
// Shared functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Live time display
    function updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            timeElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
    
    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', function() {
            chatbotWindow.classList.toggle('active');
        });
    }
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotWindow.classList.remove('active');
        });
    }
    
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        if (chatbotMessages) {
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }
    
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        if (chatbotMessages) {
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }
    
    if (chatbotSend && chatbotInput) {
        chatbotSend.addEventListener('click', function() {
            const message = chatbotInput.value.trim();
            if (message) {
                addUserMessage(message);
                chatbotInput.value = '';
                
                // Simple bot responses
                setTimeout(() => {
                    if (message.toLowerCase().includes('present simple')) {
                        addBotMessage("The Present Simple tense is used for habits, routines, and general truths. For example: 'She works in a bank.'");
                    } else if (message.toLowerCase().includes('contact')) {
                        addBotMessage("You can reach us through our contact page or email us at info@educhat.com");
                    } else if (message.toLowerCase().includes('team') || message.toLowerCase().includes('about')) {
                        addBotMessage("Our team consists of Arik Al Ahsan (Developer) and Zaki Al Abid (Founder). Visit our about page for more information.");
                    } else {
                        addBotMessage("I'm a simple grammar helper. Try asking about specific topics like 'present simple', 'contact info', or 'about team' for more detailed answers.");
                    }
                }, 1000);
            }
        });
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (chatbotSend) chatbotSend.click();
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
});