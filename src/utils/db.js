import mongoose from "mongoose";

const connect = async () => {
    try {
        console.log("connection string ", process.env.DATABASE_URL);
        await mongoose.connect(process.env.DATABASE_URL);
    } catch (error) {
        console.log("ERROR CONNECTING TO DB IN db.js", error);
    }
}

export default connect