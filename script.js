// script.js

// Get references to the HTML elements
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

// Function to save user data to localStorage
function saveUser(id, password) {
  // Create a user object
  const user = { id, password };
  
  // Save the user data as a string in localStorage
  localStorage.setItem(id, JSON.stringify(user));
}

// Function to get user data from localStorage
function getUser(id) {
  // Get the user data from localStorage (returns null if not found)
  const user = localStorage.getItem(id);
  
  // Parse the string back to an object if it exists
  return user ? JSON.parse(user) : null;
}

// Handle the registration form submission
registerForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from refreshing the page
  
  const userId = document.getElementById('registerId').value;
  const password = document.getElementById('registerPassword').value;

  // Check if the user ID already exists
  if (getUser(userId)) {
    messageDiv.textContent = 'User ID already exists. Please choose another one.';
    return;
  }

  // Save the new user
  saveUser(userId, password);
  messageDiv.textContent = `User ${userId} registered successfully!`;
});

// Handle the login form submission
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const loginId = document.getElementById('loginId').value;
  const loginPassword = document.getElementById('loginPassword').value;

  // Get the user data from localStorage
  const user = getUser(loginId);

  // Check if the user exists and the password is correct
  if (user && user.password === loginPassword) {
    messageDiv.textContent = `Welcome, ${loginId}! You have successfully logged in.`;
  } else {
    messageDiv.textContent = 'Invalid ID or password. Please try again.';
  }
});
