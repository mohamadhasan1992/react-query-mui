

const fetchPosts = async() => {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0'
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