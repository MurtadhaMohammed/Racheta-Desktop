import Patient from "../models/Patient";
import sequelize from "../sequelize";
const { Op } = require("sequelize");

export const createPatient = async (data, callback) => {
  sequelize
    .sync()
    .then(async () => {
      Patient.create(data)
        .then((result) => callback(true))
        .catch((err) => {
          console.log('err', err)
          callback(false);
        });
    })
    .catch((e) => callback(false));
};

export const getPatients = async (page, query,callback) => {
  const offset = (page - 1) * 8;
  const limit = 8;
  
  let paginate = {
    where: {
      [Op.and]: [
        { name: { [Op.like]: `%${query}%` } },
      ],
    },
    limit,
    offset,
    order: [["id", "DESC"]],
  };
  const total = await Patient.count(paginate);
  const patients = await Patient.findAll(paginate);
  if (patients.every((patient) => patient instanceof Patient)) {
    callback({
      status: true,
      patients: JSON.parse(JSON.stringify(patients, null, 2)),
      total,
      pages: Math.ceil(total / limit),
    });
  } else {
    callback({ status: false });
  }
};


export const updatePatient = async (id, data, callback) => {
  sequelize
      .sync()
      .then(async () => {
          const patient = await Patient.update(data, {
              where: {
                  id: id
              }
          });
          if (patient) {
              callback({ status: true });
          } else {
              callback({ status: false });
          }
      })
      .catch((e) => callback({ status: false }));
};

export const deletePatient= async (id, callback) => {
  sequelize
      .sync()
      .then(async () => {
          const patient = await Patient.destroy({
              where: {
                  id: id
              }
          });
          if (patient) {
              callback({ status: true });
          } else {
              callback({ status: false });
          }
      })
      .catch((e) => callback({ status: false }));
};