import express, { Request, Response } from 'express';
const router = express.Router();

router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    })
    res.status(200).send();
})

export default router;
