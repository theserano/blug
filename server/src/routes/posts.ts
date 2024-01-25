import multer from "multer";
import Post from "../models/Post";
import express, {Request, Response} from "express";
import { BlogImage } from "../models/Post";


// basic configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// post request to save a post to the database
router.post("/create-post", upload.single('image'), async (req: Request, res: Response) => {
    try {
        const {title, body, createdAt, image} = req.body;

        const imageData: BlogImage = {
            data: req.file?.buffer,
            contentType: req.file?.mimetype
        }

        const newPost = new Post({
            title: title,
            body: body,
            createdAt: createdAt || Date.now(),
            image: imageData
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.log("Error occurred: ", error);
        res.status(500).json({message: "Internal Server Error sending post"});
    }
})


// get request to send a post to the frontend when requested
router.get("post/:id", async (req: Request, res: Response) => {
    try {
        // find one document in the posts collection where the id matches the parameter :id
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({ message: "No post found"});
        }

        res.json({
            title: post.title,
            body: post.body,
            created_at: post.createdAt,
            image: {
                data: post.image.data?.toString('base64'),
                contentType: post.image.contentType
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error getting post"});
    }
    
})

// delete request to remove a post from a database
router.delete("post/remove/:id", async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if(!post){
            res.status(404).json({message: "Post cannot be found"})
        }

        await Post.findByIdAndDelete(postId);
        res.status(201).json({message: "Post deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error deleting post"})
    }
})

// update request to update a post in a database
router.put("post/update/:id", async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = Post.findById(postId);

        if(!post){
            return res.status(404).json({message: 'post does not exist'})
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {$set: req.body}, //saying req.body should contain the new data
            {new: true} //saying the database should return the new data instead of the old
        )

        res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error updating the post"})
    }
})


export default router;