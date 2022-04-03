const path = require('path');
const fs = require('fs');
const moment = require('../../../util/moment');
const db = require('../../plugins/mysql');
const TABLE = require('../../../util/TABLE');
const sqlHelper = require('../../../util/sqlHelper');
const jwt = require('../../plugins/jwt');
const tagModel = require('./tagModel');
const { getSummary } = require('../../../util/lib');

const boardModel = {
    async getConfig(bo_table) {
        const sql = sqlHelper.SelectSimple(TABLE.BOARD, { bo_table });

        const [[row]] = await db.execute(sql.query, sql.values);
        // console.log(row);
        if (!row) {
            throw new Error(`${bo_table} 게시판이 없습니다.`);
        }
        try {
            row.bo_category = JSON.parse(row.bo_category);
            row.wr_fields = JSON.parse(row.wr_fields);
            row.bo_sort = JSON.parse(row.bo_sort);
        } catch (e) {

        }
        return row;
    },
    async uploadFile(bo_table, bf_desc, file, wr_id = 0) {
        const ext = path.parse(file.name).ext;
        const time = new Date().getTime();
        const dest = `${UPLOAD_PATH}/${bo_table}/${file.md5}${time}${ext}`;
        file.mv(dest);
        const bf_src = path.parse(dest).base;
        const payload = {
            bo_table,
            wr_id,
            bf_name: file.name,
            bf_src,
            bf_desc,
            bf_type: file.mimetype,
            bf_size: file.size,
            bf_create_at: moment().format('LT'),
        };
        console.log(payload)
        const sql = sqlHelper.Insert(TABLE.BOARD_FILE, payload);
        const [rows] = await db.execute(sql.query, sql.values);
        const result = {
            bf_id: rows.insertId,
            bf_src
        }
        return result;
    },
    async removeFile(bo_table, file) {
        const { bf_id, bf_src } = file;
        const filePath = `${UPLOAD_PATH}/${bo_table}/${bf_src}`;
        const cachePath = `${UPLOAD_PATH}/${bo_table}/.cache`;
        const baseName = path.parse(bf_src).name;
        console.log("removeFile", filePath, cachePath, baseName, bf_src);
        // 파일 삭제
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        // 썸네일 삭제
        if (fs.existsSync(cachePath)) {
            const cacheDir = fs.readdirSync(cachePath);
            for (const p of cacheDir) {
                if (p.startsWith(baseName)) {
                    try {
                        console.log(`delete ${p}`);
                        fs.unlinkSync(`${cachePath}/${p}`);
                    } catch (e) {
                        console.log(`delete ${p} error`, e.message);
                    }
                }
            }
        }
        // DB 삭제
        const sql = sqlHelper.DeleteSimple(TABLE.BOARD_FILE, { bf_id });
        await db.execute(sql.query, sql.values);
    },
    async writeInsert(bo_table, data, files) {
        // 에디터에서 업로드한 이미지 목록
        const upImages = JSON.parse(data.upImages);
        delete data.upImages;
        // 태그 목록
        const wrTags = JSON.parse(data.wrTags);
        delete data.wrTags;
        // 게시판 테이블명
        const table = `${TABLE.WRITE}${bo_table}`;

        if (data.wr_parent == 0) { // 새 글
            const grpQuery = `SELECT MAX(wr_grp) AS wr_grp FROM ${table}`;
            const [[{ wr_grp }]] = await db.execute(grpQuery);
            data.wr_grp = wr_grp ? wr_grp + 1 : 1;
            data.wr_order = 0;
            data.wr_dep = 0;

        } else { // 답글
            const grpQuery = `SELECT wr_grp, wr_order, wr_dep FROM ${table} WHERE wr_id=${data.wr_parent}`;
            const [[parent]] = await db.execute(grpQuery);
            data.wr_grp = parent.wr_grp;
            data.wr_order = parent.wr_order + 1;
            data.wr_dep = parent.wr_dep + 1;
            const uSql = `UPDATE ${table} SET wr_order=wr_order+1 WHERE wr_reply=${data.wr_reply}
            AND wr_grp=${parent.wr_grp} AND wr_order >= ${data.wr_order}`;
            await db.execute(uSql);
            

        }

        data.wr_create_at = moment().format('LT');
        data.wr_update_at = moment().format('LT');

        // 요약정보
        data.wr_summary = getSummary(data.wr_content, 250);

        if (data.wr_password) { // 비회원 게시물
            data.wr_password = jwt.generatePassword(data.wr_password);
        }

        console.log("새 글 등록 전")
        const sql = sqlHelper.Insert(table, data);
        const [rows] = await db.execute(sql.query, sql.values);
        const wr_id = rows.insertId; // 게시물 아이디
        console.log("글 등록 후")

        console.log("태그 등록 전")
        console.log("wrTags=====", wrTags);
        // 태그 등록
        await tagModel.registerTags(bo_table, wr_id, wrTags);
        console.log("태그 등록 후")

        console.log("파일 등록 전")
        // 첨부파일 등록
        if (files) {
            const keys = Object.keys(files);
            for (const key of keys) {
                const file = files[key];
                await boardModel.uploadFile(bo_table, "", file, wr_id);
            }
        }
        console.log("파일 등록 후")

        console.log("이미지 조작 전")
        // 에디터 사용중 이미지를 넣었다 지우는 경우를 위해 에디터 이미지가 있는지 확인해서 없는 것들을 제거
        await boardModel.clearImages(bo_table, wr_id, data.wr_content, upImages);
        console.log("이미지 조작 후")

        // await db.commit();

        return { wr_id };


    },
    async clearImages(bo_table, wr_id, wr_content, upImages) {
        for (const img of upImages) {
            if (wr_content.indexOf(img.bf_src) > -1) { // 게시물에 이미지가 있을 때
                const sql = sqlHelper.Update(TABLE.BOARD_FILE, { wr_id }, { bf_id: img.bf_id });
                await db.execute(sql.query, sql.values);
            } else { // 게시물에 이미지가 없을 때
                await boardModel.removeFile(bo_table, img);
            }
        }
    },

    async getList(bo_table, config, options, member) {
        console.log("getList");
        const table = `${TABLE.VIEW}${bo_table}`;
        const sql = sqlHelper.SelectLimit(table, options);
        console.log("getList sql", sql);
        const [[{ totalItems }]] = await db.execute(sql.countQuery, sql.values);
        const [items] = await db.execute(sql.query, sql.values);
        return { items, totalItems };
    },

    async getItem(bo_table, wr_id, member) {
        const table = `${TABLE.VIEW}${bo_table}`;
        const sql = sqlHelper.SelectSimple(table, { wr_id });
        const [[item]] = await db.execute(sql.query, sql.values);
        if (!item) {
            throw new Error('게시물이 없습니다.');
        }

        // 첨부파일 목록 추가
        const files = await boardModel.getItemFiles(bo_table, wr_id, item.wr_content)
        item.wrImgs = files.wrImgs;
        item.wrFiles = files.wrFiles;
        
        // 태그 목록 추가
        item.wrTags = await tagModel.getTags(bo_table, wr_id);

        // TODO: 좋아요

        delete item.wr_password;
        return item;
    },

    async getItemFiles(bo_table, wr_id, wr_content = "") {
        const sql = sqlHelper.SelectSimple(TABLE.BOARD_FILE, { bo_table, wr_id }, ['bf_id', 'bf_name', 'bf_src', 'bf_desc', 'bf_type', 'bf_size']);
        const [rows] = await db.execute(sql.query, sql.values);
        const wrImgs = []; // 본문에 첨부된 이미지 목록
        const wrFiles = []; // 첨부파일 목록
        for(const row of rows) {
            if(wr_content.indexOf(row.bf_src) > -1) { // 본문에 경로가 있음: 본문 이미지
                wrImgs.push(row);
            }  else { // 경로가 없음: 첨부파일
                row.remove = false; // 수정 시 파일 삭제 여부
                wrFiles.push(row);
            }
        }

        return {wrImgs, wrFiles};

    },

    async writeUpdate(bo_table, wr_id, data, files) {
        const table = `${TABLE.WRITE}${bo_table}`;
        delete data.wr_id;

        // 기존 첨부파일
        const wrFiles = JSON.parse(data.wrFiles);
        delete data.wrFiles;

        // 기존 첨부파일의 remove가 true이면 파일삭제
        for(const wrFile of wrFiles) {
            if(wrFile.remove) {
                await boardModel.removeFile(bo_table, wrFile);
            }
        }
        // 새로운 첨부파일 등록
        if (files) {
            const keys = Object.keys(files);
            for (const key of keys) {
                const file = files[key];
                await boardModel.uploadFile(bo_table, "", file, wr_id);
            }
        }

        // 에디터 이미지 처리
        const upImages = JSON.parse(data.upImages).concat(JSON.parse(data.wrImgs));
        delete data.upImages;
        delete data.wrImgs;
        await boardModel.clearImages(bo_table, wr_id, data.wr_content, upImages);

        // 에디터 정리
        delete data.wr_create_at; // 생성일 삭제
        delete data.wr_password; // 비밀번호 삭제
        data.wr_update_at = moment().format('LT');
        data.wr_summary = getSummary(data.wr_content, 250);
        delete data.good; // 좋아요 삭제
        delete data.bad;
        delete data.replies;
        delete data.goodFlag;

        // 태그 삭제 후 등록
        const wrTags = JSON.parse(data.wrTags);
        delete data.wrTags;
        await tagModel.registerTags(bo_table, wr_id, wrTags);

        const sql = sqlHelper.Update(table, data, {wr_id});
        const [rows] = await db.execute(sql.query, sql.values);
        if(rows.affectedRows) { // 제대로 등록이 되었다면
            return {wr_id};
        }
    }
};

module.exports = boardModel;