document.getElementById('signupForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Replace the below URL with your backend API endpoint
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

    if (response.ok) {
      document.getElementById('message').innerHTML = `<p style="color: green;">${result.message}</p>`;
    } else {
      document.getElementById('message').innerHTML = `<p style="color: red;">Error: ${result.message}</p>`;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('message').innerHTML = `<p style="color: red;">An error occurred. Please try again.</p>`;
  }
});
