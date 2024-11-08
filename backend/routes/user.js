// backend/routes/user.js
import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken';
// const path = require('path');
import path from 'path';
import { Account } from '../models/account.js';
import { JWT_SECRET } from '../config.js';
import { authMiddleware } from '../middleware.js';
import { User } from '../models/user.js';


import { Account } from '../../Meta-AR-VR.ai/backend/models/account.js';
import { JWT_SECRET } from '../../Meta-AR-VR.ai/backend/config.js';
import { authMiddleware } from '../../Meta-AR-VR.ai/backend/middleware.js';
import { uploadFileWithCurl } from '../../Meta-AR-VR.ai/backend/Ml/NullPointer.js';
import { downloadFile } from '../../Meta-AR-VR.ai/backend/Ml/NullPointerD.js';

import { askai } from '../../Meta-AR-VR.ai/backend/Ml/langchain.js';
import { askai } from '../Ml/langchain.js';
import{downloadFile} from "../Ml/NullPointerD.js"
import {uploadFileWithCurl} from "../Ml/NullPointer.js"

const currentDirectory = process.cwd()
// const targetDirectory = path.join(currentDirectory, '..', 'public');

// Change the current directory to the target directory
// process.chdir(targetDirectory);
// console.log(targetDirectory);
const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });
});

router.post('/authorize', async (req, res) => {
    const word = req.headers.authorization.split(" ");
    const token = word[1];
    console.log(word);
    try {
        const response = await jwt.verify(token, JWT_SECRET);

        if (response.userId) {
            res.status(200).json({
                message: "You are authorised"
            });
        } else {
            res.status(201).json({
                message: "you are not authoriesed"
            });
        }
    } catch (err) {
        res.status(201).json({
            message: "you are not authoriesed"
        });
    }
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        });
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne(req.body, {
        id: req.userId
    });

    res.json({
        message: "Updated successfully"
    });
});

router.post('/upload', async (req, res) => {
    const pathofFile = req.body.path;
    // const filenameRegex = /\/([^/]+)$/;
    // const matches = pathofFile.match(filenameRegex);
    // const filename = matches[1];
    // console.log(filename);

    const fileURL = await uploadFileWithCurl(pathofFile);
    console.log(fileURL);
    const regex = /[^\\/]+$/; // Regex pattern to match the filename
    const filename = pathofFile.match(regex);
    // const outputFilePath = '\\' + filename;
    const outputFilePath = `public/${filename}`;
    console.log('Output File Path:', outputFilePath);
    // console.log(outputFilePath[0]);
    downloadFile(fileURL, outputFilePath)
        .then(() => {
            console.log('File downloaded successfully!');
            res.status(200).json({
                message: 'File downloaded successfully!',
                outputFilePath,
                url: fileURL,
                filename: filename
            });
        })
        .catch((err) => {
            console.error('Error downloading file:', err);
            res.status(404).json({
                message: "Error Occured"
            });
        });
});

router.get('/askai', async (req, res) => {
    const pathtofile = "public/lecture.pdf";
    const response = await askai(pathtofile);
    res.json({
        message: "ai responded!",
        data: response
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

export default router;