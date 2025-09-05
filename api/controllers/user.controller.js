import User from '../models/user.model.js';  // Import the User model


export const test =  (req,res) =>
{
    res.json({
        message:"API is working!",
    });
};

// Fetch user by ID

// Fetch user by ID
export const getUserByAadharCard = async (req, res) => {
    try {
        const { aadharID } = req.params;  // Get the aadhar ID from the route parameter
        const user = await User.findOne({ aadharCard: aadharID }); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });  // If no user is found, send an error
        }

        res.status(200).json(user);  // Send the user details as the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });  // Handle any server errors
    }
};