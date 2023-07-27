const cors = require("cors");
const express = require("express");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

require("./routes/userRoute")(app);
require("./routes/lectureRoute")(app);
require("./routes/enrollmentRoute")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});
