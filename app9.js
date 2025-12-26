"use strict";

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

/* ===== データ（DBの代わり） ===== */
let menu = [
  { id: 1, name: "牛丼", category: "beef", branch: "トッピング", note: "" },
  { id: 2, name: "豚丼", category: "bowl", branch: "種類", note: "吉野家の丼" },
  { id: 3, name: "から揚げ定食", category: "set", branch: "種類", note: "" }
];

/* ===== 一覧表示 ===== */
app.get("/menu", (req, res) => {
  res.render("menu/menu", { data: menu });
});

/* ===== 新規登録画面 ===== */
app.get("/menu/create", (req, res) => {
  res.redirect("/public/menu_new.html");
});

/* ===== 新規登録処理 ===== */
app.post("/menu", (req, res) => {
  const id = menu.length + 1;
  const name = req.body.name;
  const category = req.body.category;
  const branch = req.body.branch;
  const note = req.body.note;

  menu.push({
    id: id,
    name: name,
    category: category,
    branch: branch,
    note: note
  });

  res.redirect("/menu");
});

/* ===== 詳細表示 ===== */
app.get("/menu/:number", (req, res) => {
  const number = req.params.number;
  const detail = menu[number];
  res.render("menu/menu_detail", { id: number, data: detail });
});

/* ===== 編集画面 ===== */
app.get("/menu/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = menu[number];
  res.render("menu/menu_edit", { id: number, data: detail });
});

/* ===== 更新処理 ===== */
app.post("/menu/update/:number", (req, res) => {
  const number = req.params.number;
  menu[number].name = req.body.name;
  menu[number].category = req.body.category;
  menu[number].branch = req.body.branch;
  menu[number].note = req.body.note;

  res.redirect("/menu");
});

/* ===== 削除処理 ===== */
app.get("/menu/delete/:number", (req, res) => {
  menu.splice(req.params.number, 1);
  res.redirect("/menu");
});

/* ===== サーバ起動 ===== */
app.listen(8080, () => {
  console.log("http://localhost:8080/menu");
});
