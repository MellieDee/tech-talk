async function editPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').ariaValueMax.trim();
  const post_text = document.querySelector('textarea[name="post-textarea"]').value.trim();
  console.log(post_text);
  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  const response = await fetch(`/api/post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-btn').addEventListener('submit', editPostHandler);