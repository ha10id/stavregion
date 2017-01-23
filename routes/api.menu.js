fs = require('fs');
var Menu = require('./models/Menu.js');

exports.addMenu = function (req, res) {
  'use strict';
  // data.posts.push(req.body);
    // новый объект
    var newMenuItem = new Menu();
    // пробуем записать
    newMenuItem.save(function(err) {
      console.log(newMenuItem);
      var data = newMenuItem.toObject();
      data.id = data._id;
      if (err) {
        res.send(err);
      }
      res.json(data);
    });
};
exports.editMenu = function (req, res) {
    'use strict';
    var id = req.params.id;
    Menu.findOne({ _id : id }, function(err, menuitem) {
      if (err) {
        res.send(false);
    }
    console.log(menuitem);
    console.log(req.body);
    menuitem.title = req.body.title;
    menuitem.url = req.body.url;
    menuitem.save(function(err) {
      if (err) {
        res.send(false);
        }
        res.json(true);
    });
});
};

exports.menusList = function (req, res) {
	'use strict';
	Menu.find(function(err, response) {
		if (err) {
			res.send(err);
		}

    // response = response.map(function(data) {
    //   return {
    //     id: data.id,
    //     title: data.title,
    //     children: data.children
    //   };
    // });
    var html = '<div id="menu-open" tabindex="-1" role="dialog" aria-labelledby="menuLabel" aria-hidden="true" style="display: block !important; padding-right: 15px; height: 100%">'
    html +='<button type="button" data-dismiss="modal" aria-hidden="true" ng-click="modalOptions.close()" class="close">×</button>';
    html += "<ul class=\"menu-open\">"
    response.forEach(function(item, i, response) {
    	var child = item.children;
    	html += "<li class=\"menu-open_li menu-open_li_dropdown\"><a href=\"" + item.url + "\" class=\"menu-open_link\">" + item.title + "</a>";
    	if (child.length > 0) {

    		html += "<ul class=\"menu-open_dropdown_menu\">";

    		for( var index=0, len = child.length; index < len; ++index) {
    			html += "<li class=\"menu-open_li menu-open_li_dropdown\"><a href=\"" + child[index].url +"\" class=\"menu-open_link\">" + child[index].title + "</a>";
            // второй уровень
            var child2 = child[index].children;
            if (child2.length > 0) {
                html += "<ul class=\"menu-open_dropdown_menu\">";
                for( var index2=0, len2 = child2.length; index2 < len2; ++index2) {
                    html += "<li class=\"menu-open_li menu-open_li_dropdown\"><a href=\"" + child2[index2].url +"\" class=\"menu-open_link\">" + child2[index2].title + "</a></li>";
                    } //for
                    html += "</ul>"
                }
            } //for
            html += "</ul>"

        }
    });
    html += "</ul>"
    console.log(html);
    fs.writeFile('public/mainMenu.html', html, function (err) {
        if (err) return console.log(err);
    });
    res.json(response); // return all documents in JSON format
});
};