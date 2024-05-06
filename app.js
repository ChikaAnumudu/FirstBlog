const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
const _ = require('lodash');




const homeStartingContent = "clinton Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({entended: true}));
app.use(express.static("publics"));

const posts = [];

app.get("/", (req, res)=>{
  res.render("blog", {
    title: "Blog",
    homes:homeStartingContent,
    post:posts
  });

});

app.get("/posts/:postTitle", (req, res)=>{
  const requestedTitle = req.params.postTitle;
  const low = _.lowerCase(requestedTitle)
  posts.forEach((post) => {
    const loopingarray = post.title;
    const low1 = _.lowerCase(loopingarray)
    if( low === low1){
      // console.log("match found");
      res.redirect("/post");
    }else{
      console.log("match not found");
    }
  });


});


app.get("/post", (req, res)=>{
  res.send("hello");
});



app.get("/about", (req, res)=>{
  res.render("about", {title:"About", text:aboutContent });

});
app.get("/contact", (req, res)=>{
  res.render("contact", {title:"contact", text:contactContent });

});
app.get("/compose", (req, res)=>{
  res.render("compose", {title:"compose" });
});
app.post("/compose", (req, res)=>{
  const post ={
    title: req.body.item, 
    postContent: req.body.postContent,
    postText: req.body.postText
  }

  posts.push(post);
  res.redirect("/");
})


app.listen(5000, ()=>{
  console.log("The server is start at port 5000");
});
