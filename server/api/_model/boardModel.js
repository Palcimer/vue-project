const db = require('../../plugins/mysql');
const TABLE = require('../../../util/TABLE');
const sqlHelper = require('../../../util/sqlHelper');

const boardModel = {
    async getConfig(bo_table) {
        const sql = sqlHelper.SelectSimple(TABLE.BOARD, {bo_table});
       
        const [[row]] = await db.execute(sql.query, sql.values);
        // console.log(row);
        if(!row) {
            throw new Error(`${bo_table} 게시판이 없습니다.`);
        }
        try {
            row.bo_category = JSON.stringify(row.bo_category);
            row.wr_fields = JSON.stringify(row.wr_fields);
            row.bo_sort = JSON.stringify(row.bo_sort);
        } catch(e) {

        }
        return row;
    }
};

module.exports = boardModel;