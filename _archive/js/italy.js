/* eslint-disable */
// https://github.com/remy/polyfills/blob/master/classList.js
(function () {

	if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

	// adds indexOf to Array prototype for IE support
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) { return i; }
			}
			return -1;
		}
	}

	var prototype = Array.prototype,
		indexOf = prototype.indexOf,
		slice = prototype.slice,
		push = prototype.push,
		splice = prototype.splice,
		join = prototype.join;

	function DOMTokenList(el) {
	  this._element = el;
	  if (el.className != this._classCache) {
		this._classCache = el.className;

		if (!this._classCache) return;

		  // The className needs to be trimmed and split on whitespace
		  // to retrieve a list of classes.
		  var classes = this._classCache.replace(/^\s+|\s+$/g,'').split(/\s+/),
			i;
		for (i = 0; i < classes.length; i++) {
		  push.call(this, classes[i]);
		}
	  }
	};

	function setToClassName(el, classes) {
	  el.className = classes.join(' ');
	}

	DOMTokenList.prototype = {
	  add: function(token) {
		if(this.contains(token)) return;
		push.call(this, token);
		setToClassName(this._element, slice.call(this, 0));
	  },
	  contains: function(token) {
		return indexOf.call(this, token) !== -1;
	  },
	  item: function(index) {
		return this[index] || null;
	  },
	  remove: function(token) {
		var i = indexOf.call(this, token);
		 if (i === -1) {
		   return;
		 }
		splice.call(this, i, 1);
		setToClassName(this._element, slice.call(this, 0));
	  },
	  toString: function() {
		return join.call(this, ' ');
	  },
	  toggle: function(token) {
		if (!this.contains(token)) {
		  this.add(token);
		} else {
		  this.remove(token);
		}

		return this.contains(token);
	  }
	};

	window.DOMTokenList = DOMTokenList;

	function defineElementGetter (obj, prop, getter) {
		if (Object.defineProperty) {
			Object.defineProperty(obj, prop,{
				get : getter
			})
		} else {
			obj.__defineGetter__(prop, getter);
		}
	}

	defineElementGetter(Element.prototype, 'classList', function () {
	  return new DOMTokenList(this);
	});

})();

/*
 * Visionary
 */
var Visionary = (function() {

	// Bind to scroll and resize events for dirty checking
	var instances = [];
	var dirtyTrue = function() {
		for (var i = 0, len = instances.length; i < len; i++) {
			instances[i]._dirty = true;
		}
	};

	// Bind to the window
	window.addEventListener('resize', dirtyTrue);
	window.addEventListener('scroll', dirtyTrue);

	var Visionary = function(buffer) {
		this.watcher = null;
		this.evaluating = false;
		this.collection = [];
		this.visible = [];
		this._dirty = true;
		this.buffer = buffer || 0;
	};

	// Starts the watcher
	Visionary.prototype.start = function() {
		var me = this;
		this.watcher = setInterval(function() {
			checkNodes(me);
		}, 150);
		instances.push(this);
		this._dirty = true;
	};

	// Stop watching
	Visionary.prototype.stop = function() {
		clearInterval(this.watcher);
		this.watcher = null;

		// Remove from instances list
		for (var i = 0, len = instances.length; i < len; i++) {
			if (instances[i] == this) {
				instances.splice(i, 1);
				break;
			}
		}
	};

	// Adds an element to the watch list
	Visionary.prototype.watch = function(node, enter, exit) {
		// Get the actualy element, not the jQuery one
		if (node[0] !== undefined) {
			node = node[0];
		}

		// Add to the queue
		this.collection.push({
			element: node,
			enter: enter,
			exit: exit,
			position: null
		});

	};

	// Removes an element that is being watched
	Visionary.prototype.unwatch = function(node) {
		for (var i = 0, len = this.collection.length; i < len; i++) {
			if (this.collection[i].element == node) {
				this.collection.splice(i, 1);
				break;
			}
		}
	};

	// Stops watching and removes all elements
	Visionary.prototype.clear = function() {
		// stop watching
		this.stop();

		// clear the list
		this.collection = [];
	};

	// Helper function to check all the nodes
	var checkNodes = function(instance) {
		if (instance._dirty && !instance.evaluating && instance.collection.length > 0) {
			instance.evaluating = true;

			// An array if items in view
			var visible = [];

			// Check each item
			for (var i = 0, len = instance.collection.length; i < len; i++) {
				var checking = instance.collection[i];
				checking.position = checking.element.getBoundingClientRect();

				// Intersect bounding rect's
				if (
					checking.position.top <= window.innerHeight + instance.buffer &&
					checking.position.bottom >= 0 - instance.buffer &&
					checking.position.left <= window.innerWidth + instance.buffer&&
					checking.position.right >= 0 - instance.buffer
				) {
					visible.push(instance.collection[i]);
				}
			}

			// Check for status changes
			var entering = visible.filter(function(i) {
				return (instance.visible.indexOf(i) === -1);
			});
			var exiting = instance.visible.filter(function(i) {
				return (visible.indexOf(i) === -1);
			});

			// Call callbacks
			for (var i = 0, len = entering.length; i < len; i++) {
				if (typeof entering[i].enter === 'function') {
					entering[i].enter(entering[i].element, entering[i].position);
				}
			}
			for (var i = 0, len = exiting.length; i < len; i++) {
				if (typeof exiting[i].exit === 'function') {
					exiting[i].exit(exiting[i].element, exiting[i].position);
				}
			}

			instance.visible = visible;
			instance._dirty = false;
			instance.evaluating = false;
		} else if (instance.collection.length === 0) {
			instance.stop();
		}
	};

	return Visionary;

})();

// Slide in Images
(function(Visionary) {

	// The watcher
	var watcher = new Visionary(-100);

	// Get the slide in images
	var slideInImages = document.querySelectorAll('.media.slide');

	// Watch all the elements
	for (var i = 0; i < slideInImages.length; i++) {
		(function(el) {
			watcher.watch(el, function() {
				watcher.unwatch(el);
				el.classList.add('show');
				if (watcher.collection.length === 0) {
					watcher.stop();
				}
			});
		})(slideInImages[i]);
	}

	// Start the watcher
	watcher.start();

	//
	// Watch the header to hide it
	// when at the bottom of the page
	//
	var banner = document.querySelectorAll('.banner')[0];
	var footer = document.querySelectorAll('.footer-banner')[0];
	var body = document.getElementsByTagName('body')[0];

	// Get scroll Top
	var getScrollTop = function() {
		if (typeof pageYOffset != 'undefined') {
			return pageYOffset;
		} else {
			return ((document.documentElement.clientHeight) ? document.documentElement : body).scrollTop;
		}
	};

	setInterval(function() {
		if (getScrollTop() > 1300) {
			banner.style.display = 'none';
			footer.style.display = 'block';
		} else {
			banner.style.display = 'block';
			footer.style.display = 'none';
		}
	}, 150);

})(Visionary);
