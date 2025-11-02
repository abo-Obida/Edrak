import mongoose from "mongoose";

const uri = "mongodb://bdalrhmnalsmrt64_db_user:abd12345as@ac-lcziv2z-shard-00-00.34ixian.mongodb.net:27017,ac-lcziv2z-shard-00-01.34ixian.mongodb.net:27017,ac-lcziv2z-shard-00-02.34ixian.mongodb.net:27017/Edrak?ssl=true&replicaSet=atlas-37cls4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const studentSchema = new mongoose.Schema({ name: String, age: Number });
const Student = mongoose.model("Student", studentSchema);

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    const doc = await Student.create({ name: "Ali", age: 20 });
    console.log("✅ Document inserted:", doc);

    await mongoose.disconnect();
    console.log("✅ Disconnected");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

seed();
