const fetchUser = userName => {
    const success = Math.random() > 0.3;
    const user = { name: userName, age: 25, posts: 76 };
    const error = "Trabl:(";
    return success ? user : error;
}

fetchUser('Mango')