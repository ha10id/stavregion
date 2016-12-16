var Menu = require('./models/Menu.js');
var News = require('./models/News.js');
var Region = require('./models/Region.js');
var Newstext = require('./models/Newstext.js');

exports.addMenu = function (req, res) {
  var MenuItem = new Menu(req.body);
  console.log(req.body);
  MenuItem.save((err) => {
    console.log(MenuItem);
    if(err) {
      console.log(err);
      res(err);
    }
    res.json(MenuItem);
  });
};

exports.addMenuChildren = ((req, res) => {
  var id = req.params.id;
  console.log('id +++ ', id);
  console.log('body +++ ', req.body);
  var MenuItem = new Menu(req.body);
  console.log('item +++ ', MenuItem);
  Menu.findOne({ _id : id }, (err, parentMenuItem) => {
    if(err) {
      res.send(err)
    }
    parentMenuItem.toObject();
    parentMenuItem.children.push(MenuItem);
    parentMenuItem.save((error) => {
      if(error) {
        console.log(error);
        res.send(error)
      }
      res.json(parentMenuItem);
    });
  });
});

function getMenu(url) {
  return new Promise((resolve, reject) => {
    Menu.find((error, MenuItems) => {
      if (error) {
        reject(error);
      }
      resolve(MenuItems);
    });
  });
};

function mapMenuItem(item) {
  // return new Promise((resolve, reject) => {
    var html = '';
    if (item.children.length > 0) {
      html += '<li class="menu-open_li menu-open_li_dropdown">';
      html += '<a href="' + item.url + '" class="menu-open_dropdown_menu_link">' + item.title + '</a>';
      html += '<ul class="menu-open_dropdown_menu">';
    } else {

      html += '<li class="menu-open_li"><a href="' + item.url + '" class="menu-open_link">' + item.title + '</a></li>';
    }
    return html;
  };

  function mapToMenu(items) {
    var html = '';
    items.forEach((its, i) => {

    // console.log(its.title);
    if( its.children.length === 0 ) {
      html += '<li class="menu-open_li"><a href="'+ its.url +'" class="menu-open_link">'+ its.title +'</a></li>';
    } else {
      html += '<li class="menu-open_li menu-open_li_dropdown">';
      html += '<a href="'+ its.url +'" class="menu-open_dropdown_menu_link">'+ its.title +'</a>'
      html += '<ul class="menu-open_dropdown_menu">'
      mapToMenu(its.children);
      html += '</ul>';
      html += '</li>';
    }
  });
    console.log(html);
  };

  exports.listRegions = function (req, res) {
    'use strict';
    Region.find(function(err, regions) {
      if (err) {
        res.send(err);
      }
        res.json(regions); // return all documents in JSON format
      });
  };

  exports.listMenu = ((req, res) => {
    getMenu().then(
      result => {
        var html = '';
        mapToMenu(result);
    //   result.forEach((item, i) => {

    //   if(item.children.length > 0) {
    //     console.log(' - ', item.children)
    //   } else {
    //     console.log(item);
    //   }
    //   // html += mapMenuItem(item);
    // });
    // console.log(html);
    res.send(result);
  },
  error => {
    res.send(error)
  }
  );
  });

// exports.listMenu = ((req, res) => {
//   var html = '<ul> class="menu-open" ';
//   Menu.find((error, MenuItems) => {
//     MenuItems.forEach((item, i, array) =>{
//       html += '<li> class="menu-open_li';
//       console.log(i);
//       if(item.children.length > 0) {
//         html += ' menu-open_li_dropdown" ';
//         html += '<a> href="' + item.title + '" class="menu-open_link">' + item.title + '</a>';
//           // ul.menu-open_dropdown_menu
//         // item.children.forEach((it, i, array) => {
//         //   console.log(it);
//         //   html += ' menu-open_li_dropdown" ' + item.children[0].title;
//         // })
//         // console.log(item, 'children yes');
//       } else {
//         html += '" <a> href="' + item.url + '", class="menu-open_link"' + item.title + '</a></li>';
//       };
//       console.log(html);
//     });
//     html += '</ul>';
//     // console.log(MenuItems);
//   });
//   res.json('success');
// });

//========================================================
// GET
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
        slug: data.slug,
        excerpt: data.excerpt,
        thumbnail: data.thumbnail,
        creation_date: data.creation_date,
        publication_date: data.publication_date,
        content_id: data.content_id
      };
    });
      res.json(news); // return all documents in JSON format
    }).sort({creation_date: -1}).limit(8);
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
// GET ONE
// exports.post = function (req, res) {
//   var id = req.params.id;
//   Newstext.find({cmsplugin_ptr_id: id}, (err, news) {
//     res.json(news);
//   })
// };
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