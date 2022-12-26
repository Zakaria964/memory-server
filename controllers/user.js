import bcrypt from "bcrypt"; // form hashing the Password
import jwt from "jsonwebtoken"; // for storing the user in the browser for some periods of time, that way, if the user leaves the site, he will still be able to stay logged in no matter what.
import User from "../models/User.js";
/* -------------------------------------------------------------------------- */

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    // Actually wrong error or password should be return same message text for more security.
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ decoded: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.find({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User already exist." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const decoded = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: decoded.email, id: decoded._id },
      "secret",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ decoded, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
