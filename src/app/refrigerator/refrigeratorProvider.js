const jwtMiddleware = require("../../../config/jwtMiddleware");
const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const refrigeratorDao = require("./refrigeratorDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// Provider: Read 비즈니스 로직 처리

exports.inquireRefrigerator = async function (user_id) {
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        const inquireResult = await refrigeratorDao.selectRefrigerator(connection, user_id);
        connection.release();
        return inquireResult;
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}