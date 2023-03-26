
function bindDataWithCommentModel(commentsData){
    var comments = document.getElementById("comments");
    var posts = document.getElementById("posts");
    for(var i = 0; i< commentsData.length; i++){
        var currComment = commentsData[i];
        var commentTemplate = `
            <div class="comment">
                <div class="name"><b>Name: </b> ${currComment["name"]}</div>
                <div class="email"><b>Email: </b>${currComment["email"]}</div> 
                <div class="comment-text">${currComment["body"]}</div>
            </div> 
        `
        comments.classList.add("d-block");
        posts.classList.remove("d-block");
        comments.innerHTML += commentTemplate;
    }
}

function getPostComments(postId) {
    console.log("psotId",postId);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          bindDataWithCommentModel(data);
        } else {
          console.error('Error fetching user details. Status code:', xhr.status);
        }
    };
    xhr.send();
}

function bindDataWithPostModel(postsData){
    var posts = document.getElementById("posts");
    var users = document.getElementById("users");
    for(var post = 0; post < postsData.length; post++){
        var currPost = postsData[post];
        var postTemplate = `
            <div class="post">
                <div class="title">${currPost["title"]}</div>
                <div class="body">${currPost["body"]}</div> 
                <div class="cta">
                    <button type="button" class="view-comments" data-post-id="${currPost["id"]}">View Comments</button>
                </div>
            </div> 
        `
        posts.innerHTML += postTemplate;
    }
    posts.classList.add("d-block");
    users.classList.add("d-none");

    var viewComments = document.getElementsByClassName("view-comments");
    for(var i = 0; i < viewComments.length ; i++){
        viewComments[i].addEventListener("click", function(){
            var postId = this.getAttribute("data-post-id");
            getPostComments(postId);
        })
    }
}

function getUserPosts(userId){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          bindDataWithPostModel(data);
        } else {
          console.error('Error fetching user details. Status code:', xhr.status);
        }
    };
    xhr.send();
}

function handleUserModel(){
    var userDetails = document.querySelectorAll(".user-details");
    for(var i = 0; i < userDetails.length; i++){
        userDetails[i].addEventListener("click", function(event){
            var userId = this.getAttribute("data-id");
            getUserPosts(userId);
        })
    }
}

function bindDataWithUserModel(data){
    var users = document.getElementById("users");

    for(var user = 0; user < data.length; user++){
        var userObj = data[user];

        var userTemplate = `
            <div id="user-details" class="user-details" data-id=${userObj["id"]}>
                <div id="name"><b>Name: </b>${userObj["name"]}</div>
                <div id="user-name"><b>Username: </b>${userObj["username"]}</div>
                <div id="email"><b>Email: </b>${userObj["email"]}</div>
                <div id="address">
                    <div id="street"><b>Street: </b>${userObj["address"]["street"]}</div>
                    <div id="city"><b>City: </b>${userObj["address"]["city"]}</div>
                    <div id="zipcode"><b>Zipcode: </b>${userObj["address"]["zipcode"]}</div>
                </div>

                <div id="company">
                    <div id="company-name"><b>Company name: </b>${userObj["company"]["name"]}</div>
                    <div id="bs"><b>Bs: </b>${userObj["company"]["bs"]}</div>
                </div>
            </div>
        `

        users.innerHTML += userTemplate;

    }
    handleUserModel();
}

function getDataFromApi(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        bindDataWithUserModel(data);
      } else {
        console.error('Error fetching user details. Status code:', xhr.status);
      }
    };
    xhr.send();
}


window.addEventListener('load',function () {
    console.log("Window loaded successfully!");
    getDataFromApi();
});



