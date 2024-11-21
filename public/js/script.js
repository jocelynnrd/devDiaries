// Handle login for submission 
const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard
      } else {
        alert('Failed to log in. Please check your username and password.');
      }
    }
  };  

  // Handle Signup Form Submission 
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard
      } else {
        alert('Failed to sign up. Please try again.');
      }
    }
  };
// Handle Logout 
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/'); // Redirect to homepage
      } else {
        alert('Failed to log out.');
      }
    };

    // Handle New Post Submission 
    const newPostHandler = async (event) => {
        event.preventDefault();

        const title = document.querySelector
        ('#post-title').value.trim();
        const content = document.querySelector('#post-content').value.trim();
      
        if (title && content) {
          const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            document.location.replace('/dashboard'); // Redirect to dashboard
          } else {
            alert('Failed to create post.');
          }
        }
      };

      // Handle New Comment Submission
const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-content').value.trim();
    const postId = document.querySelector('#post-id').value; 
  
    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, postId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload(); // Reload the page to show the new comment
      } else {
        alert('Failed to add comment.');
      }
    }
  };
  
  // Attach Event Listeners
  document
    .querySelector('.login-form')
    ?.addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    ?.addEventListener('submit', signupFormHandler);
  
  document
    .querySelector('#logout')
    ?.addEventListener('click', logout);
  
  document
    .querySelector('.new-post-form')
    ?.addEventListener('submit', newPostHandler);
  
  document
    .querySelector('.comment-form')
    ?.addEventListener('submit', commentFormHandler);
