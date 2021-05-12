const { json } = require('express');
var express = require('express');
var router = express.Router();
const fs =require ('fs');
/* GET users listing. */

let booksData;

function readBooksData() {
  fs.readFile(`${__dirname}/db.json`, "utf8", function (err, data) {
    if (err) throw err;
    booksData = JSON.parse(data);
  });
}

readBooksData();

function save(data) {
  const json = JSON.stringify(data);
  fs.writeFile("./routes/db.json", json, function (err) {
    if (err) return console.log(err);
  });
}


router.get('/', function(req, res) {

  console.log({booksData})
  const {books} =booksData;

  res.send(books);
});

router.get('/:bookid', function(req, res) {

  const books = booksData.books.find( b=> b.id=== req.params.bookid );
  res.send(books);
});
router.get('/:title', function(req, res) {

  const books = booksData.books.filter( b=> b.title=== req.params.title);
  res.send(books);
});
router.post('/', function(req, res) {
let books =booksData.books;
  
books= {...books , ...req.body}
 
save(books)
  res.send(books);
});

router.patch('/:id' ,function (req ,res){
  const {bookid} =req.params.id;
let book =booksData.books.filter((b) => b.id=== bookid);
book = {...book, ...req.body};
const idx = booksData.books.findIndex((b) => b.id === bookid);

booksData.books(idx)=book;
save(booksData);

res.send(book)


})

router.delete('/:bookid', function(req, res){

  const {bookid} =req.params.bookid;
  let bookIndex = booksData.books.findIndex((b)=> b.id === bookid);

   booksData.books.splice(bookIndex, 1);

   res.send("deleted")

})




module.exports = router;
