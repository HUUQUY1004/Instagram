const Post = require('../modal/PostModal');
const User = require('../modal/UerModal');
class PostController {
    async createPost(req, res) {
        try {
            const { id } = req.params;
            const { title, file, isComment, isShowLike, scaleImage } = req.body;
            const newPost = Post.create({
                idUser: id,
                title,
                file,
                isComment,
                isShowLike,
                scaleImage,
            });

            return res.json({ status: true, newPost });
        } catch (error) {
            return res.json({ status: false, msg: 'Đã có lỗi xảy ra' });
        }
    }
    async getPost(req, res) {
        try {
            const posts = await Post.find({ idUser: req.params.id });
            return res.json({ status: true, posts });
        } catch (error) {
            return res.json({ status: false, msg: 'Đã có lỗi xảy ra' });
        }
    }
    async getPostHome(req, res) {
        try {
            const id = req.params.id; // Lấy id người dùng
            const user = await User.findOne({ _id: id });
            if (!user) {
                return res.json({ status: false, message: 'Người dùng không tồn tại' });
            }

            const followingIds = user.following.map((follow) => follow._id.toString()); // Lấy danh sách id người dùng đang theo dõi
            const postList = await Post.aggregate([
                {
                    $match: {
                        idUser: { $in: followingIds }, // Lọc các bài viết theo danh sách id người dùng đang theo dõi
                    },
                },
            ]);

            return res.json({ status: true, postList });
        } catch (error) {}
    }
    async deletePost(req, res) {}
    async updatePost(req, res) {}
    async like(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.body.id;
            const post = await Post.findById(postId);
            const { like } = post;
            const liked = like.some((item) => item.toString() === userId);
            if (liked) {
                res.json({ status: false, msg: 'Bạn đã thích bài viết này rồi' });
            } else {
                const likeNew = await Post.findByIdAndUpdate(
                    postId,
                    {
                        like: [...like, userId],
                    },
                    {
                        new: true,
                    },
                );

                return res.json({ status: true });
            }
        } catch (error) {
            return res.json({ status: false, msgL: 'Like Fail' });
        }
    }
    async dislike(req, res) {
        try {
            const postId = req.params.id;
            const userId = req.body.id;
            const post = await Post.findById(postId);
            const { like } = post;
            const newLike = like.filter((item) => item.toString() !== userId);
            console.log(newLike);
            await Post.findByIdAndUpdate(
                postId,
                {
                    like: newLike,
                },
                {
                    new: true,
                },
            );
            return res.json({ status: true, msg: 'Dislike successfully' });
        } catch (error) {
            return res.json({ status: false, msg: 'Dislike failure' });
        }
    }
    async comment(req, res) {
        const { idPost, idUser, content } = req.body;
        // const user = await User.findById(idUser)
        const post = await Post.findById(idPost);
        const { comment } = post;
        const newComment = [...comment, { idUser, content, date: new Date() }];
        await Post.findByIdAndUpdate(
            idPost,
            {
                comment: newComment,
            },
            {
                new: true,
            },
        );
        console.log(comment);
    }
    async getPostById(req, res) {
        try {
            const id = req.params.id;
            const post = await Post.findById(id);
            if (post) {
                return res.json({ status: true, post });
            } else {
                return res.json({ status: false, msg: 'Post not found' });
            }
        } catch (error) {
            return res.json({ status: false, msg: 'Get post by id failure in catch' });
        }
    }
}
module.exports = new PostController();
