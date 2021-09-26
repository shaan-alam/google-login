import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model";

const googleClient = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

export const authenticateUser = async (req: Request, res: Response) => {
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: `${process.env.GOOGLE_CLIENT_ID}`,
  });

  const payload = ticket.getPayload();

  let user = await User.findOne({ email: payload?.email });
  if (!user) {
    user = await new User({
      email: payload?.email,
      avatar: payload?.picture,
      name: payload?.name,
    });

    await user.save();
  }

  res.json({ user, token });
};
