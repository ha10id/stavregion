var Menu = require('./models/Menu.js');

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
    html += '<li> class="menu-open_li"';
    html += '<a href="' + item.url + '" class="menu-open_link">' + item.title + '</a></li>';
    return html;
};

exports.listMenu = ((req, res) => {
  getMenu().then(
    result => {
      var html = '';
      result.forEach((item, i) => {
        html += mapMenuItem(item);
      });
      console.log(html);
      res.send(html);
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

var data = {
  "posts": [
    {
      "title": "Велопробег по дорогам города Ставрополя",
      "image": "3-9.jpg",
      "text": "10 сентября в <b>преддверии</b> Дня города в рамках проекта 'Мы Первые!' состоялся грандиозный велопробег по дорогам города Ставрополя."+
              " В нем приняли участие не только руководители города, во главе с А.Х.Джатдоевым, " +
              "но и представители нашей школы- присоединившиеся и педагоги, учитель математики Горелик Н.В. и педагог-психолог " +
              "Головинова А.Л.Это было мега крутое велособытие нашего города. Идея объединила жителей города, любителей здорового "+
              "образа жизни. Работники местных предприятий, студенты, школьники, пенсионеры, представители волонтёрских и общественных "+
              "организаций – любовь к городу объединила всех: от мала до велика. 2Многие везли с собой флаги России и Ставропольского края, "+
              "города Ставрополя."+
              "На финише маршрута прошло чествование участников велопробега. Территория площади буквально пестрила яркими красками флагов и шаров."+
              " Добродушные лица, море улыбок и положительных эмоций – атмосфера праздника не покидала горожан ни на минуту."
    },
    {
      "title": "Волшебный мир изобразительного искусства",
      "image": "2-9.jpg",
      "text": "Летом ученики 3б класса не только развлекались, купались и загорали, но и приобретали новые умения. " +
              "Кто-то научился плавать или кататься на велосипеде, на скейтборде, на роликовых коньках. Несколько учеников " +
              "все лето совершенствовали знание английского языка. А Ульяна Булгакова открыла для себя волшебный мир " +
              "изобразительного искусства. Пейзажи Ули привлекают своим оптимизмом, яркими красками, искренними эмоциями. " +
              "Живо и солнечно пишет девочка простые незатейливые сюжеты природы. В одной из рекреаций начальной школы открылась " +
              "«персональная выставка» работ начинающей художницы."
    }
  ]
};
//========================================================
// GET
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
exports.post = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      post: data.posts[id]
    });
  } else {
    res.json(false);
  }
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