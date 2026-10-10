const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User.Schema");

const app = express();

app.use(express.json());

// /signup - SignUp API
app.post("/signup", async (req, res) => {
    try {
        const userData = new User(req.body)
        await userData.save();
        res.status(201).send("User Create Successfully");
    } catch (error) {
        console.log("Error : " + error);
        res.status(500).send("There is a Problem with POST: /signup API");
    }
});

// /user - GET-API for find user by Using Email ID
app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.emailID;
        const user = await User.find({ emailID: userEmail });

        if (user.length > 0) {
            console.log(userEmail);
            res.status(201).send(user);
        } else {
            res.status(404).send("User Not Found with this Email ID : " + userEmail);
        }
    } catch (error) {
        console.log("Error : " + error);
        res.status(500).send("There is a Problem with GET: /user API");
    }
});

// /getuserbyid - GET-API for find user by using _id
app.get("/userid", async (req, res) => {
    try {
        const userID = req.body._id;
        const userFindedByID = await User.findById(userID);
        if (!userFindedByID) {
            res.status(404).send("User Not Found with this _id ID : " + userID);
        } else {
            res.status(201).send(userFindedByID);
        }

    } catch (error) {
        console.log("Error : " + error);
        res.status(500).send("There is a Problem with GET: /userid API");
    }
});


// /feed - GET-API for Getting All Users from Database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});

        if (users.length > 0) {
            res.status(201).send(users);
        } else {
            res.status(404).send("Can't Find Any User In Database");
        }
    } catch (error) {
        console.log("Error : " + error);
        res.status(500).send("There is a Problem with GET: /feed API");
    }
});

// /user - DELETE-API for Delete User from Database by using ID
app.delete("/user", async (req, res) => {
    const userID = req.body._id;
    try {
        const user = await User.findByIdAndDelete(userID);
        if (!user) {
            res.status(404).send("User Not Found with this ID : " + userID);
        } else {
            res.status(201).send("User Deleted Successfully with this ID : " + userID);
        }
    } catch (error) {
        console.log("Error : " + error);
        res.status(500).send("There is a Problem with DELETE: /deleteuser API");
    }
})

// /user - PATCH-API for Update User details from Database using _id
app.patch("/user/:userID", async (req, res) => {
    const userID = req.params?.userID;
    const updateData = req.body;


    try {
        const ALLOWED_UPDATES = [, "age", "gender", "photoUrl", "about", "skills"];;
        const isUpdateAllowed = Object.keys(updateData).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Invalid Update Request.");
        }

        const user = await User.findByIdAndUpdate({ _id: userID }, updateData, {
            returnDocument: "after",
            runValidators: true
        });

        if (!user) {
            res.status(404).send("User Not Found with this ID : " + userID);
        } else {
            res.status(201).send("User Updated Successfully with this ID : " + userID);
        }
    } catch (error) {
        console.log("Error : " + error);
        res.status(500).send("UPDATE Failed : " + error.message);
    }
})

// Create an update API that finds and updates a user by emailId instead of _id.
app.patch("/ube", async (req, res) => {
    const emailID = req.body.emailID;
    const updateData = req.body;
    try {
        const user = await User.findOneAndUpdate({ emailID: emailID }, updateData);

        if (!user) {
            res.status(404).send("User Not Found with this ID : " + emailID);
        } else {
            res.status(201).send("User Updated Successfully with this email : " + emailID);
        }
    } catch (error) {
        console.log("Error : " + error);
        res.status(500).send("There is a Problem with PATCH: /user API");
    }
})

connectDB()
    .then(() => {
        console.log("Database Connected Successfully");
        app.listen(3000, () => {
            console.log("Server is Running Successfully Listening on PORT : 3000")
        });
    })
    .catch((err) => {
        console.error("Database Connection Failed : ", err)
    });