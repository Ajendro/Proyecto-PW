const Authentication = require('../models/authenticationModel');
const User = require('../models/userModel');

exports.createAuthentication = async (req, res) => {
    try {
        const { email, password, userId } = req.body;

        // Check if the user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const newAuthentication = new Authentication({
            email,
            password,
            user: userId,
        });

        await newAuthentication.save();
        res.status(201).json({ message: 'Authentication created successfully', authentication: newAuthentication });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create authentication: Internal server error', error: error.message });
    }
};

exports.getAuthentications = async (req, res) => {
    try {
        const authentications = await Authentication.find().populate('user');
        res.status(200).json(authentications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching authentications', error: error.message });
    }
};

exports.getAuthenticationById = async (req, res) => {
    try {
        const authentication = await Authentication.findById(req.params.id).populate('user');
        if (!authentication) {
            return res.status(404).json({ message: 'Authentication not found' });
        }
        res.status(200).json(authentication);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching authentication by ID', error: error.message });
    }
};

exports.updateAuthentication = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAuthentication = await Authentication.findByIdAndUpdate(id, req.body, { new: true }).populate('user');
        if (!updatedAuthentication) {
            return res.status(404).json({ message: 'Authentication not found' });
        }
        res.status(200).json({ message: 'Authentication updated successfully', authentication: updatedAuthentication });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update authentication: Internal server error', error: error.message });
    }
};

exports.deleteAuthentication = async (req, res) => {
    try {
        const deletedAuthentication = await Authentication.findByIdAndDelete(req.params.id);
        if (!deletedAuthentication) {
            return res.status(404).json({ message: 'Authentication not found' });
        }
        res.status(200).json({ message: 'Authentication deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete authentication: Internal server error', error: error.message });
    }
};
