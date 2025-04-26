const SensorData = require("../models/sensorModel");
const { Op, fn, col } = require("sequelize"); // Import Sequelize utilities
const database = require("../db/database"); // Import your database connection instance
exports.all = async (req, res) => {
  try {
    const result = await SensorData.findAll();
    return res.status(200).json({
      status: 200,
      success: true,
      message: "ok",
      data: {
        result,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

exports.find = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SensorData.findOne({
      where: {
        id: id,
      },
    });

    if (!SensorData) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "sensor Data not found",
        data: null,
        error: "Sensor Data Not Found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "ok",
      data: {
        result: result,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

// Tambahkan handler GET untuk menyimpan data sensor
exports.create = async (req, res) => {
  try {
    const { produk, temperature, humidity, gas, fan_status, lamp_status } =
      req.query; // Mengambil data dari query string

    const temp = parseFloat(temperature);
    const hum = parseFloat(humidity);
    const gasValue = parseFloat(gas);

    console.log(temp, humidity, gasValue);

    // Validasi data jika diperlukan
    if (isNaN(temp) || isNaN(hum) || isNaN(gasValue)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid input data",
        data: null,
        error: "Bad Request",
      });
    }

    // Validasi status fan dan lampu, hanya bisa ON atau OFF
    if (
      !["ON", "OFF"].includes(fan_status) ||
      !["ON", "OFF"].includes(lamp_status)
    ) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid fan or lamp status",
        data: null,
        error: "Bad Request",
      });
    }

    // Simpan data ke database
    const result = await SensorData.create({
      id_produk: produk, // Gunakan produk dari query atau default "IC001"
      suhu: temp,
      humid: hum,
      gas: gasValue,
      fan: fan_status.toUpperCase(), // Pastikan nilai fan dalam huruf kapital
      lampu: lamp_status.toUpperCase(), // Pastikan nilai lampu dalam huruf kapital
    });
    console.log(result);

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Sensor data created successfully",
      data: {
        result,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};

exports.getSensorStats = async (req, res) => {
  try {
    // SELECT max(`suhu`) AS `max_suhu` FROM `tb_cuaca` AS `tb_cuaca` LIMIT 1
    const suhumax = await SensorData.findOne({
      attributes: [[fn("max", col("suhu")), "max_suhu"]],
    });

    // SELECT min(`suhu`) AS `min_suhu` FROM `tb_cuaca` AS `tb_cuaca` LIMIT 1
    const suhumin = await SensorData.findOne({
      attributes: [[fn("min", col("suhu")), "min_suhu"]],
    });

    // SELECT avg(`suhu`) AS `average` FROM `tb_cuaca` AS `tb_cuaca` LIMIT 1
    const average = await SensorData.findOne({
      attributes: [[fn("avg", col("suhu")), "average"]],
    });

    // SELECT max(`humid`) AS `max_humid` FROM `tb_cuaca` AS `tb_cuaca` LIMIT 1
    const humidmax = await SensorData.findOne({
      attributes: [[fn("max", col("humid")), "max_humid"]],
    });

    // debugging
    // console.log("Max Temp:", suhumax);
    // console.log("Min Temp:", suhumin);
    // console.log("Average Temp:", average);

    if (!suhumax || !suhumin || !average) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Data not found",
        data: null,
        error: "Data not found",
      });
    }

    // SELECT `id`, `suhu`, `humid`, `lux`, `ts` FROM `tb_cuaca` AS `tb_cuaca` WHERE `tb_cuaca`.`suhu` = '36' AND `tb_cuaca`.`humid` = '36';
    const nilaiSuhuMaxHumidMax = await SensorData.findAll({
      where: {
        suhu: suhumax.dataValues.max_suhu,
        humid: humidmax.dataValues.max_humid,
      },
    });

    // SELECT DATE_FORMAT(`ts`, '%m-%Y') AS `month_year` FROM `tb_cuaca` AS `tb_cuaca` GROUP BY `month_year`
    const monthYearMax = await SensorData.findAll({
      attributes: [[fn("DATE_FORMAT", col("ts"), "%m-%Y"), "month_year"]],
      group: ["month_year"],
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "ok",
      data: {
        suhumax: suhumax.dataValues.max_suhu,
        suhumin: suhumin.dataValues.min_suhu,
        average: average.dataValues.average,
        nilai_suhu_max_humid_max: nilaiSuhuMaxHumidMax.map((item) => ({
          id: item.id,
          suhu: item.suhu,
          humid: item.humid,
          gas: item.gas,
          Timestamp: item.ts,
        })),
        month_year_max: monthYearMax.map((item) => ({
          month_year: item.dataValues.month_year,
        })),
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "internal server error",
      data: null,
      error: "Internal Server Error",
    });
  }
};
