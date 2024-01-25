import mongoose from "mongoose";

export type BlogImage =  {
    data: Buffer | undefined;
    contentType: string | undefined;
}

export type PostType = {
    title: string,
    body: string,
    createdAt: string,
    image: BlogImage,
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        data: {
            type: Buffer,
            required: true,
        },
        contentType: {
            type: String,
        }

    }
})

const Post = mongoose.model<PostType>("Post", postSchema);

export default Post;