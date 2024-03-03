import postModel from "../models/postsModel.js";
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