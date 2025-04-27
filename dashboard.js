// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
  });
  
  function loadProjects() {
    const dashboardProjects = document.getElementById('dashboard-projects');
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects = projects.filter(p => p.status === 'approved');
  
    if (projects.length === 0) {
      dashboardProjects.innerHTML = "<p>No projects available.</p>";
    } else {
      dashboardProjects.innerHTML = projects.map(project => `
        <div class="project-card">
          <h3>${project.title}</h3>
          <p>${project.description.substring(0, 100)}...</p>
          <p><strong>By:</strong> ${project.student}</p>
          <a href="project.html?id=${project.id}" class="btn">View Project</a>
        </div>
      `).join('');
    }
  }
  
  function applyFilters() {
    const titleFilter = document.getElementById('search-title').value.toLowerCase();
    const tagFilter = document.getElementById('search-tag').value.toLowerCase();
    const yearFilter = document.getElementById('search-year').value.toLowerCase();
  
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects = projects.filter(p => p.status === 'approved');
  
    let filtered = projects.filter(project => {
      return (
        (project.title.toLowerCase().includes(titleFilter)) &&
        (project.tags.join(', ').toLowerCase().includes(tagFilter)) &&
        (project.year.includes(yearFilter))
      );
    });
  
    const dashboardProjects = document.getElementById('dashboard-projects');
    if (filtered.length === 0) {
      dashboardProjects.innerHTML = "<p>No matching projects.</p>";
    } else {
      dashboardProjects.innerHTML = filtered.map(project => `
        <div class="project-card">
          <h3>${project.title}</h3>
          <p>${project.description.substring(0, 100)}...</p>
          <p><strong>By:</strong> ${project.student}</p>
          <a href="project.html?id=${project.id}" class="btn">View Project</a>
        </div>
      `).join('');
    }
  }
  