import jwt from 'jsonwebtoken'

export const userExits = (req, res, next) => {
    const token = req.cookies.user_token;

    if (!token)
        return redirect("/")
    try {
        const userID = jwt.verify(token, process.env.JWT_KEY);
        req.user = userID;
        next()
    } catch (error) {
        console.log(error);
        res.clearCookie("user_token");
        redirect('/')
    }
}
