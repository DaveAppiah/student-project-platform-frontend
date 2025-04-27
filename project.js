// project.js

const projectInfo = document.getElementById('project-info');
const commentsList = document.getElementById('comments-list');
const commentForm = document.getElementById('comment-form');
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Load project details
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let project = projects.find(p => p.id == projectId);

if (project) {
  projectInfo.innerHTML = `
    <h1>${project.title}</h1>
    <p><strong>By:</strong> ${project.student}</p>
    <p><strong>Year:</strong> ${project.year}</p>
    <p><strong>Tags:</strong> ${project.tags.join(', ')}</p>
    <p>${project.description}</p>
    ${project.video ? `<iframe width="560" height="315" src="${project.video}" frameborder="0" allowfullscreen></iframe>` : ''}
  `;

  loadComments();
} else {
  projectInfo.innerHTML = '<p>Project not found.</p>';
}

// Load comments
function loadComments() {
  if (!project.comments || project.comments.length === 0) {
    commentsList.innerHTML = "<p>No comments yet. Be the first!</p>";
  } else {
    commentsList.innerHTML = project.comments.map(c => `
      <div class="comment">
        <strong>${c.user}</strong>: <p>${c.text}</p>
      </div>
    `).join('');
  }
}

// Post a new comment
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = document.getElementById('comment-text').value;

  if (!currentUser) {
    alert('Please log in to comment.');
    return;
  }

  const comment = {
    user: currentUser.username,
    text
  };

  project.comments.push(comment);
  projects = projects.map(p => p.id == projectId ? project : p);
  localStorage.setItem('projects', JSON.stringify(projects));

  document.getElementById('comment-text').value = '';
  loadComments();
});

// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });
}
