async function deleteFormHandler(event) {
  event.preventDefault();
  
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/questions/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.href = ('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.delete-question-btn').addEventListener('click', deleteFormHandler);