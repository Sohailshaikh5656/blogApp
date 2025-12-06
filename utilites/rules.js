let register = {
    email : "required|string|email",
    password : "required|string|min:8|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/",
    name : "required|string"
}
let login = {
    email : "required|string|email",
    password : "required|string",
}

let newBlog = {
    title : "required|string",
    slug : "required|string",
    content : "required|string",
    summary : "required|string",
    tags : "string"
}

let updateBlog = {
    id : "required|integer",
    title : "string",
    slug : "string",
    content : "string",
    summary : "string",
    tags : "string",
    status : "in:published,draft,archived"
}

module.exports = {register,login, newBlog, updateBlog
};
