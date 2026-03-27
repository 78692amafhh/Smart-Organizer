const app = require("./src/app");

// app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, ()=>{
    console.log("Server is running on port # 3000")
});