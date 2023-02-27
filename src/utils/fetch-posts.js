

const fetchPosts = async(page, limit) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    return response.json();
}

const fetchComments = async(postId) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json()
}


export {fetchPosts, fetchComments};