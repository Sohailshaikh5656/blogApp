
const responseCode = require("../../../../utilites/responseCode");
const common = require("../../../../utilites/common");
const { request } = require("express");
const { PrismaClient } = require("@prisma/client")
const jwt = require('jsonwebtoken');
const { stat } = require("fs");
const { title } = require("process");
const { email } = require("../../../../language/en");

const Prisma = new PrismaClient()

class userModel {

    constructor() { }

    //Register New User
    async register(requestData) {
        try {
            let newUser = {
                email: requestData.email,
                name: requestData.name,
                password: requestData.password
            }
            newUser.password = await common.getHashedPassword(newUser.password)
            const user = await Prisma.user.create({
                data: newUser
            })

            if (user) {
                delete user?.password
                let JWTToken = jwt.sign(
                    { userId: user.id }, process.env.SECRET_KEY, { "expiresIn": "1d" }
                )
                user.jwtToken = JWTToken
                return {
                    code: responseCode.SUCCESS,
                    keyword: "user_registered",
                    data: user
                }
            } else {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "insert_failed",
                    data: "Failed to Insert Data !"
                };
            }

        } catch (error) {

            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "some_went_wrong",
                data: error?.meta?.target == "User_email_key" ? "Email Already Exists !" : error
            }
        }
    }

    //Login User
    async login(requestData) {
        try {
            let userCredentails = {
                email: requestData.email,
                password: requestData.password,
            }
            const user = await Prisma.user.findUnique({
                where: { email: userCredentails.email }
            })

            if (user) {
                const compare = await common.comparePasswords(userCredentails.password, user.password)
                if (!compare) {
                    return {
                        code: responseCode.OPERATION_FAILED,
                        keyword: "password not matched",
                        data: "Entered a Wrong Password !"
                    }
                }
                delete user?.password
                let JWTToken = jwt.sign(
                    { userId: user.id }, process.env.SECRET_KEY, { "expiresIn": "1d" }

                )

                user.JWTToken = JWTToken
                return {
                    code: responseCode.SUCCESS,
                    keyword: "login_successful",
                    data: user
                }
            } else {
                return {
                    code: responseCode.NO_DATA_FOUND,
                    keyword: "user_not_found",
                    data: "Wrong Email for User Login ! Or Email Not Found"
                };
            }

        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "some_went_wrong",
                data: error
            }
        }
    }


    //Create New Blog
    async newBlog(requestData) {
        try {
            let newBlogData = {
                title: requestData?.title,
                slug: requestData?.slug,
                content: requestData?.content,
                summary: requestData?.summary,
                authorId: requestData?.authorId,
                tags: requestData?.tags,
                views: requestData?.views || 0,
                status: requestData?.status || 'draft',
            }
            const blog = await Prisma.blog.create({
                data: newBlogData
            })

            if (blog) {
                return {
                    code: responseCode.SUCCESS,
                    keyword: "blog_created",
                    data: blog
                }
            } else {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "insert_failed",
                    data: "Failed to Insert Data !"
                };
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "some_went_wrong",
                data: error
            }
        }
    }


    //Get All Blogs
    async allBlog(requestData) {
        try {
            const blogs = await Prisma.blog.findMany({
                where: {
                    isDeleted: false,
                    isActive: true
                },
                include: {
                    author: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });
            if (blogs) {
                return {
                    code: responseCode.SUCCESS,
                    keyword: "all_blogs",
                    data: blogs
                }
            }
            else {
                return {
                    code: responseCode.NO_DATA_FOUND,
                    keyword: "no_blogs_found",
                    data: "No Blogs Found !"
                }
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "some_went_wrong",
                data: error
            }
        }
    }

    //Get My Blogs
    async myBlog(requestData) {
        try {
            const blogs = await Prisma.blog.findMany({
                where: { authorId: parseInt(requestData.authorId), isDeleted: false, isActive: true }
            })
            if (blogs && blogs.length > 0) {
                return {
                    code: responseCode.SUCCESS,
                    keyword: "my_blogs",
                    data: blogs
                }
            }
            else {
                return {
                    code: responseCode.NO_DATA_FOUND,
                    keyword: "no_blogs_found",
                    data: "No Blogs Found !"
                }
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "some_went_wrong",
                data: error
            }
        }
    }


    //Get Blog Details
    async blogDetails(requestData) {
        try {
            const blog = await Prisma.blog.findUnique({
                where: { id: requestData.id, isDeleted: false, isActive: true },
                include:{
                    author:{
                        select:{
                            name:true,
                            email:true
                        }
                    }
                }
            })
            if (blog) {
                const updatedBlog = await Prisma.blog.update({
                    where: { id: requestData.id },
                    data: { views: blog.views + 1 }
                });
                return {
                    code: responseCode.SUCCESS,
                    keyword: "blog_details",
                    data: blog
                }
            } else {
                return {
                    code: responseCode.NO_DATA_FOUND,
                    keyword: "no_blog_found",
                    data: "No Blog Found !"
                }
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "some_went_wrong",
                data: error
            }
        }
    }


    //Update Blog
    async updateBlog(requestData) {
        try {
            let checkId = await Prisma.blog.findUnique({
                where: { id: parseInt(requestData.id) }
            })
            if (checkId?.authorId !== requestData.authorId) {
                return {
                    code: responseCode.NOT_APPROVED || 401,
                    keyword: "unauthorized_action",
                    data: "You are not authorized to update this blog !"
                }
            }
            let updateData = {
                title: requestData?.title,
                slug: requestData?.slug,
                content: requestData?.content,
                summary: requestData?.summary,
                tags: requestData?.tags,
                status: requestData?.status,
            }
            const blog = await Prisma.blog.update({
                where: { id: parseInt(requestData.id) },
                data: updateData
            })
            if (blog) {
                return {
                    code: responseCode.SUCCESS,
                    keyword: "blog_updated",
                    data: blog
                }
            }
            else {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "update_failed",
                    data: "Failed to Update Data !"
                }
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "some_went_wrong",
                data: error.meta.target === "Blog_slug_key" ? "Slug Already Exists or Your Entred Slug Alredy Exists !" : error
            }
        }
    }


    //Delete Blog
    async deleteBlog(requestData) {
        try {
            let checkId = await Prisma.blog.findUnique({
                where: { id: parseInt(requestData.id) }
            })
            if (checkId?.authorId !== requestData.authorId) {
                return {
                    code: responseCode.NOT_APPROVED || 401,
                    keyword: "unauthorized_action",
                    data: "You are not authorized to delete this blog !"
                }
            }
            const blog = await Prisma.blog.update({
                where: { id: parseInt(requestData.id) },
                data: { isDeleted: true }
            })
            if (blog) {
                return {
                    code: responseCode.SUCCESS,
                    keyword: "blog_deleted",
                    data: "Blog Deleted Successfully !"
                }
            }
            else {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "delete_failed",
                    data: "Failed to Delete Data !"
                }
            }
        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "some_went_wrong",
                data: error
            }
        }
    }

}

module.exports = new userModel()

