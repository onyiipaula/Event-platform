const {user} = require('../models');

const getUserbyId = async (userId) => {
    try{
        const user = await
        user.findbyId(userId);
           return user;

    }catch (error) {
        throw new Error('error in getUserById:', error);
    }
};

const updateUserProfile = async (userId, updatedData) =>{
    try{
        const user = await
        user.findbyIdAndUpdate(userId, updatedData, {new: true});
        return user;
    }catch (error){
        throw new error('error in deleteUserAccount:', error)
    }
};

const deleteUserAccount = async (userId) =>{
    try{
        await
        user.findbyIdAndDelete(userId);
    }catch (error){
        throw new error('error in deleteUserAccount:', error)
    }
};

module.exports= {
    getUserbyId, updateUserProfile, deleteUserAccount
}