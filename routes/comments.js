const express = require('express');
const router = express.Router();
const Comments = require('../schemas/comments');
const Post = require('../schemas/post');

router.get("/comments/:postsId", async (req, res) => { 
    //댓글 목록 조회 // 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼수 있게 
    const { postsId } = req.params;
    const commentsAll = await Comments.find().sort({date: -1})
    const [...comments] = commentsAll.filter((comments) => comments.postsId === postsId).map((v) => {
        return {
            postsId: v.postsId,
            name: v.name,
            date: v.date,
            contents: v.contents
        }
    });
    res.json(comments)
});

router.post("/comments/:postsId", async (req, res) => { // 댓글 작성
    const { postsId } = req.params;
    const { name, contents } = req.body;

    if ( contents === "" ) {
        return res.send("댓글 내용을 입력해주세요")
    }else{
        const createdComments = await Comments.create({ postsId, name, contents });

        res.json({ commnets: createdComments });
    }
});

router.put("/comments/:commentsC", async (req, res) => { //댓글 수정
    const { commentsC } = req.params;
    const { contents } = req.body;

    if ( contents === "" ) {
        return res.send("댓글 내용을 입력해주세요")
    }
    await Comments.updateOne({ contents: commentsC }, { $set: { contents }}); 
    res.json({ success: true });
    
})

router.delete("/comments/:commentsC", async (req, res) => { //댓글 삭제
    const { commentsC } = req.params;
    
    
    await Comments.deleteOne({ contents: commentsC });
    res.json({ result: "success" });
});

module.exports = router;

