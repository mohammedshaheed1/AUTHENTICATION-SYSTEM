import mongoose from "mongoose";

const connectDB = async()=>{

    mongoose.connection.on('connected',()=> console.log("Database connected"))
    // await mongoose.connect(`${process.env.MONGODB_URI }/MERN-AUTH`)
        await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'mern-auth', // Specify the database name
    });
}

export default connectDB

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     // Connect to MongoDB without deprecated options
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: 'mern-auth', // Specify the database name
//     });

//     mongoose.connection.on('connected', () => {
//       console.log("Database connected successfully");
//     });

//   } catch (error) {
//     console.error("Error connecting to database:", error);
//     process.exit(1); // Exit process with failure code if connection fails
//   }
// };

// export default connectDB;
