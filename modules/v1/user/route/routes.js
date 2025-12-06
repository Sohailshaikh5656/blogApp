const userController = require("../controller/userController");
const userInstance = userController
const userRoute = (app)=>{

    //Just Route
    app.post("/api/user/register",userInstance.register);
    app.post("/api/user/login",userInstance.login);
    app.post("/api/user/blog",userInstance.newBlog);
    app.get("/api/user/allblogs",userInstance.allBlogs);
    app.get("/api/user/myblogs",userInstance.myBlog);
    app.get("/api/user/blog/:id",userInstance.blogDetails);
    app.put("/api/user/blog",userInstance.updateBlog);
    app.delete("/api/user/blog/:id",userInstance.deleteBlog);

}

module.exports = userRoute  