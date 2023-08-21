const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/notes');
const router = express.Router();
const {body, validationResult } = require('express-validator');

// Route 1: Get all the Notes using: GET "/api/notes/fetchallnotes" .Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // console.log(req.user.id);
        const notes = await Notes.find({user: req.user.id});
        // console.log(notes);
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(400).send("Internal Server Error");
    }
})

// Route 2: Add a new Note using: POST "/api/notes/addnote" .Login required
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({min: 3}),
    body("description", "Decription must be atleast 4 characters").isLength({min :5})
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // Add New Note
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(400).send("Internal Server Error");
    }
})

// Route 3: Update an existing Note using: PUT "/api/notes/updatenote" .Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // Create a newNote object
        const newNote = {};
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};

        // Find the note to be udated and update it
        let note = await Notes.findById(req.params.id);

        // Check whether the note to be updated is in database or not
        if(!note){res.status(404).send("Not Found")}

        // Check the user with its id
        if(note.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed");
        }

        // Update the note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});

    } catch (error) {
        console.error(error.message);
        res.status(400).send("Internal Server Error");
    }
})

// Route 4: Delete an existing Note using: DELETE "/api/notes/deletenote" .Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);

        // Check whether the note to be deleted is in database or not
        if(!note){res.status(404).send("Not Found")}

        // Check the user with its id
        if(note.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed");
        }

        // Delete the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Your note is deleted", note: note});

    } catch (error) {
        console.error(error.message);
        res.status(400).send("Internal Server Error");
    }
})

module.exports = router;