async function logout() {
  const response = await fetch('/api/authors/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.href = ('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logoutNav').addEventListener('click', logout);