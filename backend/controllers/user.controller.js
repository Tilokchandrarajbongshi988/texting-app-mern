import User from "../models/user.model.js"

export const getUsersForSidebar =  async (req, res) => {
  try {
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-passWord"); //$ne means not eual Give me every user whose _id is  NOT equal to loggedInUserId. Always remeber find() always return arry to send multiple documents findOne()Single document object or `nullReturns  findById()-Single document object or `null
    res.status(200).json(filteredUsers)

  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message)
    res.status(500).json({error: "Internal server error"});
  }
}