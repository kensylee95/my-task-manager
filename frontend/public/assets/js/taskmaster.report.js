// // frontend/public/assets/js/taskmaster.report.js
// document.addEventListener('DOMContentLoaded', () => {
//     const taskTable = $('#taskTable').DataTable();
//     const editTaskModal = document.getElementById('editTaskModal');
//     const editTaskForm = document.getElementById('editTaskForm');
//     let editingTaskId = null;
  
//     // Fetch tasks
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/tasks', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         const data = await response.json();
//         if (data.success) {
//           taskTable.clear();
//           data.tasks.forEach((task, index) => {
//             const serialNumber = index + 1; // Serial number starts from 1
//             const decoratedId = `
//               <div class="symbol symbol-50px symbol-circle overflow-hidden me-3">
//                 <span class="symbol-label bg-light-success text-gray-800 fs-6 fw-bolder">${serialNumber}.</span>
//                 <div class="symbol-badge bg-success start-100 top-100 border-4 h-5px w-5px ms-n3 mt-n3"></div>
//               </div>
//             `;
  
//             // Determine badge class based on priority
//             const priorityClass =
//               task.priority === 'Low'
//                 ? 'badge-light-primary'
//                 : task.priority === 'Medium'
//                 ? 'badge-light-info'
//                 : 'badge-light-warning';
  
//             const decoratedPriority = `
//               <div>
//                 <div class="fs-7 badge ${priorityClass}">${task.priority}</div>
//               </div>
//             `;
  
//             // Check if the deadline is past
//             const currentDate = new Date();
//             const deadlineDate = new Date(task.deadline);
//             const deadlineClass = deadlineDate < currentDate ? 'badge-light-danger' : 'badge-light-success';
//             const decoratedDeadline = `
//               <div>
//                 <div class="fs-7 badge ${deadlineClass}">${deadlineDate.toLocaleString()}</div>
//               </div>
//             `;
  
//             taskTable.row.add([
//               decoratedId, // Use decorated ID here
//               task.title,
//               task.description || '',
//               decoratedDeadline, // Use decorated deadline here
//               decoratedPriority, // Use decorated priority here
//               `
//                 <button class="edit-btn btn btn-clean btn-icon btn-success btn-sm me-3" data-bs-toggle="modal" data-bs-target="#editTaskModal" data-id="${task.id}">
//                   <i class="fa-solid fa-pen"></i>
//                 </button>

//                 <button class="delete-btn btn btn-clean btn-icon btn-danger btn-sm" data-id="${task.id}">
//                   <i class="fa-solid fa-trash"></i>
//                 </button>
//               `,
//             ]);
//           });
//           taskTable.draw();
//         }
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };
  
//     // Open edit modal
//     const openEditModal = (task) => {
//       editTaskModal.classList.add('open');
//       document.getElementById('editTitle').value = task.title;
//       document.getElementById('editDescription').value = task.description || '';
//       document.getElementById('editDeadline').value = task.deadline.split('.')[0];
//       document.getElementById('editPriority').value = task.priority;
//       editingTaskId = task.id;
//     };
  
//     // Handle edit button click
//     document.addEventListener('click', async (e) => {
//       if (e.target.classList.contains('edit-btn')) {
//         const taskId = e.target.dataset.id;
//         const task = await fetch(`http://localhost:5000/api/tasks/${taskId}`).then((res) => res.json());
//         openEditModal(task);
//       }
//     });
  
//     // Handle delete button click
//     document.addEventListener('click', async (e) => {
//       if (e.target.classList.contains('delete-btn')) {
//         const taskId = e.target.dataset.id;
//         const confirmation = await Swal.fire({
//           title: 'Are you sure?',
//           text: 'This will delete the task permanently!',
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonText: 'Yes, delete it!',
//         });
//         if (confirmation.isConfirmed) {
//           try {
//             await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
//               method: 'DELETE',
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//               },
//             });
//             Swal.fire('Deleted!', 'Task has been deleted.', 'success');
//             fetchTasks(); // Refresh tasks
//           } catch (error) {
//             Swal.fire('Error!', 'Failed to delete the task.', 'error');
//           }
//         }
//       }
//     });
  
//     // Handle task update
//     editTaskForm.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const updatedTask = {
//         title: document.getElementById('editTitle').value,
//         description: document.getElementById('editDescription').value,
//         deadline: document.getElementById('editDeadline').value,
//         priority: document.getElementById('editPriority').value,
//       };
//       try {
//         await fetch(`http://localhost:5000/api/tasks/${editingTaskId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//           body: JSON.stringify(updatedTask),
//         });
//         editTaskModal.classList.remove('open');
//         fetchTasks(); // Refresh tasks
//       } catch (error) {
//         console.error('Error updating task:', error);
//       }
//     });
  
//     // Initial fetch
//     fetchTasks();
//   }); 

// frontend/public/assets/js/taskmaster.report.js
document.addEventListener('DOMContentLoaded', () => {
    const taskTable = $('#taskTable').DataTable();
    const editTaskModal = document.getElementById('editTaskModal');
    const editTaskForm = document.getElementById('editTaskForm');
    let editingTaskId = null;

    // Fetch tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token
                },
            });
            const data = await response.json();
            if (data.success) {
                taskTable.clear();
                data.tasks.forEach((task, index) => {
                    const serialNumber = index + 1; // Serial number starts from 1
                    const decoratedId = `
                      <div class="symbol symbol-50px symbol-circle overflow-hidden me-3">
                        <span class="symbol-label bg-light-success text-gray-800 fs-6 fw-bolder">${serialNumber}.</span>
                        <div class="symbol-badge bg-success start-100 top-100 border-4 h-5px w-5px ms-n3 mt-n3"></div>
                      </div>
                    `;

                    // Determine badge class based on priority
                    const priorityClass =
                        task.priority === 'Low'
                            ? 'badge-light-primary'
                            : task.priority === 'Medium'
                            ? 'badge-light-info'
                            : 'badge-light-warning';

                    const decoratedPriority = `
                      <div>
                        <div class="fs-7 badge ${priorityClass}">${task.priority}</div>
                      </div>
                    `;

                    // Check if the deadline is past
                    const currentDate = new Date();
                    const deadlineDate = new Date(task.deadline);
                    const deadlineClass = deadlineDate < currentDate ? 'badge-light-danger' : 'badge-light-success';
                    const decoratedDeadline = `
                      <div>
                        <div class="fs-7 badge ${deadlineClass}">${deadlineDate.toLocaleString()}</div>
                      </div>
                    `;

                    taskTable.row.add([
                        decoratedId, // Use decorated ID here
                        task.title,
                        task.description || '',
                        decoratedDeadline, // Use decorated deadline here
                        decoratedPriority, // Use decorated priority here
                        `
                          <button class="edit-btn btn btn-clean btn-icon btn-success btn-sm me-3" data-bs-toggle="modal" data-bs-target="#editTaskModal" data-id="${task.id}">
                            <i class="fa-solid fa-pen"></i>
                          </button>
  
                          <button class="delete-btn btn btn-clean btn-icon btn-danger btn-sm" data-id="${task.id}">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        `,
                    ]);
                });
                taskTable.draw();
            } else {
                console.error('Fetch tasks error:', data.message);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Open edit modal
    const openEditModal = (task) => {
        if (!task || !task.deadline) {
            console.error('Invalid task data:', task);
            Swal.fire('Error', 'Unable to load task details.', 'error');
            return;
        }
        editTaskModal.classList.add('open');
        document.getElementById('editTitle').value = task.title || '';
        document.getElementById('editDescription').value = task.description || '';
        document.getElementById('editDeadline').value = task.deadline.split('.')[0] || '';
        document.getElementById('editPriority').value = task.priority || '';
        editingTaskId = task.id;
    };

    // Handle edit button click
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const taskId = e.target.dataset.id;
            try {
                const task = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token here
                    },
                }).then((res) => res.json());

                if (task.success === false && task.message === 'Access denied. No token provided.') {
                    Swal.fire('Unauthorized', 'Please log in again.', 'error');
                    window.location.href = 'http://localhost:5000'; // Redirect to login
                    return;
                }

                openEditModal(task); // Pass task to the modal
            } catch (error) {
                console.error('Error fetching task details:', error);
                Swal.fire('Error', 'Failed to load task details.', 'error');
            }
        }
    });

    // Handle delete button click
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const taskId = e.target.dataset.id;
            const confirmation = await Swal.fire({
                title: 'Are you sure?',
                text: 'This will delete the task permanently!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
            });
            if (confirmation.isConfirmed) {
                try {
                    await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token
                        },
                    });
                    Swal.fire('Deleted!', 'Task has been deleted.', 'success');
                    fetchTasks(); // Refresh tasks
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete the task.', 'error');
                }
            }
        }
    });

    // Handle task update
    editTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedTask = {
            title: document.getElementById('editTitle').value,
            description: document.getElementById('editDescription').value,
            deadline: document.getElementById('editDeadline').value,
            priority: document.getElementById('editPriority').value,
        };
        try {
            await fetch(`http://localhost:5000/api/tasks/${editingTaskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token
                },
                body: JSON.stringify(updatedTask),
            });
            editTaskModal.classList.remove('open');
            fetchTasks(); // Refresh tasks
        } catch (error) {
            console.error('Error updating task:', error);
        }
    });

    // Initial fetch
    fetchTasks();
});
