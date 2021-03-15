// javascript for index.html

const container = document.querySelector('.blogs');

const renderPosts = async (term) => {
    console.log(term);
    let uri = 'http://localhost:3000/posts';

    let res = await fetch(uri);
    let posts = await res.json();
    console.log(posts);

    let template = '';
    posts.forEach(post => {
      template += `
        <div class="post">
          <h2>${post.title}</h2>
          <p><small>${post.likes} likes</small></p>
          <p>${post.body.slice(0, 200)}...</p>
          <a href="/details.html?id=${post.id}">Read more</a>
        </div>
      `
    });
    container.innerHTML = template;

  }

window.addEventListener('DOMContentLoaded', () => renderPosts());