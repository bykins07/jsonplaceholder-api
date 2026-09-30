const API_URL = "https://jsonplaceholder.typicode.com";

const postsContainer = document.getElementById("posts");

const formMessage = document.getElementById("formMessage");

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

    const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
const body = document.getElementById("body").value.trim();
const userId = document.getElementById("userId").value.trim();
const formMessage = document.getElementById("formMessage");

    if (title.trim() === "") {
    formMessage.textContent = "Please enter a title.";
    return;
}

if (body.trim() === "") {
    formMessage.textContent = "Please enter a body.";
    return;
}

if (userId.trim() === "" || isNaN(userId)) {
    formMessage.textContent = "Please enter a valid User ID.";
    return;
}

    
    // Validation
    if (title === "") {
        formMessage.textContent = "Please enter a title.";
        return;
    }

    if (body === "") {
        formMessage.textContent = "Please enter the post body.";
        return;
    }

    if (userId === "") {
        formMessage.textContent = "Please enter a user ID.";
        return;
    }

    if (Number(userId) <= 0) {
        formMessage.textContent = "User ID must be greater than 0.";
        return;
    }

    // Send data to API
    const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: Number(userId)
        })
    });

    const post = await response.json();

    console.log("Created post:", post);

    formMessage.textContent = `Post created successfully! ID: ${post.id}`;

    postForm.reset();
});