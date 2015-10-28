Parse.initialize("rRyoAqnvoPNgWA2454MHBvIwF7jqljqAKuwU5AIK", "09cduEWbTxa15HBVOclm8vf8dzRTHpOQaRGSqfwy");

function registerLink() {

  console.log("registerLink() called");
  //Extend the native Parse.Object class.
  //Instantiate an object of the ListItem class
  var Listings = Parse.Object.extend("Listings");
  var bookListings = new Listings();

  var check = document.getElementById('new-condition').checked;

  var condition = "new";
  if (check == 1) {
    condition = "New";
  }
  else {
    check = document.getElementById('like-new-condition').checked;
    if (check == 1) {
      condition = "Like New";
    }
    else {
      check = document.getElementById('decent-condition').checked;
      if (check == 1) {
        condition = "Decent";
      }
      else {
        check = document.getElementById('poor-condition').checked;
        if (check == 1) {
          condition = "Poor";
        }
        else {
          condition = "N/A";
        }
      }
    }
    console.log(condition);

  }

  bookListings.set("email", document.getElementById('email').value);
  bookListings.set("phone", document.getElementById('phone').value);
  bookListings.set("bookTitle", document.getElementById('book-title').value);
  bookListings.set("edition", document.getElementById('edition').value);
  bookListings.set("author", document.getElementById('author').value);
  bookListings.set("isbn", document.getElementById('isbn').value);
  bookListings.set("course", document.getElementById('course').value);
  bookListings.set("condition", condition);
  bookListings.set("sold", false);

  //Add Searchable Values
  bookListings.set("searchTitle", document.getElementById('book-title').value.toLowerCase());
  bookListings.set("searchAuthor", document.getElementById('author').value.toLowerCase());
  bookListings.set("searchCourse", document.getElementById('course').value.toLowerCase());

  // Price
  var price = parseFloat(document.getElementById('price').value);
  bookListings.set("price", price);


  //We call the save method, and pass in success and failure callback functions.
  console.log("about to call save");
  bookListings.save(null, {
    success: function(item) {
      //Success Callback
      console.log("saved");
      displaySuccess();
    },
    error: function(bookListings, error) {
      //Failure Callback
      console.log("Could not save. Error: " + error.code + " " + error.message);
      vex.defaultOptions.className = 'vex-theme-top';
      vex.dialog.alert({
        message: 'Could not save. <br /> Error ' + error.code + ': ' + error.message,
        className: 'vex-theme-top'
      });
    }
  });
}

function checkFields() {
  var emailField = document.getElementById('email').value;
  var bookTitleField = document.getElementById('book-title').value;
  var priceField = document.getElementById('price').value;
  if (emailField.length == 0 || bookTitleField.length == 0 || priceField.length == 0) {
    vex.defaultOptions.className = 'vex-theme-top';
    vex.dialog.alert({
      message: 'Please fill all required fields.',
      className: 'vex-theme-top'
    });
    return;
  }
  else {
    registerLink();
  }
}

function displaySuccess() {
  console.log("displaySuccess()");
  vex.defaultOptions.className = 'vex-theme-top';
  vex.dialog.alert({
    message: 'Successfully posted your textbook listing!',
    className: 'vex-theme-top'
  });
  clearFields();
}

function clearFields() {
  console.log("clearFields()");
  var inputElements = document.getElementById('sell-form').getElementsByTagName('input');
  for (var i=0; i<inputElements.length; i++) {
    inputElements[i].value = "";
  }

}
