const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

// @desc Get all contact
// @route GET /api/contacts
// @acces public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// @desc Create new contact
// @route POST /api/contacts
// @acces public

const createContact = asyncHandler(async (req, res) => {
    console.log("The request bosy is: ", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are needed");
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(contact);
});

// @desc Create new contact
// @route GET /api/contacts/:id
// @acces public

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Update new contact
// @route PUT /api/contacts/:id
// @acces public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

// @desc Delete new contact
// @route DELETE /api/contacts/:id
// @acces public

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json(contact);
});

module.exports = { getContact, createContact, getContacts, updateContact, deleteContact};