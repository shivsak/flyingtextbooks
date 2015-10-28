Parse.initialize("rRyoAqnvoPNgWA2454MHBvIwF7jqljqAKuwU5AIK", "09cduEWbTxa15HBVOclm8vf8dzRTHpOQaRGSqfwy");

var searchResults;

function displayAllListings() {

  console.log("displayAllListings() called");
  var Listings = Parse.Object.extend("Listings");
  var query = new Parse.Query(Listings);
  var results;
  query.notEqualTo("sold", true);
  query.find({
    success:function success(results) {
      displayResults(results);
    },
    error:function error(error) {
      alert("Error when getting objects!");
    }
  });

}

function displayResults(results) {
  for (var i=results.length-1; i>=0; i--) {
    console.log(results[i].get('email'));

    var authorData = results[i].get('author');
    if (authorData == 0) {
      authorData = "Unlisted";
    }

    var createdAtData = results[i].get('createdAt');
    var formattedDate;
    if (createdAtData == 0) {
      formattedDate = "N/A";
    }
    else {
      formattedDate = (String(createdAtData)).substring(4, 15);
    }


    var condition = results[i].get('condition');

    var titleData = results[i].get('bookTitle');
    if (titleData == 0) {
      titleData = "N/A";
    }

    var email = results[i].get('email');
    if (email == 0) {
      email = "Unlisted";
    }

    var phone = results[i].get('phone');
    if (phone == 0) {
      phone = "Unlisted";
    }

    var price = results[i].get('price');
    if (price == 0 || String(price) == "undefined") {
      price = "Unknown";
    }
    else {
      price = "$" + price;
    }

    var objId = results[i].id;
    console.log("Object ID is " + objId);

    var repeatingDiv = document.createElement("div");
    repeatingDiv.setAttribute("style", "");
    repeatingDiv.setAttribute("class", "repeatingDiv");

    /**** Add Dropdown *****/
    // <div class="dropdown">
    var dropdown = document.createElement("div");
    dropdown.setAttribute("class", "dropdown");

    // <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    var dropButton = document.createElement("button");
    dropButton.setAttribute("class", "btn btn-default dropdown-toggle");
    dropButton.setAttribute("type", "button");
    dropButton.setAttribute("data-toggle", "dropdown");
    var dropButtonText = document.createTextNode("•••");
    // dropButton.appendChild(dropButtonText);
    // <span class="caret"></span>
    var caret = document.createElement("span");
    caret.setAttribute("class", "caret");
    dropButton.appendChild(caret);

    // <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
    var dropdownMenu = document.createElement("ul");
    dropdownMenu.setAttribute("class", "dropdown-menu");

    var dropdownItem1 = document.createElement("li");

    var dropdownItem1Link = document.createElement("a");
    dropdownItem1Link.setAttribute("href", "#");
    dropdownItem1Link.setAttribute("onclick", "reportSold(\"" + String(objId) + "\")");
    var dropdownItem1LinkText = document.createTextNode("Mark as Sold");
    dropdownItem1Link.appendChild(dropdownItem1LinkText);

    dropdownItem1.appendChild(dropdownItem1Link);
    dropdownMenu.appendChild(dropdownItem1);
    dropdown.appendChild(dropButton);
    dropdown.appendChild(dropdownMenu);
    repeatingDiv.appendChild(dropdown);



    var inlineDivHead = document.createElement("div");
    inlineDivHead.setAttribute("style", "");
    inlineDivHead.setAttribute("class", "inlineDivHead");

    var bookTitle = document.createElement("h3");
    var titleNode = document.createTextNode(titleData);
    bookTitle.setAttribute("class", "bookTitle");
    bookTitle.appendChild(titleNode);

    var bookCondition = document.createElement("p");
    bookCondition.setAttribute("class", "condition");
    var conditionNode = document.createTextNode(condition);
    bookCondition.appendChild(conditionNode);

    var inlineDivSub = document.createElement("div");
    inlineDivSub.setAttribute("class", "inlineDivSub");

    var author = document.createElement("p");
    author.setAttribute("class", "author");
    var authorNode = document.createTextNode(authorData);
    author.appendChild(authorNode);

    var createdDate = document.createElement("p");
    createdDate.setAttribute("class", "createdDate");
    var dateNode = document.createTextNode(formattedDate);
    createdDate.appendChild(dateNode);

    var emptySpace = document.createElement("p");
    var spaceNode = document.createTextNode("\n \n \n \n \n");
    emptySpace.appendChild(spaceNode);

    var bookPrice = document.createElement("a");
    bookPrice.setAttribute("class", "price");
    bookPrice.setAttribute("href", "#");

    var showFn = "showContactInfo(\"" + email + "\", \"" + phone + "\")";
    console.log(showFn);
    bookPrice.setAttribute("onclick", showFn);
    var priceNode = document.createTextNode(price);
    bookPrice.appendChild(priceNode);

    bookPrice.appendChild(priceNode);

    var bookISBN = document.createElement("p");

    inlineDivHead.appendChild(bookTitle);
    inlineDivHead.appendChild(bookCondition);
    if (String(condition) == "undefined") {
      bookCondition.style.opacity = 0.0;
    }

    inlineDivSub.appendChild(author);
    inlineDivSub.appendChild(createdDate);

    repeatingDiv.appendChild(inlineDivHead);
    repeatingDiv.appendChild(inlineDivSub);

    repeatingDiv.appendChild(emptySpace);

    repeatingDiv.appendChild(bookPrice);

    console.log(bookTitle.innerHTML);

    var cover = document.getElementById('main');
    var success = document.getElementById('success');
    cover.appendChild(repeatingDiv);

  }
}

function searchListings() {

  console.log("search() called");

  //Clear Currently Displayed Listings
  clearDisplayedListings();

  var searchTerm = document.getElementById("search-field").value.toLowerCase();
  var Listings = Parse.Object.extend("Listings");

  var queryA = new Parse.Query(Listings);
  var queryB = new Parse.Query(Listings);
  var queryC = new Parse.Query(Listings);
  var queryD = new Parse.Query(Listings);

  // searchTerm = ".*" + searchTerm + ".*";
  queryA.matches("searchTitle", searchTerm);
  queryB.matches("searchAuthor", searchTerm);
  queryC.matches("isbn", searchTerm);
  queryD.matches("searchCourse", searchTerm);

  var query = Parse.Query.or(queryA, queryB, queryC, queryD);
  query.notEqualTo("sold", true);

  console.log("Search for: " + searchTerm);
  query.find({
    success:function success(results) {
      console.log(results.length);
      if (results.length == 0) {
        console.log("results length is 0");
        vex.defaultOptions.className = 'vex-theme-top';
        vex.dialog.alert({
          message: "No results found for your search. Please try again. <br /> Using fewer or less precise search terms can help you find more results.",
          className: 'vex-theme-top'
        });
      }
      displayResults(results);
    },
    error:function error(error) {
      console.log(error.id + ": " + error.message);
    }
  });

}

function clearDisplayedListings() {
  var repeatingDivs = document.getElementsByClassName('repeatingDiv');
  while (repeatingDivs.length != 0) {
    console.log("removing node");
    repeatingDivs[0].parentNode.removeChild(repeatingDivs[0]);
    repeatingDivs = document.getElementsByClassName('repeatingDiv');
  }
}

function showContactInfo(email, phone) {
  console.log("Show Contact Info running");
  // var contactDiv = document.createElement("div");
  // contactDiv.setAttribute("id", "contactDiv");
  //
  // var closeButton = document.createElement("button");
  // closeButton.setAttribute("id", "close-button");
  // closeButton.setAttribute("onclick", "hideContactInfo()");
  // var closeButtonNode = document.createTextNode("X");
  // closeButton.appendChild(closeButtonNode);
  //
  // // Contact Links
  // var emailLink = document.createElement("a");
  // emailLink.setAttribute("class", "contact-links");
  // emailLink.setAttribute("href", "mailto:" + email);
  // var emailLinkNode = document.createTextNode("Email: " + email);
  // emailLink.appendChild(emailLinkNode);
  //
  // var newLine = document.createElement("br");
  //
  // var phoneLink = document.createElement("a");
  // phoneLink.setAttribute("class", "contact-links");
  // var phoneLinkNode = document.createTextNode("Phone: " + phone);
  // phoneLink.appendChild(phoneLinkNode);
  //
  // contactDiv.appendChild(closeButton);
  // contactDiv.appendChild(emailLink);
  // contactDiv.appendChild(newLine);
  // contactDiv.appendChild(phoneLink);
  //
  // var cover = document.getElementById('cover');
  // var waste = document.getElementById('waste');
  // cover.insertBefore(contactDiv, waste);

  var contactText = "<h2>Contact</h2><br />" + "Email: <a href=\"mailto:" + email + "\" class=\"contact-links\">" + email + "</a><br />" + "Phone: " + phone;

  vex.defaultOptions.className = 'vex-theme-default';
  vex.dialog.alert({
    message: contactText,
    className: 'vex-theme-default'
  });

}

function hideContactInfo() {
  console.log("Hiding Contact Info");
  var contactDiv = document.getElementById("contactDiv");
  contactDiv.parentNode.removeChild(contactDiv);
}

function reportSold(objectID) {
  vex.dialog.open({
    message: 'Are you sure this item has been sold?',
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, {
        text: 'Yes'
      }), $.extend({}, vex.dialog.buttons.NO, {
        text: 'No'
      })
    ],
    callback: function(data) {
      if (data == false) {
        return console.log('Cancelled')
      }
      else {
        markAsSold(objectID);
      }
    }
  });
}

function markAsSold(objectID) {
  console.log("Reporting objectID " + objectID + " as sold");
  // Create a pointer to an object of class Point with id dlkj83d
  var Point = Parse.Object.extend("Listings");
  var point = new Point();
  point.id = objectID;

  // Set a new value on quantity
  point.set("sold", true);

  // Save
  point.save(null, {
    success: function(point) {
      // Saved successfully.
      console.log("Updated");
      vex.defaultOptions.className = 'vex-theme-top';
      vex.dialog.alert({
        message: "Marked this listing as sold.",
        className: 'vex-theme-top'
      });
    },
    error: function(point, error) {
      // The save failed.
      console.log(point + " failed to update with Error " + error.code + ": " + error.message);
    }
  });
}
