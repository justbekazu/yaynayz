async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="question-title"]').value.trim();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/questions/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.href = ('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-question-form').addEventListener('submit', editFormHandler);
