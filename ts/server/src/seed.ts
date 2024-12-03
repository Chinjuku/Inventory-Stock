// Generate Item seed
// command -> ts-node src/seed.ts

import mongoose from "mongoose";
import Item from "./models/model.item"; // Ensure this is the correct path to your model
import connectDB from "./db";

// Generate random numbers within a range
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random expire_in_type and corresponding expire_in
const generateExpireData = () => {
  const types = ["day", "month", "year"];
  const type = types[Math.floor(Math.random() * types.length)];
  let max = 30;
  if (type === "month") max = 12;
  if (type === "year") max = 5;
  return {
    expire_in: getRandomNumber(1, max).toString(),
    expire_in_type: type,
  };
};

async function seedItems() {
  try {
    connectDB();
    const items = Array.from({ length: 100 }).map((_, index) => {
      const { expire_in, expire_in_type } = generateExpireData();
      return {
        name: `น้ำยาตรวจ ${String.fromCharCode(65 + (index % 26))}${index + 1}`, // e.g., น้ำยาตรวจ A1
        expire_in,
        expire_in_type,
      };
    });

    // Insert items into the database
    await Item.insertMany(items);

    console.log("100 items seeded successfully!");
  } catch (err) {
    console.error("Error seeding items:", err);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Call the seed function
seedItems();
