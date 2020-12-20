const mongoose = require("mongoose");
const Group = require("../models/groupModel");

exports.saveGroup = async (data) => {
    console.log("saveGroup:", data);
    data._id = new mongoose.Types.ObjectId();
    const group = new Group(data);
    await group.save();
};

exports.getGroup = async (id) => {
    console.log("getGroup:", id);
    try {
        group = await Group.findOne({ id: id }).exec();
        return group;
    } catch (error) {
        console.log(error);
    }
};

exports.getAllGroups = async () => {
    console.log("getAllGroups");
    try {
        group = await Group.find({}).exec();
        return group;
    } catch (error) {
        console.log(error);
    }
};

// exports.getAllSpacsWithS1 = async () => {
//     console.log("getAllSpacs");
//     // https://docs.mongodb.com/manual/reference/operator/query/type/
//     // 2 - String
//     try {
//         spac = await Spac.find({ s1FormUrl: { $type: 2 } }).exec();
//         return spac;
//     } catch (error) {
//         console.log(error);
//     }
// };

// exports.countAllSpacsWithS1 = async () => {
//     console.log("countAllSpacsWithS1");
//     try {
//         return await Spac.find({ s1FormUrl: { $type: 2 } })
//             .countDocuments()
//             .exec();
//     } catch (error) {
//         console.log(error);
//     }
// };

exports.updateGroup = async (id, updateValues) => {
    // var updateValues = { $set: {name: "Mickey", address: "Canyon 123" } };
    // https://mongoosejs.com/docs/api.html#model_Model.updateOne
    console.log("updateGroup id:", id);
    try {
        let res = await Group.updateOne(
            { _id: id },
            updateValues
        ).exec();
        return res;
    } catch (error) {
        console.log(error);
    }
};

// exports.updateSpacWithNewFields = async (cik, data) => {
//     // var updateValues = { $set: {name: "Mickey", address: "Canyon 123" } };
//     console.log("updateSpac:", cik);
//     try {
//         spac = await Spac.replaceOne({ cik: cik }, data).exec();
//         return spac;
//     } catch (error) {
//         console.log(error);
//     }
// };