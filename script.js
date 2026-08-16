/*
  VerdictAI — script.js
  =====================
  THIS FILE IS YOURS.

  The entire premium frontend (HTML + CSS + Bootstrap) is ready.
  You will learn JavaScript step by step and connect behavior here.

  DO NOT paste complete solutions from AI.
  Learning happens when YOU type and think.

  -------------------------------------------------
  Useful element IDs waiting for your JavaScript:
  -------------------------------------------------
  Navigation:     #nav-toggle, #nav-links, #theme-toggle, #scroll-progress
  Auth:           #login-form, #register-form, #email, #password, #email-error
  Upload:         #file-input, #dropzone, #upload-progress, #upload-bar,
                  #upload-status, #upload-result, #uploaded-name, #uploaded-meta
  Workspace:      #question-input, #ask-form, #ask-button, #chat-messages,
                  #typing-indicator, #suggestions, #pdf-viewer, #current-page,
                  #zoom-in, #zoom-out, #zoom-level
  Documents:      #doc-search, #documents-grid
  Settings:       #theme-preset, #accent-picker, #motion-intensity, #density
  Dashboard:      #stat-docs, #stat-questions, #stat-citations, #storage-bar

  Current course stage: Evaluations 1–2
  (Introduction to JS, variables, data types)

  Write your code BELOW this comment block when your teacher asks.
*/


//for mobile view--------
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
    // Open/close mobile menu
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ========== THEME TOGGLE (DARK/LIGHT MODE) ==========
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  // Load saved theme preference on page load
  window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('verdictai-theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      updateThemeIcon(true);
    } else {
      document.body.classList.remove('light-mode');
      updateThemeIcon(false);
    }
  });

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const isLightMode = document.body.classList.toggle('light-mode');
    
    // Save preference to localStorage
    if (isLightMode) {
      localStorage.setItem('verdictai-theme', 'light');
    } else {
      localStorage.setItem('verdictai-theme', 'dark');
    }
    
    // Update icon
    updateThemeIcon(isLightMode);
  });

  // Helper function to update theme toggle icon
  function updateThemeIcon(isLightMode) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (isLightMode) {
        // Light mode active, show sun icon
        icon.className = 'bi bi-sun-fill';
        themeToggle.title = 'Switch to Dark Mode';
      } else {
        // Dark mode active, show moon icon
        icon.className = 'bi bi-moon-stars';
        themeToggle.title = 'Switch to Light Mode';
      }
    }
  }
}

//scroll effect
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollTop / pageHeight) * 100;

    scrollProgress.style.width = percent + '%';
});

//authentication----
// const loginForm = document.getElementById('login-form');
// const email = document.getElementById('email');
// const emailError = document.getElementById('email-error');
// const password=document.getElementById('password');
// const passwordError=document.getElementById('password-error');
// const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const rememberMe=document.getElementById('remember');
// const savedEmail=localStorage.getItem('savedEmail');
// if(savedEmail){
//   email.value=savedEmail;
// } 

// loginForm.addEventListener('submit',(event) =>{
//   // event.preventDefault();//to avoid reloding as we are just working on ui no google auth
//   if(email.value==''){
//     emailError.textContent='Pleaase Enter Your Email';
//   }
//   else if(!emailPattern.test(email.value)){
//     emailError.textContent='Please Enter a valid Email';
//   }
//   if(password.value==''){
//     passwordError.textContent='Please Enter Your Password';
//   }
//   else if(password.value.length<6){
//     passwordError.textContent='Please Enter a valid Password of length more than 6'
//   }
  
//   else{
//     if(rememberMe.checked){
//   localStorage.setItem('savedEmail',email.value);
// }
//   }
// });
const loginForm = document.getElementById('login-form');

if (loginForm) {

  const email = document.getElementById('email');
  const emailError = document.getElementById('email-error');

  const password = document.getElementById('password');
  const passwordError = document.getElementById('password-error');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const rememberMe = document.getElementById('remember');

  const savedEmail = localStorage.getItem('savedEmail');

  if (savedEmail) {
    email.value = savedEmail;
  }

  loginForm.addEventListener('submit', (event) => {

    if (email.value == '') {
      emailError.textContent = 'Please Enter Your Email';
    }

    else if (!emailPattern.test(email.value)) {
      emailError.textContent = 'Please Enter a valid Email';
    }

    if (password.value == '') {
      passwordError.textContent = 'Please Enter Your Password';
    }

    else if (password.value.length < 6) {
      passwordError.textContent = 'Please Enter a valid Password of length more than 6';
    }

    else {
      if (rememberMe.checked) {
        localStorage.setItem('savedEmail', email.value);
      }
    }

  });

}
//to verify 
// Register validation
const registerForm = document.getElementById('register-form');

if (registerForm) {

  const registerPassword = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm');

  registerForm.addEventListener('submit', (event) => {

    event.preventDefault(); // stop normal form submission

    if (registerPassword.value !== confirmPassword.value) {
      alert('Passwords do not match');
      return;
    }

    alert('Registration successful');

  });

}
//file uplod-----
const fileInput=document.getElementById('file-input');
if(fileInput){//if input given
  const uploadedName = document.getElementById('uploaded-name');
  const uploadedMeta = document.getElementById('uploaded-meta');
  const uploadResult = document.getElementById('upload-result');

  fileInput.addEventListener('change', () => {
    const file=fileInput.files[0];
    if(file){
//for file types
      const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg'
];

if (!allowedTypes.includes(file.type)) {
    alert('Please select a PDF, DOC, DOCX, PNG, or JPG file.');
    return;
}
      const maxSize=10*1024*1024;
      if(file.size>maxSize){
        alert('File must be less then 10 MB.');
        return;
      }
      //to dispaly name and size of file
      uploadedName.textContent=file.name;
      uploadedMeta.textContent=
        file.type+' . '+
        (file.size / 1024 / 1024).toFixed(2)+ 'MB';
      uploadResult.hidden = false;
    }
  });
}
//drag and drop
const dropzone=document.getElementById('dropzone');
if(dropzone){
  dropzone.addEventListener('dragover',(event)=>{
    event.preventDefault();
    dropzone.classList.add('dragging');
  });
  dropzone.addEventListener('dragleave',()=>{
    dropzone.classList.remove('dragging');
  });
  dropzone.addEventListener('drop',(event)=>{
    event.preventDefault();
    dropzone.classList.remove('dragging');
    const file=event.dataTransfer.files[0];
    if(file){
      // console.log(file.name);
      const uploadedName = document.getElementById('uploaded-name');
      const uploadedMeta = document.getElementById('uploaded-meta');
      const uploadResult = document.getElementById('upload-result');
      uploadedName.textContent=file.name;
      uploadedMeta.textContent=
      file.type+' . '+
      (file.size / 1024 / 1024).toFixed(2)+ 'MB';
      uploadResult.hidden=false;
    }
  });
}
//progress simulation-----

//main workspace features ###
//taking input
// const askForm = document.getElementById('ask-form');
// const questionInput = document.getElementById('question-input');
// const chatMessages = document.getElementById('chat-messages');

// if (askForm) {

//     askForm.addEventListener('submit', (event) => {

//         event.preventDefault();

//         const question = questionInput.value;

//         const message = document.createElement('div');

//         message.textContent = question;

//         chatMessages.appendChild(message);

//     });

// }

//Workspace question asking and thinking---

const askForm = document.getElementById('ask-form');
const questionInput = document.getElementById('question-input');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');

if (askForm) {

    askForm.addEventListener('submit', function(event) {

        event.preventDefault();

        const question = questionInput.value.trim();

        if (question === '') {
            return;
        }

        // Create user's message
        const message = document.createElement('div');

        message.classList.add('msg', 'msg-user');

        message.textContent = question;

        // Add message to chat
        chatMessages.appendChild(message);

        // Clear input
        questionInput.value = '';

        // Show AI thinking
        typingIndicator.hidden = false;

        // Hide after 1.5 seconds
        setTimeout(function() {
            typingIndicator.hidden = true;
        }, 1500);

    });

}

//question suggestion
const suggestionButtons = document.querySelectorAll('#suggestions .chip');

suggestionButtons.forEach((button) => {

    button.addEventListener('click', () => {

        const questionInput = document.getElementById('question-input');

        questionInput.value = button.textContent.trim();

        questionInput.focus();

    });

});

//pdf view options zoom and all----
// ===============================
// PDF VIEWER - ZOOM
// ===============================

const zoomIn = document.getElementById('zoom-in');
const zoomOut = document.getElementById('zoom-out');
const zoomLevel = document.getElementById('zoom-level');

let zoom = 100;

if (zoomIn) {

    zoomIn.addEventListener('click', () => {

        zoom = zoom + 10;

        zoomLevel.textContent = zoom + '%';

    });

}

if (zoomOut) {

    zoomOut.addEventListener('click', () => {

        zoom = zoom - 10;

        zoomLevel.textContent = zoom + '%';

    });

}
//page navigation

const currentPage = document.getElementById('current-page');
const pageButtons = document.querySelectorAll('#page-thumbs .thumb');

pageButtons.forEach((button) => {

    button.addEventListener('click', () => {

        const page = button.getAttribute('data-page');

        currentPage.textContent = page;

        pageButtons.forEach((btn) => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

    });

});
//doc search in doc library(documents)

const docSearch = document.getElementById('doc-search');
const documentsGrid = document.getElementById('documents-grid');

if (docSearch && documentsGrid) {

    docSearch.addEventListener('input', () => {

        const searchText = docSearch.value.toLowerCase();

        const documents = documentsGrid.children;

        for (let document of documents) {

            const documentName = document.textContent.toLowerCase();

            if (documentName.includes(searchText)) {
                document.style.display = '';
            } else {
                document.style.display = 'none';
            }

        }

    });

}

