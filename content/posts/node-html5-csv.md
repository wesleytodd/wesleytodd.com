Title: Node + HTML5 CSV Viewer
Date: Sat Apr 27 2013 16:08:32 GMT-0500 (CDT)
---

I was viewing some Excel spreadsheets at work the other day that had loads of content in each cell, content so long it stretched off the screen on a 24" monitor.  I was getting super frustrated with the need to scroll back and forth so I could read these really longs lines, so what did I do?  Of course, as any good programmer would do, I wrote a program to help.  While I was at it, I figured it would be a good chance to experiment with some of the new browser API's I have not had a chance to use.  This article will go over what I came up with, creating a Node server and then using the File API and Drag and Drop API to ajax up the CSV's from the browser.  

<div class="media-left">![image](/media/posts/node-html5-csv/node-html5.gif)</div>

The plan is to use [Connect](http://www.senchalabs.org/connect/) to get our Node server up with minimal effort.  We are also going to use `browserver-router` for basic routing, er...one route for now.  Connect is a suite of middleware which has many of the basic needs for any webapp.  Also, it can consume `browserver-router`, making it a perfect fit for what we need.  Lastly, we need a CSV parser; I chose what looked like the most popular parser, which also has a nice event driven interface and seems well supported.

To follow along or see the full example, you can checkout my git repo with the complete code [here](https://github.com/wesleytodd/csv-view).

The first thing we want to do is get all the Node stuff working, so let's setup a basic project and install the dependencies:

```bash
$ npm init
... Answer the questions ...
$ npm install --save connect browserver-router csv
```

If you are not familiar with npm, notice that we added the `--save` directive to the command.  This adds a few lines to our `package.json` file so that the next time we setup the project, it will install the correct dependencies.  Now that we have those installed, we need to build our basic Node server.  We only need one file for this server, `index.js`, so create that and add the necessary require statements:

```javascript
var http = require('http'),
	fs = require('fs'),
	csv = require('csv'),
	connect = require('connect'),
	Router = require('browserver-router');

var app = connect();
```

To setup the Connect server we just run the `connect` function.  This will allow us to string together our middleware functions, most of which will come from Connect itself.  The features we are going to use from Connect are:

- **[favicon](http://www.senchalabs.org/connect/favicon.html):** Serves up a favicon.
- **[static](http://www.senchalabs.org/connect/static.html):** A static file server for our assets.
- **[directory](http://www.senchalabs.org/connect/directory.html):** Used to serve up the index file.  The static server on it's own won't do that.
- **[bodyParser](http://www.senchalabs.org/connect/bodyParser.html):** This does the real magic.  It parses the upload data, which will be used to get the uploaded CSV file.

To get those wired in we need the `use` function from our Connect app.  For the `static` and `directory` middelware we need to pass in the file path we want to serve up, `public`, the rest just need to be called without arguments.  Once we have all of the middelware, we need to start the Node server listening on a port.

```javascript
var app = connect()
	.use(connect.favicon())
	.use(connect.static('public'))
	.use(connect.directory('public'))
	.use(connect.bodyParser())
	.use(router);

http.createServer(app).listen(1234);
```

In our `public` directory we are going to create an html template to load, which will include our css and javascript.  I am not going to go over the html and css, but suffice it to say that it is there.  By placing our `static` and `directory` middleware before the router we ensure that those will take precedence over the `browserver-router` instance, which we have added to the end.  Get to the point already Wes, how does the router work, and how do we parse the CSV?  Well, here is the code dump:

```javascript
// Create the router [1]
var router = Router({
	// We have only one route to match, upload [2]
	'/upload' : function(req, res) {

		// Setup some vars
		var json = {},
			first = true;

		// Read the file from the upload [3]
		fs.readFile(req.files['csv'].path, function(err, content) {

			// Create the scv parser [4]
			csv()

				// Define the CSV source [5]
				.from('' + content)

				// Listen for a record event [6]
				.on('record', function(row, index) {

					// If it is the first row, assume it is the headers [7]
					if (first) {
						json.headers = row;
						json.data = [];
						first = false;
					} else {
						// [8]
						json.data.push(row);
					}

				// On end, return the data [9]
				}).on('end', function() {

					// Make sure the server send the right headers [10]
					res.writeHead(200, {'Content-Type': 'application/json'});
					// Send the json data [11]
					res.end(JSON.stringify(json));

				});

		});
	}
});
```

Clearly, this is where all the important stuff happens.  The first line `[1]` creates the router instance, to which we pass our route configuration.  The route is defined as a string, but can be defined in may different ways (see [the docs](https://github.com/jed/browserver-router)).  Reach route takes a callback function which is passed the request and response objects `[2]`.  The Connect middleware creates a property on the request object for the uploaded files.  The are saved to the tmp directory and the full path is defined in the `path` property, we can then use Node's `readFile` function to load up the file contents `[3]`.

Now that we have the contents of the file, we can create the CSV parser `[4]` and pass the content in `[5]`.  *Note the `'' + content` part, this converts the buffer into a string.  <del>I think there is a way to get the content as a stream and pass that straight to the parser, but I couldn't get that to work.*</del> **Update: Got that working, it was way easy.  Silly me.  [Check out the repo](https://github.com/wesleytodd/csv-view).**  The CSV parser emits two events we need to hook into, `record` and `end`.  For each record that is delivered we want to push the data into the output JSON `[8]`.  Usually we are going to have column headers, so for simplicity sake, we are going to assume that the first row is headers `[7]`, and send those back separately.

Once we have received all of the row data from the CSV `[9]`, we want to send back the JSON object we built.  To let the browser know we are returning JSON and that the request was a success, we use the `writeHead` function passing a `200` status with the JSON content type `[10]`.  Then we send all of the JSON data by using the `end` method, which also closes the connection `[11]`.  That is it on the Node end, so let's start the server:

```bash
$ node index.js
```

Open up Chrome, or whatever other inferior browser you use *wink wink*, and navigate to `http://localhost:1234`.  I didn't go over the HTML and CSS, but if you cloned the repository lineked to at the top, you should see the [index.html](https://github.com/wesleytodd/csv-view/blob/master/public/index.html) from inside your public directory.  Now, let's get onto doing the browser side stuff.  What we want is a drag n' drop interface for adding CSV files to the page, then a simple table display for the data.  Most of this front-end stuff comes from an MDN article, so if you want to read more, [check it out](https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications#Selecting_files_using_drag_and_drop).

<div class="media-full">![image](/media/posts/node-html5-csv/csv-view.png)</div>

Open up the `main.js` file in the public directory and we will start hooking into the events we need:

```javascript
// Attach listener for when a file is first dragged onto the screen [1]
document.addEventListener('dragenter', function(e) {
	e.stopPropagation();
	e.preventDefault();

	// Show an overlay so it is clear what the user needs to do [2]
	document.body.classList.add('show-overlay');
}, false);

// Attach a listener for while the file is over the browser window [3]
document.addEventListener('dragover', function(e) {
	e.stopPropagation();
	e.preventDefault();
}, false);

// Attach a listener for when the file is actually dropped [4]
document.addEventListener('drop', function(e) {
	e.stopPropagation();
	e.preventDefault();

	// Hides the overlay [5]
	document.body.classList.remove('show-overlay');
	
	// Process the files [6]
	handelFiles(e.dataTransfer.files);
	
}, false);
```

<div class="media-right">![image](/media/posts/node-html5-csv/csv-drop-anywhere.jpg)</div>

We need to use the `dragenter` `[1]`, `dragover` `[3]` and `drop` `[4]` events, then we want to override the default functionality with `preventDefault` and `stopPropagation`. Now, to create our custom functionality.  First, we want to give the user some feedback that they can drop files anywhere on the screen, so we add a class to the body which displays an overlay message `[2]`.  This message gets hidden when the user drops the files, as shown inside the `drop` method `[5]`.  Once the files are dropped on the browser window, we call the `handelFiles` function and pass it the files array `[6]`.  Here is that method:

```javascript
// This function gets the file data and uploads it to the server
function handelFiles(files) {

	// Loop all the dropped files [1]
	for (var i = 0, l = files.length; i < l; i++) {

		// Check that the files is a CSV [2]
		if (files[i].type == 'text/csv') {

			// Wrap it in a closure so that we maintain correct references to our xhr request [3]
			(function(file) {

				// Setup an xhr and a FormData object [4]
				var xhr = new XMLHttpRequest(),
					fd = new FormData();

				// Listen for the xhr to complete
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						// Parse the response and build the table [5]
						buildTable(file, JSON.parse(xhr.responseText));
					}
				};

				// Attach our file to the FormData object [6]
				fd.append('csv', file);
				
				// Open the connection to the server
				xhr.open("POST", "/upload", true);

				// Send our FormData [7]
				xhr.send(fd);

			})(files[i]);

		} else {
			alert('Don\'t give me that dirty file.  It\'s not a CSV!!');
		}

	}

}
```

This method loops through the files `[1]` checking to make sure they are CSV files `[2]`, then ajax's them to the server.  Notice that we wrap most of the code in a closure `[3]`, this is because the loop will override the `xhr` variable when more than one file is passed in.  Inside the closure we create an ajax request and a `FormData` object `[4]`, which we will use to send the file to the server. The `FormData` API is pretty new and only works in modern browsers (not even IE9).  What do we care about browser support anyways?

We append the file to the `FormData` object `[6]` and send it over the ajax request `[7]`.  When we get a response back we build out our display table `[5]`.  I am not going to go over the code to create the table, mainly because it is a mess, but if you want to check it out it is in [the repository](https://github.com/wesleytodd/csv-view/blob/master/public/main.js#L71).  Now that everything is in place, you should be able to drag your CSV files over the browser and get a nicely formatted table for you to peruse your data.

Hopefully this shows how to get a basic app off the ground with Node, thus showing how important of a tool it is.  It enables us to write simple applications that solve our problems without needing a complicated or monolithic back-end stack.  This is also one of the reasons Node is an important emerging tools in our toolbox as Front-End developers.  It is also one of the reasons I am so excited to see tools like Grunt and Yeoman take off.  The more we Front-End Dev's learn and utilize tools like this, the more we can focus on creating amazing experiences for our users.
