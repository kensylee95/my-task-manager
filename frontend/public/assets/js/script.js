// Register Event
// document.querySelector('.form-container.sign-up form').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const fullName = e.target.full_name.value;
//   const gender = e.target.gender.value;
//   const contact = e.target.contact.value;
//   const email = e.target.email.value;
//   const user_id = e.target.user_id.value;
//   const password = e.target.password.value;

//   try {
//     const response = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ full_name: fullName, gender, contact, email, user_id, password }),
//     });

//     const result = await response.json();
//     if (response.ok) {
//       Swal.fire('Success', 'Account created successfully!', 'success').then(() => {
//         window.location.href = '/'; // Redirect to login page
//       });
//     } else {
//       Swal.fire('Error', result.message || 'Failed to create account.', 'error');
//     }
//   } catch (error) {
//     console.error('Registration error:', error);
//     Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
//   }
// });

// // Login Event
// document.querySelector('.form-container.sign-in form').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;
//   const password = e.target.password.value;

//   try {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const result = await response.json();
//     if (response.ok) {
//       localStorage.setItem('token', result.token); // Save token
//       Swal.fire('Success', 'Login successful!', 'success').then(() => {
//         window.location.href = '/pages/create-task.html'; // Redirect to dashboard
//       });
//     } else {
//       Swal.fire('Error', result.message || 'Failed to log in.', 'error');
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
//   }
// });

// frontend/public/assets/js/script.js

// Decode JWT to extract user_id
// function getUserIdFromToken() {
//   const token = localStorage.getItem('token'); // Retrieve token from localStorage
//   if (!token) {
//     console.error('No token found. User might not be logged in.');
//     return null; // Return null if no token exists
//   }

//   try {
//     // Decode token payload
//     const payload = JSON.parse(atob(token.split('.')[1])); // Base64 decode
//     return payload.user_id; // Extract and return user_id
//   } catch (error) {
//     console.error('Failed to decode token:', error);
//     return null;
//   }
// }

// Sign-up form handling
// document.querySelector('.form-container.sign-up form').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const fullName = e.target.full_name.value;
//   const gender = e.target.gender.value;
//   const contact = e.target.contact.value;
//   const email = e.target.email.value;
//   const user_id = e.target.user_id.value;
//   const password = e.target.password.value;

//   try {
//     const response = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ full_name: fullName, gender, contact, email, user_id, password }),
//     });

//     const result = await response.json();
//     if (response.ok) {
//       Swal.fire('Success', 'Account created successfully!', 'success').then(() => {
//         window.location.href = '/'; // Redirect to login page
//       });
//     } else {
//       Swal.fire('Error', result.message || 'Failed to create account.', 'error');
//     }
//   } catch (error) {
//     Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
//     console.error('Registration error:', error);
//   }
// });

// Sign-in form handling
// document.querySelector('.form-container.sign-in form').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const email = e.target.email.value;
//   const password = e.target.password.value;

//   try {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const result = await response.json();
//     if (response.ok) {
//       // Store the token in localStorage
//       localStorage.setItem('token', result.token);

//       // Log the user_id to the console
//       const userId = getUserIdFromToken();
//       console.log('Logged-in User ID:', userId);

//       // Redirect to the dashboard
//       Swal.fire('Success', 'Login successful!', 'success').then(() => {
//         window.location.href = '/pages/create-task.html'; // Replace with actual dashboard path
//       });
//     } else {
//       Swal.fire('Error', result.message || 'Failed to log in.', 'error');
//     }
//   } catch (error) {
//     Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
//     console.error('Login error:', error);
//   }
// });

// Example: Testing user_id extraction (optional, for debugging purposes)
// const userId = getUserIdFromToken();
// if (userId) {
//   console.log('Currently logged-in User ID:', userId);
// } else {
//   console.log('No user is logged in.');
// }


// Decode JWT to extract user_id
function getUserIdFromToken() {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (!token) {
    console.error('No token found. User might not be logged in.');
    return null; // Return null if no token exists
  }

  try {
    // Decode token payload
    const payload = JSON.parse(atob(token.split('.')[1])); // Base64 decode
    return payload.user_id; // Extract and return user_id
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

// Function to refresh the access token
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token
  if (!refreshToken) {
    alert('Session expired. Please log in again.');
    window.location.href = '/'; // Redirect to login page
    return;
  }

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('token', result.accessToken); // Save new access token
      console.log('Access token refreshed successfully.');
    } else {
      alert(result.message || 'Failed to refresh token. Please log in again.');
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    alert('An error occurred. Please log in again.');
    window.location.href = '/';
  }
}

// Function to handle API calls with token refresh
async function apiCallWithToken(endpoint, options = {}) {
  let token = localStorage.getItem('token');
  if (!token) {
    await refreshAccessToken(); // Attempt to refresh token
    token = localStorage.getItem('token'); // Get new token after refreshing
  }

  // Add the token to headers
  options.headers = { 
    ...options.headers, 
    Authorization: `Bearer ${token}` 
  };

  return fetch(endpoint, options);
}

// Sign-up form handling
document.querySelector('.form-container.sign-up form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullName = e.target.full_name.value;
  const gender = e.target.gender.value;
  const contact = e.target.contact.value;
  const email = e.target.email.value;
  const user_id = e.target.user_id.value;
  const password = e.target.password.value;

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName, gender, contact, email, user_id, password }),
    });

    const result = await response.json();
    if (response.ok) {
      Swal.fire('Success', 'Account created successfully!', 'success').then(() => {
        window.location.href = '/'; // Redirect to login page
      });
    } else {
      Swal.fire('Error', result.message || 'Failed to create account.', 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    console.error('Registration error:', error);
  }
});

// Sign-in form handling
document.querySelector('.form-container.sign-in form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      // Store tokens in localStorage
      localStorage.setItem('token', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken); // Save refresh token

      // Log the user_id to the console
      const userId = getUserIdFromToken();
      console.log('Logged-in User ID:', userId);

      // Redirect to the dashboard
      Swal.fire('Success', 'Login successful!', 'success').then(() => {
        window.location.href = '/pages/create-task.html'; // Replace with actual dashboard path
      });
    } else {
      Swal.fire('Error', result.message || 'Failed to log in.', 'error');
    }
  } catch (error) {
    Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    console.error('Login error:', error);
  }
});

// Example: Testing user_id extraction (optional, for debugging purposes)
const userId = getUserIdFromToken();
if (userId) {
  console.log('Currently logged-in User ID:', userId);
} else {
  console.log('No user is logged in.');
}
