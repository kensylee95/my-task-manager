// Function to extract the user_id from the token
function displayUserId() {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (!token) {
    console.error('No token found. User might not be logged in.');
    return; // Exit if no token exists
  }

  try {
    // Decode the token payload
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode Base64 payload
    const userId = payload.user_id; // Extract user_id

    // Display the user_id in the input field
    const userIdInput = document.getElementById('user_id');
    if (userIdInput) {
      userIdInput.value = userId; // Set the user_id as the value of the input field
      console.log('User ID set in input field:', userId);
    } else {
      console.error('Input field with id="user_id" not found.');
    }
  } catch (error) {
    console.error('Failed to decode token or set user_id:', error);
  }
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', displayUserId);
