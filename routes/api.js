var gm              = require('gm');
var fs              = require('fs');// var Menu = require('./models/Menu.js');
var News = require('./models/News.js');
var Region = require('./models/Region.js');
var Newstext = require('./models/Newstext.js');
var SimpleNews = require('./models/SimpleNews.js');

exports.listRegions = function (req, res) {
  'use strict';
  Region.find(function(err, regions) {
    if (err) {
      res.send(err);
    }
        res.json(regions); // return all documents in JSON format
      });
};

exports.listNews = function (req, res) {
  'use strict';
  News.find(function(err, news) {
    if (err) {
      res.send(err);
    }
    news = news.map(function(data) {
      return {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        exerpt: data.exerpt,
        slug: data.slug,
        created_by: data.created_by,
        creation_date: data.creation_date,
        publication_date: data.publication_date
      };
    });
      res.json(news); // return all documents in JSON format
    }).sort({publication_date: -1}).limit(8);
};
// ========================================================
// GET
exports.listSimpleNews = function (req, res) {
  'use strict';
  SimpleNews.find(function(err, news) {
    if (err) {
      res.send(err);
    }
    news = news.map(function(data) {
      return {
        id: data.id,
        title: data.title,
        img: data.ing,
        href: data.href,
        creation_date: data.creation_date,
        publication_date: data.publication_date
      };
    });
      res.json(news); // return all documents in JSON format
    }).sort({publication_date: -1}).limit(8);
};

exports.posts = function (req, res) {
  var posts = [];
  data.posts.forEach(function (post, i) {
    posts.push({
      id: i,
      title: post.title,
      image: post.image,
      text: post.text.substr(0, 600) + '...'
    });
  });
  res.json({
    posts: posts
  });
};

exports.news = function (req, res) {
  var id = req.params.id;
  console.log(id);
  News.findOne({id: id}, function(err, body) {
    if (err) {
      res.send(err);
    }
    console.log(body);
      res.json(body); // return all categorie
    });
};

exports.post = function (req, res) {
  var id = req.params.id;
  console.log(id);
  Newstext.findOne({cmsplugin_ptr_id: id}, function(err, body) {
    if (err) {
      res.send(err);
    }
    console.log(body);
      res.json(body); // return all categorie
    });
};
// POST
exports.addPost = function (req, res) {
  data.posts.push(req.body);
  res.json(req.body);
};
// PUT
exports.editPost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
exports.deletePost = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};
// загрузка картинок в массив и на сервер
exports.upload = function (req, res, next) {
  'use strict';
  console.log(req);
  console.log(req.files.image.path);
  console.log(req.files.image.name);
  var realFileName = req.files.image.path;
  // realFileName = realFileName.replace(/public\//g, '');
  console.log(realFileName)
  var fileName = req.files.image.name;
  console.log("-----------------------------------------");
  console.log("загузка изображения", "\n");
  // console.log(form);
  // var file = req.files.image.path;
  // console.log("имя файла: ", file.name); //original name (ie: sunset.png)
  // // console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
  // // console.log(file.type); //tmp path (ie: /tmp/12345-xyaz.png)
  // // console.log(req.body.document_id);
  // var tmp_path = file;
  // // формируем уникальное имя для файла
  // var fileName = ID();
  var target_path = 'public/uploads/tmp/' + fileName;
  fs.renameSync(realFileName, target_path, function(err) {
     if (err) {
       console.error(err.stack);
     }
   });
  // console.log( tmp_path, target_path );
  // уменьшим картинку
  gm(target_path)
  .resize(800, 600, "!")
  .noProfile()
  .write('public/uploads/' + fileName, function(err) {
    if (err) {
      console.error(err.stack);
    } else {
      fs.unlink(target_path, (err) => {
        if (err) throw err;
        console.log('файл удалён ', target_path);
      });
    }
  });

  console.log("имя файла на запись: ", fileName);
  // res.toString({fileName});
  res.send("<script>top.$('.mce-btn.mce-open').parent().find('.mce-textbox').val('../../uploads/" + fileName + "').closest('.mce-window').find('.mce-primary').click();</script>")
};