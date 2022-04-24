const router = require('express').Router();
const { modelCall } = require('../../util/lib');
const likeModel = require('./_model/likeModel');

router.use('/:bo_table/:wr_id', (req, res, next) => {
    if(!req.user) {
        return { err: '회원만 사용할 수 있습니다.' };
    }
    next();
})

router.post('/:bo_table/:wr_id', async (req, res) => {
    const { bg_flag } = req.body;
    const { bo_table, wr_id } = req.params;
    const { mb_id } = req.user;
    const result = await modelCall(likeModel.update, { bo_table, wr_id, mb_id, bg_flag });
    console.log(result);
    res.json(result);
});

router.delete('/:bo_table/:wr_id', async (req, res) => {
    const { bo_table, wr_id } = req.params;
    const { mb_id } = req.user;
    const result = await modelCall(likeModel.remove, { bo_table, wr_id, mb_id });
    res.json(result);
})

module.exports = router;