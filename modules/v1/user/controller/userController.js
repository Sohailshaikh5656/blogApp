const Validator = require("Validator")
const middleware = require("../../../../middleware/validators")
const validationRules = require("../../../../utilites/rules")
const userModel = require("../model/userModel");
const common = require("../../../../utilites/common");
const message = require('../../../../language/en');
const { required } = require('../../../../language/ar');
const { parse } = require("path");

class userController {
    constructor() { }

    //Register
    async register(req, res) {

        let requestData = req.body
        let rules = validationRules.register;
        // FIX: Check if req.language exists and has required property
        let message = {
            required: req.language?.required
        }
        let keywords = {}
        try {
            if (middleware.checkValidationRules(req, res, requestData, rules, message, keywords)) {
                let response = await userModel.register(requestData)
                return middleware.sendResponse(req, res, response)
            }
        } catch (error) {
            return middleware.sendErrorMessage(req, res, error)
        }
    }

    //Login
    async login(req, res) {
        let requestData = req.body
        let rules = validationRules.login;
        // FIX: Check if req.language exists and has required property
        let message = {
            required: req.language?.required
        }
        let keywords = {}
        try {
            if (middleware.checkValidationRules(req, res, requestData, rules, message, keywords)) {
                let response = await userModel.login(requestData)
                return middleware.sendResponse(req, res, response)
            }
        } catch (error) {
            return middleware.sendErrorMessage(req, res, error)
        }
    }

    //New Blog
    async newBlog(req, res) {
        let requestData = req.body
        requestData.authorId = req.userId
        let rules = validationRules.newBlog;
        let message = {
            required: req.language?.required
        }
        let keywords = {}
        try {
            if (middleware.checkValidationRules(req, res, requestData, rules, message, keywords)) {
                let response = await userModel.newBlog(requestData)
                return middleware.sendResponse(req, res, response)
            }
        }catch(error){
            return middleware.sendErrorMessage(req, res, error)
        }
    }
    
    //All Blog
    async allBlogs(req, res) {
        try {
            let requestData = {}
            let response = await userModel.allBlog(requestData)
            return middleware.sendResponse(req, res, response)
        }catch(error){
            return middleware.sendErrorMessage(req, res, error)
        }
    }

    //My Blog
    async myBlog(req, res) {
        let requestData = req.body
        requestData.authorId = req.userId
        let rules = validationRules.newBlog;
        let message = {
            required: req.language?.required
        }
        let keywords = {}
        try {
            if (middleware.checkValidationRules(req, res, requestData, rules, message, keywords)) {
                let response = await userModel.myBlog(requestData)
                return middleware.sendResponse(req, res, response)
            }
        }catch(error){
            return middleware.sendErrorMessage(req, res, error)
        }
    }

    //Single Blog Details
    async blogDetails(req, res) {
        try{
            let requestData = {}
            requestData.id = parseInt(req.params.id)
            let response = await userModel.blogDetails(requestData)
            return middleware.sendResponse(req, res, response)
        }catch(error){
            return middleware.sendErrorMessage(req, res, error)
        }
    }


    //Update Blog
    async updateBlog(req, res) {
        let requestData = req.body
        requestData.authorId = req.userId
        let rules = validationRules.updateBlog;
        let message = {
            required: req.language?.required
        }
        let keywords = {}
        try {
            if (middleware.checkValidationRules(req, res, requestData, rules, message, keywords)) {
                let response = await userModel.updateBlog(requestData)
                return middleware.sendResponse(req, res, response)
            }
        }catch(error){
            return middleware.sendErrorMessage(req, res, error)
        }
    }

    //Delete Blog
    async deleteBlog(req, res) {
        try{
            let requestData = {}
            requestData.id = req.params.id
            requestData.authorId = req.userId
            let response = await userModel.deleteBlog(requestData)
            return middleware.sendResponse(req, res, response)
        }catch(error){
            return middleware.sendErrorMessage(req, res, error)
        }


    }
}
module.exports = new userController()