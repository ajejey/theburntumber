import mongoose from "mongoose";

const connect = async () => {
    try {
        console.log("connection string ", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log("ERROR CONNECTING TO DB IN db.js", error);
    }
}

export default connect