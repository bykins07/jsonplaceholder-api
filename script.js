const API_URL = "https://jsonplaceholder.typicode.com/posts";

const postsContainer = document.getElementById("posts");


// ====================
// GET
// ====================

async function getPosts() {
    const response = await fetch(API_URL);
    const posts = await response.json();

    renderPosts(posts);
}


function renderPosts(posts) {
    postsContainer.innerHTML = "";

    posts.slice(0, 10).forEach(post => {

        const postCard = document.createElement("div");

        postCard.classList.add("post-card");

        postCard.innerHTML = `
            <h3>Post #${post.id}</h3>
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;

        postsContainer.appendChild(postCard);
    });
}


// ====================
// POST
// ====================

async function createPost() {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: "My New Post",
            body: "This post was created from my API project.",
            userId: 1
        })
    });

    const post = await response.json();

    console.log("POST:", post);

    alert(`Post created! ID: ${post.id}`);
}


// ====================
// PUT
// ====================

async function updatePost() {

    const response = await fetch(`${API_URL}/1`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id: 1,
            title: "Updated Post",
            body: "This post was completely updated using PUT.",
            userId: 1
        })
    });

    const post = await response.json();

    console.log("PUT:", post);

    alert("Post updated using PUT!");
}


// ====================
// PATCH
// ====================

async function patchPost() {

    const response = await fetch(`${API_URL}/1`, {

        method: "PATCH",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: "Partially Updated Post"
        })
    });

    const post = await response.json();

    console.log("PATCH:", post);

    alert("Post partially updated using PATCH!");
}


// ====================
// DELETE
// ====================

async function deletePost() {

    const response = await fetch(`${API_URL}/1`, {

        method: "DELETE"
    });

    console.log("DELETE:", response.status);

    alert("Post deleted!");
}


// ====================
// BUTTON EVENTS
// ====================

document
    .getElementById("loadPosts")
    .addEventListener("click", getPosts);

document
    .getElementById("createPost")
    .addEventListener("click", createPost);

document
    .getElementById("updatePost")
    .addEventListener("click", updatePost);

document
    .getElementById("patchPost")
    .addEventListener("click", patchPost);

document
    .getElementById("deletePost")
    .addEventListener("click", deletePost);