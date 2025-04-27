// script.js

// Sign Up
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.username === username)) {
      alert('Username already exists!');
      return;
    }

    users.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! Please log in.');
    window.location.href = 'login.html';
  });
}

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      alert('Invalid credentials!');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    
    if (user.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'dashboard.html';
    }
  });
}

// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });
}

// Project Submission
const projectForm = document.getElementById('project-form');
if (projectForm) {
  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const tags = document.getElementById('project-tags').value.split(',');
    const year = document.getElementById('project-year').value;
    const video = document.getElementById('project-video').value;
    const student = JSON.parse(localStorage.getItem('currentUser')).username;

    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    projects.push({
      id: Date.now(),
      title,
      description,
      tags,
      year,
      video,
      student,
      status: 'pending',
      comments: []
    });

    localStorage.setItem('projects', JSON.stringify(projects));
    alert('Project submitted for approval!');
    window.location.href = 'dashboard.html';
  });
}

// Display Projects on Home Page
const projectList = document.getElementById('project-list');
if (projectList) {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects = projects.filter(p => p.status === 'approved');

  if (projects.length === 0) {
    projectList.innerHTML = "<p>No approved projects yet!</p>";
  } else {
    projectList.innerHTML = projects.map(project => `
      <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description.substring(0, 100)}...</p>
        <p><strong>By:</strong> ${project.student}</p>
        <a href="project.html?id=${project.id}" class="btn">View Project</a>
      </div>
    `).join('');
  }
}
