(function (global) {
  var dc = {};
  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
 // Function to insert HTML into the DOM
  var insertHtml = function (selector, html) {
    document.querySelector(selector).innerHTML = html;
  };

  // Function to show the loading spinner
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Function to load random category menu items
  dc.loadRandomCategory = function () {
    showLoading("#main-content");

    // Fetch categories from the server
    $ajaxUtils.sendGetRequest(allCategoriesUrl, function (categories) {
      // Select a random category
      var randomIndex = Math.floor(Math.random() * categories.length);
      var randomCategoryShortName = categories[randomIndex].short_name;

      // Navigate to the menu page for the selected category
      $dc.loadMenuItems(randomCategoryShortName);
    });
  };

  // Function to load menu items for a specific category
  dc.loadMenuItems = function (categoryShortName) {
    var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName;

    // Fetch menu items and render them on the page
    $ajaxUtils.sendGetRequest(menuItemsUrl, function (menuItems) {
      var menuHtml = "<h2>Category: " + menuItems.category.name + "</h2>";
      menuHtml += "<ul>";
      menuItems.menu_items.forEach(function (item) {
        menuHtml += "<li>" + item.name + " - " + item.description + "</li>";
      });
      menuHtml += "</ul>";
      insertHtml("#main-content", menuHtml);
    });
  };

  // Expose the `dc` object to the global scope
  global.$dc = dc;
})(window);
