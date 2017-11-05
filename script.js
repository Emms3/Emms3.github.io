// force loading jQuery :) to perfrom animations :)
// loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');

/*global variables to keep the original title for later use*/
var getTitle = document.getElementsByTagName('title')[0];
var accessTitle = getTitle.textContent;

function panda(location, method) {
  var location = location;
  var method = method;

  // validation
  var validLocationAndMethod = location_method_validation(location, method);
  if (!validLocationAndMethod) {
    // if not valid, return;
    // console.log(validLocationAndMethod);
    return;
  }

  var counter = arguments.length;
  var headings = {
    username: false,
    password: false,
    email: false,
    // age: false,
    gender: false
  };

  var numberOfObjects = Object.keys(headings).length;
  var totalCounter = counter - 2;

  var turnedObjects = 0;
  var turnedObjectsArray =[];
  var deletedObjectsArray =[];
  var argumentsRegEx = /^.*(username|password|email|gender|dateOfBirth).*$/;

  for (var i = 2; i < arguments.length; i++) {
    var argument = arguments[i].toLowerCase();
    // console.log(argument);
    if (argumentsRegEx.test(argument)) {
      headings[argument] = true;
      turnedObjects++;
      turnedObjectsArray.push(argument);
    } else {
      deletedObjectsArray.push(argument);
      delete headings[argument];
      // it should always be zero, otherwise it won't be displayed
      throw new Error(argument + " is not correct.");
    }
  }
  console.log('Reserved args: 2 args [location, method]');
  console.log('Number of passed args: ' + totalCounter);

  console.log('running: ');
  for (var i = 0; i < turnedObjectsArray.length; i++) {
    console.log(i+1 + ': ' + turnedObjectsArray[i]);
  }

  if (deletedObjectsArray.length === 0) {
    console.log('deleted: ' + deletedObjectsArray.length);
  }
  else {
    console.log('deleted: ');
  for (var i = 0; i < deletedObjectsArray.length; i++) {
    console.log(deletedObjectsArray[i]);
  }
}


  initPanda(location, method);

  for (var variable in headings) {
    if (headings[variable] === true) {
      if (variable == 'username') {
        createPanda("text", "fullname", "الإسم الثلاثي", "محمد");
      }
      if (variable === 'email') {
        createPanda("email", "email", "البريد الإلكتروني", "me@example.com")
      }
      if (variable === 'password') {
        createPanda("password", "password", "كلمة المرور", "٨ أحرف على الأقل")
      }
      if (variable === 'age') {
        // $('.theFormTable').append('<tr><th><p>' + 'العمر' + '</p></th><td><select name="yearOfBirth"><option value="123">اليوم</option></select><select name="yearOfBirth"><option value="123">الشهر</option></select><select name="yearOfBirth"><option value="123">السنة</option></select></td></tr>');
      }
      if (variable === "gender") {
        createPanda("radio", "gender", "الجنس");
      }
    }
  }
  closePanda();
}



/*
 functions
*/

function initPanda(location, method) {

  document.getElementsByTagName('title')[0].innerHTML = 'صفحة التسجيل';
  var location = location;
  var method = method;
  // creating the form
  var pandaForm = document.createElement("form");
  pandaForm.setAttribute("class", "overlay-lazyOwl");
  // pandaForm.setAttribute("class", "");
  pandaForm.setAttribute('action', location);
  pandaForm.setAttribute('method', method);
  document.body.appendChild(pandaForm);

  $('.overlay-lazyOwl').hide().fadeIn(1200);

  // creating the white area
  var whiteArea = document.createElement("div");
  whiteArea.setAttribute("class", "whiteArea-lazyOwl");
  pandaForm.appendChild(whiteArea);

  // creating the white area
  var closeDiv = document.createElement("div");
  closeDiv.setAttribute("class", "closeDiv-lazyOwl");
  whiteArea.appendChild(closeDiv);

  // creating the close button
  var closeButton = document.createElement("i");
  closeButton.setAttribute("class", "x-lazyOwl cursor fa fa-times fa-2x");
  closeButton.setAttribute("aria-hidden", "true");
  closeButton.setAttribute("onclick", "off()");
  // closeButton.style.textAlign = 'right';
  // closeButton.appendChild(document.createTextNode('m'));

  // <i class="fa fa-minus" aria-hidden="true"></i>
  whiteArea.appendChild(closeButton);

  // creating the table
  var table = document.createElement("table");
  table.setAttribute("class", "theFormTable-lazyOwl");
  whiteArea.appendChild(table);
  pandaForm.setAttribute("class", "overlay-lazyOwl lazyOwl-display");

}

function createPanda(type, name, head, placeholder) {
  var type = type;
  var find = document.getElementsByClassName('theFormTable-lazyOwl')[0];
  // console.log(find);

  // creating the row
  var tableRow = document.createElement("tr");
  find.appendChild(tableRow);
  // creating the header
  var tableHeader = document.createElement("th");
  // creating the headerText
  var head = head;
  var headerText = document.createTextNode(head);
  // appending text to header
  tableHeader.appendChild(headerText);
  // appending to table row
  tableRow.appendChild(tableHeader);
  // creating the table data
  var tableData = document.createElement("td");
  if (name == "age") {

  }
  if (name === "gender") {
    var gender = ["male", "female"];
    var arabizedGender = ["ذكر", "أنثى"];
    for (var i = 0; i <= gender.length - 1; i++) {
      // creating input field
      var inputData = document.createElement("input");
      // assigning attributes
      inputData.setAttribute("type", type);
      inputData.setAttribute("class", "input-lazyOwl");
      inputData.setAttribute("name", name);
      inputData.setAttribute("value", gender[i]);
      inputData.setAttribute("id", gender[i]);
      // appending to table data
      tableData.appendChild(inputData);

      // creating the label for each input field
      var label = document.createElement("label");
      label.setAttribute("for", gender[i]);
      // text of label
      var t = document.createTextNode('  ' + arabizedGender[i] + '  ');
      // appending text to label
      label.appendChild(t);
      // appending label to tableData
      tableData.appendChild(label);
    }
    // appending tableData to the row itself
    tableRow.appendChild(tableData);
  } else {
    // creating input field
    var inputData = document.createElement("input");
    // assigning attributes
    inputData.setAttribute("type", type);
    inputData.setAttribute("class", "input-lazyOwl");
    inputData.setAttribute("name", name);
    inputData.setAttribute("placeholder", placeholder);
    // appending to table data
    tableData.appendChild(inputData);
    // appending the whole package to table row
    tableRow.appendChild(tableData);
  }
}

function closePanda() {
  var divForRefSubButtons = document.createElement("div");
  divForRefSubButtons.setAttribute("class", "divForRefSubButtons-lazyOwl");
  document.getElementsByClassName('whiteArea-lazyOwl')[0].appendChild(divForRefSubButtons);

  // creating the refresh button
  var button1 = document.createElement("button");
  button1.setAttribute("onclick", "");
  button1.setAttribute("type", "reset");
  button1.setAttribute("class", "subRefButtons-lazyOwl");
  // creating text
  var textButton1 = document.createTextNode("مسح البيانات");
  button1.appendChild(textButton1);
  // appending it to the div
  document.getElementsByClassName('divForRefSubButtons-lazyOwl')[0].appendChild(button1);

  // creating the icon
  var refreshButton = document.createElement("i");
  refreshButton.setAttribute("class", "fa fa-refresh fa-2x");
  refreshButton.setAttribute("aria-hidden", "true");
  // var textOfSubmitButton = document.createTextNode("  ");
  // submitButton.appendChild(textOfSubmitButton);
  // document.getElementsByClassName('myDic')[0].style.display = 'flex';
  button1.appendChild(refreshButton);

  // creating the space in between
  var br = document.createElement("BR");
  document.getElementsByClassName('divForRefSubButtons-lazyOwl')[0].appendChild(br);

  // creating the refresh button
  var button2 = document.createElement("button");
  button2.setAttribute("onclick", "");
  button2.setAttribute("type", "submit");
  button2.setAttribute("class", "subRefButtons-lazyOwl");
  var textButton2 = document.createTextNode(" موافق");
  button2.appendChild(textButton2);
  // appending it to the div
  document.getElementsByClassName('divForRefSubButtons-lazyOwl')[0].appendChild(button2);

  // creating the submit button
  var submitButton = document.createElement("i");
  submitButton.setAttribute("class", "fa fa-paper-plane-o fa-2x");
  submitButton.setAttribute("aria-hidden", "true");
  button2.appendChild(submitButton);

  // console.log(holder);
}



function location_method_validation(location, method){
  var location = location.toLowerCase();
  var method = method.toLowerCase();
  // var methodRegEx = /^.*get|post|request.*$/;
  var methodRegEx =  /^post$|^get$|^request$/;
  var locationRegEx = /([https:\/\/]?)+([A-Za-z0-9])+\.+(com|ca|net|org|io|html|js|php|py)+/i;

  console.log(location);
  console.log(method);
  if (!locationRegEx.test(location)) {
    console.log('Error: ' + location + ' is not accepted as a location argument');
    // throw new Error("location Eroor");
    return false;
  }
  // console.log(location);
  if (!methodRegEx.test(method)){
    console.log('Error: ' + method + ' is not accepted as a method argument');
    // throw new Error("method Eroor");
    return false;
  }
  return true;
}

function off() {
  document.title = accessTitle;
  console.log('form has been deleted');
  var list = document.getElementsByClassName("overlay-lazyOwl");
  for(var i = list.length - 1; 0 <= i; i--)
  if(list[i] && list[i].parentElement)
  list[i].parentElement.removeChild(list[i]);

}

function loadScript(url)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    // script.onreadystatechange = callback;
    // script.onload = callback;

    // Fire the loading
    head.appendChild(script);
    console.log('added');
}
