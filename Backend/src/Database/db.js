import mongoose from "mongoose"

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL);

      console.log("MONGODB Connected Successfully!")
    } catch (error) {
        console.error("Error Connecting To MONGODB: ",error)
    }
}
