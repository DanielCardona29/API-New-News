import User from '../models/User.js';
import Role from '../models/Role.js';

export default class user_Controller {
    constructor() {};

    async findUsersList(req, res) {

        const users = await User.find({ name: { $type: 2 } }, { pass: 0, id: 0, createdAt: 0, updatedAt: 0 }).populate('roles', { _id: 0 });
        console.log(users);
        res.status(200).json(users)
    }
}