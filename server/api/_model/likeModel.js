const sqlHelper = require("../../../util/sqlHelper");
const db = require('../../plugins/mysql');
const TABLE = require('../../../util/TABLE');
const moment = require('../../../util/moment');

const likeModel = {
    async getFlag(bo_table, wr_id, mb_id) {
        const sql = sqlHelper.SelectSimple(TABLE.BOARD_GOOD, { bo_table, wr_id, mb_id }, ['bg_flag']);
        const [[row]] = await db.execute(sql.query, sql.values);
        return row ? row.bg_flag : 0;
    },
    async update(data) {
        data.bg_create_at = moment().format("LT");
        const sql = sqlHelper.InsertOrUpdate(TABLE.BOARD_GOOD, data);
        await db.execute(sql.query, sql.values);
        const like = await likeModel.get(data);
        return like;
    },
    async get({bo_table, wr_id, mb_id}) {
        // 좋아요 수
        const like = await likeModel.getCount(bo_table, wr_id, 1);
        // 싫어요 수
        const bad = await likeModel.getCount(bo_table, wr_id, 2);
        // 플래그
        const likeFlag = await likeModel.getFlag(bo_table, wr_id, mb_id);
        return { like, bad, likeFlag };
    },
    async getCount(bo_table, wr_id, bg_flag) {
        const sql = sqlHelper.SelectSimple(TABLE.BOARD_GOOD, {bo_table, wr_id, bg_flag}, ['COUNT(*) AS cnt']);
        const [[{cnt}]] = await db.execute(sql.query, sql.values);
        return cnt;
    },
    async remove(data) {
        const sql = sqlHelper.DeleteSimple(TABLE.BOARD_GOOD, data);
        await db.execute(sql.query, sql.values);
        const like = await likeModel.get(data);
        return like;
    },
}



module.exports = likeModel;