const express = require('express');
const router = express.Router();
const Post = require('../schemas/post');

router.get("/posts", async (req, res) => { // DB에 있는 게시글 모두 조회
    // const posts = await Post.find({ title, name, date }).sort({date});
    const postsall = await Post.find().sort({date: -1})
    const [...posts] = postsall.map((v) => { 
        return {
            postsId: v.postsId,
            title: v.title,
            name: v.name,
            date: v.date
        };
    });

    res.json(posts) // 날짜순 정렬, 제목 작성자명 작성날짜만 표시
});

router.get("/posts/:postsId", async (req, res) => { // 게시글 id로 게시글 상세 조회
    const { postsId } = req.params;
    const posts = await Post.find();
    const [...detail] = posts.filter((posts) => posts.postsId === Number(postsId)).map((v) => {
        return {
          title: v.title,
          name: v.name,
          date: v.date,
          contents: v.contents
        }
      });
    res.json(detail);; //제목 작성자명 작성날짜 작성내용
});

router.post("/posts", async (req, res) => { // 게시글 등록 , 제목, 작성자명, 비밀번호, 작성내용
    const { postsId, name, password, date, title, contents } = req.body;

    const posts = await Post.find({ postsId });
    if (posts.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }

    const createdGoods = await Post.create({ postsId, name, password, date, title, contents });

    res.json({ posts: createdGoods });
});

router.put("/posts/:password", async (req, res) => { //게시글 수정
    const { password } = req.params;
    const { contents, title } = req.body;

    const existsPosts = await Post.find({ password: String(password) });
    if (existsPosts.length) { 
        await Post.updateOne ({ password: String(password) }, { $set: { contents, title } } ); //제목, 내용 수정
    }

    res.json({ success: true });
})

router.delete("/posts/:password", async (req, res) => { // 게시글 삭제
const { password } = req.params;

const existsPosts = await Post.find({ password });
if (existsPosts.length > 0) {
    await Post.deleteOne({ password });
}

res.json({ result: "success" });
});

module.exports = router;