import File from "../models/File";
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


export const getFile = async (page, patientId, callback) => {
    const offset = (page - 1) * 8;
    const limit = 8;

    let paginate = {
        where: {
            [Op.and]: [
                { PatientId: { [Op.like]: `%${patientId}%` } },
            ],
        },
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

export const deleteFile= async (id, callback) => {
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