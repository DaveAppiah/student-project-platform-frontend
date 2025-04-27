// admin.js

document.addEventListener('DOMContentLoaded', () => {
  const adminProjects = document.getElementById('admin-projects');

  let projects = JSON.parse(localStorage.getItem('projects')) || [];

  if (projects.length === 0) {
    adminProjects.innerHTML = "<p>No submitted projects.</p>";
  } else {
    adminProjects.innerHTML = projects.map(project => `
      <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description.substring(0, 100)}...</p>
        <p><strong>By:</strong> ${project.student}</p>
        <p><strong>Status:</strong> ${project.status}</p>
        <button onclick="updateStatus(${project.id}, 'approved')" class="btn">Approve</button>
        <button onclick="updateStatus(${project.id}, 'rejected')" class="btn">Reject</button>
        <button onclick="deleteProject(${project.id})" class="btn" style="background: red;">Delete</button>
      </div>
    `).join('');
  }
});

function updateStatus(id, newStatus) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects = projects.map(p => {
    if (p.id === id) {
      p.status = newStatus;
    }
    return p;
  });
  localStorage.setItem('projects', JSON.stringify(projects));
  location.reload();
}

function deleteProject(id) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects = projects.filter(p => p.id !== id);
  localStorage.setItem('projects', JSON.stringify(projects));
  location.reload();
}

// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });
}
