const express = require("express");
const bodyparser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

require('dotenv').config();

const prisma = new PrismaClient(); // Initialize Prisma Client

const app = express();
const port = 3001;

app.use(bodyparser.json());
app.use(cors());

const accountSID = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSID, authToken);

// Function to generate a random 6-digit OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

// API endpoint to initiate OTP generation and send to user's phone
app.post("/send-otp", async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber || phoneNumber.trim().length === 0) {
        return res.status(400).send({ success: false, error: "Phone number is required" });
    }

    const otp = generateOtp();

    try {
        // Save OTP in the PostgreSQL database using Prisma
        const otpRecord = await prisma.otp.create({
            data: {
                phoneNumber: phoneNumber.trim(),
                otp: otp.toString(),
            },
        });

        // Send OTP via Twilio
        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: "+19093655548", // Your Twilio number
            to: phoneNumber.trim(),
        });

        res.send({ success: true, otp: otpRecord.otp });
    } catch (err) {
        console.error("Error sending OTP:", err);
        res.status(500).send({ success: false, error: "Failed to send OTP" });
    }
});

// API Endpoint to verify the OTP and create a new user
app.post("/verify-otp", async (req, res) => {
    const { phoneNumber, userOTP } = req.body;

    if (!phoneNumber || !userOTP) {
        return res.status(400).send({ success: false, error: "Phone number and OTP are required" });
    }

    try {
        // Retrieve OTP from the database using Prisma
        const otpRecord = await prisma.otp.findFirst({
            where: {
                phoneNumber: phoneNumber.trim(), 
                otp: userOTP.trim(),            
            },
        });

        if (otpRecord) {
            // Create a new user in the database with Prisma after OTP verification
            const newUser = await prisma.user.create({
                data: {
                    phone: phoneNumber.trim(),
                    name: "New User", 
                    district: "Unknown", 
                    state: "Unknown",    
                    pincode: "000000",
                    isVerified: true,    
                },
            });

            res.send({ success: true, user: newUser });
        } else {
            res.status(401).send({ success: false, error: "Invalid OTP or phone number" });
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).send({ success: false, error: "Error verifying OTP" });
    }
});

// API Endpoint to save location details
app.post("/save-location", async (req, res) => {
    const { state, district, pincode } = req.body;

    if (!state || !district || !pincode) {
        return res.status(400).send({ success: false, error: "State, district, and pincode are required" });
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                state: state.trim(),
                district: district.trim(),
                pincode: pincode.trim(),
                name: "", // Default value; can be updated later
                isVerified: true,
            },
        });

        res.send({ success: true, user: newUser });
    } catch (error) {
        console.error("Error saving location details:", error);
        res.status(500).send({ success: false, error: "Failed to save location details" });
    }
});

// API Endpoint to save personal details
app.post("/save-personal-details", async (req, res) => {
    const { name, gender, dob, age, phoneNumber } = req.body;

    if (!phoneNumber || phoneNumber.trim().length === 0) {
        return res.status(400).send({ success: false, error: "Phone number is required" });
    }

    try {
        // Update the user record with personal details
        const updatedUser = await prisma.user.update({
            where: { phone: phoneNumber.trim() },
            data: {
                name: name ? name.trim() : null,   
                gender: gender ? gender.trim() : null, 
                dob: dob || null,                 
                age: age || null,                
            },
        });

        res.send({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Error saving personal details:", error);
        res.status(500).send({ success: false, error: "Failed to save personal details" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});