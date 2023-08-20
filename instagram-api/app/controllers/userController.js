const User = require('../modal/UerModal');
class UserController {
    async register(req, res) {
        try {
            const { email, name, username, password } = req.body;
            const isEmail = await User.findOne({ email });
            const isUsername = await User.findOne({ username });
            if (isEmail) {
                return res.json({ status: 400, msg: 'Email đã được đăng kí' });
            } else if (isUsername) {
                return res.json({ status: 400, msg: 'Username đã tồn tại' });
            } else {
                const user = await User.create({
                    email,
                    name,
                    username,
                    password,
                    isAvatarImage: false,
                    avatarImage: '',
                    post: [],
                    followers: [],
                    following: [],
                    ticked: false,
                    saving: [],
                });
                return res.json({ status: 200, user });
            }
        } catch (err) {
            res.json({ msg: 'Err' });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            if (user.password !== password) {
                res.json({ status: false, msg: 'Incorrect password' });
            } else {
                res.json({ status: true, user });
            }
        } else {
            res.json({ status: false, msg: 'Incorrect email' });
        }
    }
    async getSuggest(req, res) {
        const arr = [];
        const user = await User.find({ ticked: true });
        if (user) {
            return res.json(user);
        }
    }
    async suggested(req, res) {
        try {
            const { idUserFlow } = req.body; //oke
            const { id } = req.params; //oke
            const userFlo = await User.findById(idUserFlow); //oke
            const crrUser = await User.findById(id);
            const { following } = crrUser;
            let followed = false;
            for (let i = 0; i <= following.length - 1; i++) {
                if (following[i]._id.toString() === idUserFlow) {
                    followed = true;
                }
            }
            if (userFlo) {
                // console.log(followed);
                if (followed) {
                    res.json({ status: false, msg: ' user is followed' });
                } else {
                    await User.findByIdAndUpdate(
                        id,
                        {
                            following: [...crrUser.following, userFlo],
                        },
                        {
                            new: true,
                        },
                    );
                    return res.json({ status: true, msg: 'added successfully' });
                }
            } else {
                return res.json({ status: false, msg: 'added failure' });
            }
        } catch (error) {}
    }
    async unFlow(req, res) {
        try {
            const { idUserFlow } = req.body; //oke
            const { id } = req.params; //oke
            const userUnFlo = await User.findById(idUserFlow); //oke
            const crrUser = await User.findById(id);
            const { following } = crrUser;
            const newFollowing = following.filter((item) => item._id.toString() !== userUnFlo._id.toString());
            await User.findByIdAndUpdate(
                id,
                {
                    following: newFollowing,
                },
                {
                    new: true,
                },
            );
            return res.json({ status: true, msg: 'unFollow successfully' });
        } catch (error) {
            return res.json({ status: false, msg: 'UnFollow failure' });
        }
    }
    async getUser(req, res) {
        try {
            const user = await User.findOne({ username: req.params.username });
            if (user) {
                res.json({ status: true, user });
            }
        } catch (error) {
            res.json({ status: false, msg: 'Fail' });
        }
    }
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                return res.json({ status: true, user });
            }
        } catch (error) {
            res.json({ status: false, msg: 'Fail' });
        }
    }
    async createAlbum(req, res) {
        try {
            const id = req.params.id;
            const name = req.body.name;
            const user = await User.findById(id);
            var bol = true;
            user.saving.filter((item) => {
                if (item.name === name) {
                    bol = false;
                }
            });
            if (user) {
                if (bol) {
                    await User.findByIdAndUpdate(
                        id,
                        {
                            saving: [...user.saving, { name, posts: [] }],
                        },
                        {
                            new: true,
                        },
                    );
                    return res.json({ status: true, msg: 'Create album successfully' });
                } else {
                    return res.json({ status: false, msg: 'Create album failure' });
                }
            }
        } catch (error) {
            res.json({ status: false, msg: 'Create album failure' });
        }
    }
    async searchUser(req, res) {
        try {
            const username = req.params.username;
            const userList = await User.find({ username: new RegExp(username) });
            return res.json({ status: true, userList });
        } catch (error) {
            res.json({ status: false, msg: 'Không tìm thấy user' });
        }
    }
}
module.exports = new UserController();
