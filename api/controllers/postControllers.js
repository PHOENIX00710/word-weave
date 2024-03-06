import postModel from "../models/postsModel.js";
import { userModel } from "../models/userModel.js";
import { errorHandler } from "../utils/error.utils.js";
import slugify from "slugify";

export const createPost = async (req, res, next) => {
    const user = req.user;
    if (!user)
        return next(errorHandler(404, "Unauthorized Access!"))
    const { title, content, category, image } = req.body;
    if (!title || !content || title === '' || content === '')
        return next(errorHandler(405, "Title and Content cannot be empty"));

    // Add slug to each blog for more optimal searches 
    const slug = slugify(title, { lower: true, replacement: '-' });
    const postDetails = {
        userID: user,
        title,
        content,
        slug,
    }
    if (category)
        postDetails = { ...postDetails, category };
    if (image)
        postDetails = { ...postDetails, image };
    //console.log(postDetails);
    try {
        const newPost = new postModel(postDetails);
        await newPost.save()
        res
            .status(201)
            .json({
                success: true,
                message: "New Post added successfully",
                newPost
            })
    }
    catch (error) {
        next(errorHandler(406, error.message))
    }

}

export const updatePostDetails = async (req, res, next) => {

    // Take update Details
    const { title, content, category, image } = req.body;
    if (!title || !content || title === '' || content === '')
        return next(errorHandler(401, "Title and content cannot be empty"))
    let slug = slugify(title, { lower: true, replacement: '-' });

    // Take user Details for verification
    const currUserID = req.params.userID;
    const userId = req.user

    try {
        // Verify User if he posted the post or whether he is an admin or not
        const currUser = await userModel.findById(currUserID);
        const currPost = await postModel.findById(req.params.postID)
        if (!currPost)
            return next(errorHandler(401, "No post found to be deleted"))
        if (!(currUser && currUser.isAdmin) && !(currUserID === userId && userId === currPost.userID))
            return next(errorHandler(404, "You are not authorized to remove this post"))

        // Update the post based on user entered fields
        const updateDetails = {
            title,
            slug,
            content,
        }
        if (category)
            updateDetails = { ...updateDetails, category }
        if (image)
            updateDetails = { ...updateDetails, image }
        const updatedPost = await currPost.updateOne(updateDetails)

        res
            .status(201)
            .json(
                {
                    success: true,
                    message: "Post Deleted Successfully",
                    currUser,
                    updatedPost
                }
            )
    }
    catch (error) {
        return next(errorHandler(error.statusCode, error.message));
    }
}

export const deletePost = async (req, res, next) => {
    const currUserID = req.params.userID;
    const userId = req.user
    try {
        const currUser = await userModel.findById(currUserID);
        const currPost = await postModel.findById(req.params.postID)
        if (!currPost)
            return next(errorHandler(401, "No post found to be deleted"))
        if (!(currUser && currUser.isAdmin) && !(currUserID === userId && userId === currPost.userID))
            return next(errorHandler(404, "You are not authorized to remove this post"))
        await currPost.deleteOne()
        res
            .status(201)
            .json(
                {
                    success: true,
                    message: "Post Deleted Successfully",
                    currUser,
                }
            )
    }
    catch (error) {
        return next(errorHandler(error.statusCode, error.message));
    }
}

export const getAllPosts = async (req, res, next) => {
    let category = req.query.category || 'uncategorized';
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 9;
    let sortDirection = req.query.sortBy || 'desc' // asc or desc

    try {
        const posts = await postModel.find({
            ...(req.query.userID && { userID: req.query.userID }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postID && { _id: req.query.postID }),
            ...(
                req.query.searchTerm &&
                {
                    $or: [
                        { title: { $regex: req.query.searchTerm, $options: "si" } },
                        { content: { $regex: req.query.searchTerm, $options: "si" } }
                    ]
                }
            ),
            category: category,
        })
            .sort({ updatedAt: sortDirection })
            .skip(skip)
            .limit(limit)

        const totalPosts = await postModel.countDocuments()

        const now = new Date()

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDay()
        )

        const recentPosts = await postModel.find({
            createdAt: { $gte: oneMonthAgo }
        }).sort({ createdAt: "desc" })

        res
            .status(201)
            .json({
                success: true,
                posts,
                totalPosts,
                recentPosts,
            })
    }
    catch (error) {
        return next(errorHandler(error.statusCode, error.message))
    }

}