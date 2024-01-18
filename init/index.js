// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "65a4b8f25bc76cc0b09d87be",
//   }));
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };
// initDB();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("Connected to DB");
    return initDB();
  })
  .then(() => {
    console.log("Data was initialized");
  })
  .catch((err) => {
    console.error("Error:", err.message);
  })
  .finally(() => {
    mongoose.disconnect();
  });

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  } catch (error) {
    throw new Error(`Error connecting to MongoDB: ${error.message}`);
  }
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "65a4b8f25bc76cc0b09d87be",
    }));
    await Listing.insertMany(initData.data);
  } catch (error) {
    throw new Error(`Error initializing database: ${error.message}`);
  }
};
