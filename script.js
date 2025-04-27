const form = document.getElementById('user-form');
const input = document.getElementById('username-input');
const result = document.getElementById('user-result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = input.value.trim();
  if (username !== '') {
    getUser(username);
  }
});

async function getUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const data = await response.json();
    showUser(data);
  } catch (error) {
    result.innerHTML = `<p>${error.message}</p>`;
  }
}

function showUser(data) {
  result.innerHTML = `
    <img src="${data.avatar_url}" alt="${data.login}" width="100" height="100">
    <h2>${data.name || data.login}</h2>
    <p>${data.bio || "No bio available"}</p>
    <p>Followers: ${data.followers} | Repos: ${data.public_repos}</p>
    <a href="${data.html_url}" target="_blank">View Profile</a>
  `;
}
