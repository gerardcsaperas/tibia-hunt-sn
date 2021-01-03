const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to DB...");
  }
);
