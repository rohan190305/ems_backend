import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import State from "./src/models/State.js";
import City from "./src/models/City.js";
import Department from "./src/models/Department.js";

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");

  await State.deleteMany();
  await City.deleteMany();
  await Department.deleteMany();

  const states = await State.insertMany([
    { name: "Maharashtra" },
    { name: "Gujarat" },
    { name: "Rajasthan" },
    { name: "Delhi" },
    { name: "Karnataka" },
  ]);

  const [mh, gj, rj, dl, ka] = states;

  await City.insertMany([
    { name: "Mumbai", state: mh._id },
    { name: "Pune", state: mh._id },
    { name: "Nagpur", state: mh._id },
    { name: "Ahmedabad", state: gj._id },
    { name: "Surat", state: gj._id },
    { name: "Jaipur", state: rj._id },
    { name: "Jodhpur", state: rj._id },
    { name: "New Delhi", state: dl._id },
    { name: "Bengaluru", state: ka._id },
    { name: "Mysuru", state: ka._id },
  ]);

  await Department.insertMany([
    { name: "HR" },
    { name: "Finance" },
    { name: "Engineering" },
    { name: "Marketing" },
    { name: "Operations" },
  ]);

  console.log("Seed data inserted successfully");
  process.exit(0);
};

seed().catch((err) => {
  console.log("Seed error:", err);
  process.exit(1);
});
