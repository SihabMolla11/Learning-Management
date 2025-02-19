import User from "../models/user.model";

export const checkValidUserService = async (id: string) => {
  try {
    const user = await User.findOne({ id });
    return user;
  } catch (error) {
    console.log("bnala error")
  }
};
