"use strict";

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

/* ==================================================
   トップページ
   3つのデータ管理システムへの入口
================================================== */
app.get("/", (req, res) => {
  res.render("index");
});

/* ==================================================
   津田沼駅周辺施設管理
================================================== */

let facilities = [
  {id: 1,name: "マクドナルド 津田沼店",category: "飲食店",walk: "徒歩3分",hours: "6:00~0:00"},
  {id: 2,name: "モリシア津田沼",category: "商業施設",walk: "徒歩5分",hours: "10:00〜21:00"},
  {id: 3,name: "津田沼公園",category: "公共施設",walk: "徒歩7分",hours: "常時開放"}
  
];

/* 一覧表示 */
app.get("/facilities", (req, res) => {
  res.render("facilities/facilities", { data: facilities });
});

/* 新規作成画面 */
app.get("/facilities/create", (req, res) => {
  res.render("facilities/facilities_new");
});


/* 新規登録 */
app.post("/facilities", (req, res) => {
  facilities.push({
    id: facilities.length + 1,
    name: req.body.name,
    category: req.body.category,
    walk: req.body.walk,
    hours: req.body.hours
  });
  res.redirect("/facilities");
});


/* 詳細表示 */
app.get("/facilities/:number", (req, res) => {
  const number = req.params.number;
  res.render("facilities/facilities_detail", {
    id: number,
    data: facilities[number]
  });
});


/* 編集画面 */
app.get("/facilities/edit/:number", (req, res) => {
  const number = req.params.number;
  res.render("facilities/facilities_edit", {
    id: number,
    data: facilities[number]
  });
});

/* 更新処理 */
app.post("/facilities/update/:number", (req, res) => {
  const number = req.params.number;
  facilities[number] = {
    id: number * 1 + 1,
    name: req.body.name,
    category: req.body.category,
    walk: req.body.walk,
    hours: req.body.hours
  };
  res.redirect("/facilities");
});

/* 削除処理 */
app.get("/facilities/delete/:number", (req, res) => {
  facilities.splice(req.params.number, 1);
  res.redirect("/facilities");
});

/* ==================================================
   山形の大学管理
================================================== */

let yamagataUniversities = [
  { id: 1, name: "山形大学", topping: "人文社会科学部 / 理学部 / 工学部 / 農学部 / 医学部", deviation: "45〜60", note: "国立" },
  { id: 2, name: "山形県立保健医療大学", topping: "看護 / 理学療法 / 作業療法", deviation: "45〜50", note: "公立" },
  { id: 3, name: "山形県立米沢栄養大学", topping: "健康栄養学科", deviation: "47〜54", note: "公立" },
  { id: 4, name: "東北芸術工科大学", topping: "美術 / デザイン / 建築", deviation: "45〜50", note: "私立" },
  { id: 5, name: "東北公益文科大学", topping: "公益学部", deviation: "35〜40", note: "私立" },
  { id: 6, name: "東北文教大学", topping: "人間科学部 / 教育学部", deviation: "35〜40", note: "私立" }
];

/* 一覧 */
app.get("/yamagata", (req, res) => {
  res.render("yamagata/yamagata", { data: yamagataUniversities });
});

/* 新規作成 */
app.get("/yamagata/create", (req, res) => {
  res.render("yamagata/yamagata_new");
});

/* 登録 */
app.post("/yamagata", (req, res) => {
  yamagataUniversities.push({
    id: yamagataUniversities.length + 1,
    name: req.body.name,
    topping: req.body.topping,
    deviation: req.body.deviation,
    note: req.body.note
  });
  res.redirect("/yamagata");
});

/* 詳細 */
app.get("/yamagata/:number", (req, res) => {
  const number = req.params.number;
  res.render("yamagata/yamagata_detail", {
    id: number,
    data: yamagataUniversities[number]
  });
});

/* 編集 */
app.get("/yamagata/edit/:number", (req, res) => {
  const number = req.params.number;
  res.render("yamagata/yamagata_edit", {
    id: number,
    data: yamagataUniversities[number]
  });
});

/* 更新 */
app.post("/yamagata/update/:number", (req, res) => {
  const number = req.params.number;
  yamagataUniversities[number] = {
    id: number * 1 + 1,
    name: req.body.name,
    topping: req.body.topping,
    deviation: req.body.deviation,
    note: req.body.note
  };
  res.redirect("/yamagata");
});

/* 削除 */
app.get("/yamagata/delete/:number", (req, res) => {
  yamagataUniversities.splice(req.params.number, 1);
  res.redirect("/yamagata");
});

/* ==================================================
   ラーメン屋チェーン管理
================================================== */

let ramen = [
  { id: 1, name: "日高屋", taste: "醤油・味噌・豚骨", feature: "低価格で手軽に利用できる中華チェーン", note: "駅前立地が多い" },
  { id: 2, name: "幸楽苑", taste: "醤油・味噌・塩", feature: "昔ながらのラーメンを提供", note: "ファミリー層向け" },
  { id: 3, name: "一風堂", taste: "豚骨・醤油・辛味", feature: "博多豚骨ラーメンが看板", note: "若者に人気" },
  { id: 4, name: "天下一品", taste: "こってり・あっさり", feature: "濃厚なスープが特徴", note: "好みが分かれる" },
  { id: 5, name: "山岡家", taste: "豚骨・味噌", feature: "濃い味とボリューム感", note: "深夜営業が多い" },
  { id: 6, name: "町田商店", taste: "家系豚骨醤油", feature: "ライスと相性の良い家系ラーメン", note: "学生に人気" }
];

/* 一覧 */
app.get("/ramen", (req, res) => {
  res.render("ramen/ramen", { data: ramen });
});

/* 新規作成 */
app.get("/ramen/create", (req, res) => {
  res.render("ramen/ramen_new");
});

/* 登録 */
app.post("/ramen", (req, res) => {
  ramen.push({
    id: ramen.length + 1,
    name: req.body.name,
    taste: req.body.taste,
    feature: req.body.feature,
    note: req.body.note
  });
  res.redirect("/ramen");
});

/* 詳細 */
app.get("/ramen/:number", (req, res) => {
  const number = req.params.number;
  res.render("ramen/ramen_detail", {
    id: number,
    data: ramen[number]
  });
});

/* 編集 */
app.get("/ramen/edit/:number", (req, res) => {
  const number = req.params.number;
  res.render("ramen/ramen_edit", {
    id: number,
    data: ramen[number]
  });
});


/* 更新 */
app.post("/ramen/update/:number", (req, res) => {
  const number = req.params.number;
  ramen[number] = {
    id: number * 1 + 1,
    name: req.body.name,
    taste: req.body.taste,
    feature: req.body.feature,
    note: req.body.note
  };
  res.redirect("/ramen");
});

/* 削除 */
app.get("/ramen/delete/:number", (req, res) => {
  ramen.splice(req.params.number, 1);
  res.redirect("/ramen");
});

/* ==================================================
   サーバ起動
================================================== */
app.listen(8080, () => {
  console.log("http://localhost:8080");
});
