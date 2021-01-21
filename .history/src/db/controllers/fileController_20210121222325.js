import File from "../models/File";
import Patient from "../models/Patient";
import sequelize from "../sequelize";
const { Op } = require("sequelize");



export const AddFile = async (data, callback) => {
    sequelize
        .sync()
        .then(async () => {
            File.create(data)
                .then((result) => callback(true))
                .catch((err) => {
                    console.log('err', err)
                    callback(false);
                });
        })
        .catch((e) => callback(false));
};


export const getFile = async (page, patientId,patientName, callback) => {
    const offset = (page - 1) * 8;
    const limit = 8;
    var patientIdWhere = patientId == null ? '%%' : `%${patientId}%`;
    // var patientNameWhere = patientName == null ? '%%' : `%${patientName}%`;
    let paginate = {
        where: {
            [Op.and]: [
                { PatientId: { [Op.like]: patientIdWhere } },
            ],
        },
        // include: [{ model: Patient, where: { name: { [Op.like]: patientNameWhere } } }],
        limit,
        offset,
        order: [["id", "DESC"]],
    };
    const total = await File.count(paginate);
    const files = await File.findAll(paginate);
    if (files.every((file) => file instanceof File)) {
        callback({
            status: true,
            files: JSON.parse(JSON.stringify(files, null, 2)),
            total,
            pages: Math.ceil(total / limit),
        });
    } else {
        callback({ status: false });
    }
};

export const getAttachments = async (page, patientName, callback) => {
    const offset = (page - 1) * 8;
    const limit = 8;
    var patientNameWhere = patientName == null ? '%%' : `%${patientName}%`;
    // var patientWhere = patientName == null ? '%%' : `%${patientName}%`;
    let paginate = {
        // where: {
        //     [Op.and]: [
        //         { PatientId: { [Op.like]: patientId } },
        //     ],
        // },
        include: [{ model: Patient, where: { name: { [Op.like]: patientNameWhere } } }],
        limit,
        offset,
        order: [["id", "DESC"]],
    };
    const total = await File.count(paginate);
    const files = await File.findAll(paginate);
    if (files.every((file) => file instanceof File)) {
        callback({
            status: true,
            files: JSON.parse(JSON.stringify(files, null, 2)),
            total,
            pages: Math.ceil(total / limit),
        });
    } else {
        callback({ status: false });
    }
};


export const updateFile = async (id, data, callback) => {
    sequelize
        .sync()
        .then(async () => {
            const file = await File.update(data, {
                where: {
                    id: id
                }
            });
            if (file) {
                callback({ status: true });
            } else {
                callback({ status: false });
            }
        })
        .catch((e) => callback({ status: false }));
};

export const deleteFile = async (id, callback) => {
    sequelize
        .sync()
        .then(async () => {
            const file = await File.destroy({
                where: {
                    id: id
                }
            });
            if (file) {
                callback({ status: true });
            } else {
                callback({ status: false });
            }
        })
        .catch((e) => callback({ status: false }));
};