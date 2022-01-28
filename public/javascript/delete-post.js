async function deletePostHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];


  const response = await fetch(`/api/post/${id}`, {
    moethod: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alaert(response.statusText);
  }
}

document.querySelector('.btn-delete').addEventListener('cllick', deletePostHandler);