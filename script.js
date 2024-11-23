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
document.getElementById('signupButton').addEventListener('click', () => {
  const signupFormHtml = `
    <form id="signupForm">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      
      <button type="submit">Sign Up</button>
    </form>
    <div id="message" style="margin-top: 20px;"></div>
  `;
  
  const signupContainer = document.getElementById('signupContainer');
  signupContainer.innerHTML = signupFormHtml;
  signupContainer.style.display = 'block';
  
  // Add the form submission logic
  document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Replace with your API endpoint
    const apiEndpoint = 'https://your-api-endpoint.com/signup';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      const messageDiv = document.getElementById('message');
      if (response.ok) {
        messageDiv.innerHTML = `<p style="color: green;">${result.message}</p>`;
      } else {
        messageDiv.innerHTML = `<p style="color: red;">Error: ${result.message}</p>`;
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').innerHTML = `<p style="color: red;">An error occurred. Please try again.</p>`;
    }
  });
});
