// frontend/public/assets/js/submit.tasks.js

// Handle Task Form Submission
document.getElementById('main-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Collect form data
  const userId = document.getElementById('user_id').value;
  const title = document.getElementById('title').value;
  const description = document.getElementById('describe').value;
  const deadline = document.getElementById('deadline').value;
  const priority = document.getElementById('priority').value;

  // Validate inputs
  if (!userId || !title || !deadline || !priority) {
    alert('Please fill in all required fields.');
    return;
  }

  // Prepare the payload
  const taskData = { user_id: userId, title, description, deadline, priority };

  console.log('Submitting Task Data:', taskData); // Debugging log

  try {
    // Send POST request to backend
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
      },
      body: JSON.stringify(taskData),
    });

    const result = await response.json();

    if (response.ok) {
      Swal.fire({
        title: 'Task Created!',
        text: `Your Task Created Successfully!.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Reload the page after clicking OK
        window.location.reload();
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to create task.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    console.error('Error creating task:', error);
    Swal.fire({
      title: 'Error!',
      text: 'An error occurred while connecting to the server.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
});

// Display User ID in the Form
function displayUserId() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found. User might not be logged in.');
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
    const userId = payload.user_id; // Extract user_id from token

    console.log('Decoded User ID:', userId); // Debugging log

    const userIdInput = document.getElementById('user_id');
    if (userIdInput) {
      userIdInput.value = userId; // Set the user_id in the form input
    }
  } catch (error) {
    console.error('Failed to decode token or set user_id:', error);
  }
}

// Call displayUserId on page load
window.addEventListener('DOMContentLoaded', displayUserId);