Title: Drag n' Drop In Raphael.js
Date: Thu Apr 18 2013 23:14:21 GMT-0500 (CDT)
---

<pre class="codepen" data-height="300" data-type="result" data-href="akrqJ" data-user="wesleytodd" data-safe="true"><code></code><a href="http://codepen.io/wesleytodd/pen/akrqJ">Check out this Pen!</a></pre>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

In this example, I am going to work through a simple method of implementing a drag and drop interaction for element sets in Raphael.js.  Raphael inclued a method for dragging a single element, but when you want to drag a set you are <abbr title="Shit Out Of Luck">sol</abbr>.  There are really no good examples if you google around.  So lets work through it.

We want to add a function that will be on every new set we create, that can be called to make the set draggable.  To make a function avaliable to all the sets we create, we need to add a function to the set prototype, but if you try and add it the 'normal' way, `Raphael.set.prototype`, you will see that it doesnt exist.  Actually, it is hidden inside the Raphael closure, so to access a set's prototype you need to add the method to `Raphael.st`:

```javascript
Raphael.st.draggable = function() {

};
```

Inside this function we are going to build logic for moving the set around the paper. To get started lets create a few variables we will need, and create the event handlers we will need:

```javascript
Raphael.st.draggable = function() {
	var me = this,
		lx = 0,
		ly = 0,
		ox = 0,
		oy = 0,
		moveFnc = function(dx, dy) {},
		startFnc = function() {},
		endFnc = function() {};

	this.drag(moveFnc, startFnc, endFnc);
};
```

We need a reference to the set, `me`, for use inside the drag functions.  This is needed because Raphael will only register the drag event on an individual element, but we need to make sure all elements move together.  We are also going to be using a few x and y values to keep track of where our elements are currently (`lx`, `ly`), and where they came from at the start of the drag (`ox`, `oy`).  Lastly, we have stubbed out the event handlers and bound them to the mouse events using Raphael's `drag` function.  Raphael will loop through all the elements in the set and attach the three event handlers.

Raphael registers a callback on mousedown (drag start), mouseup (drag end) and mousemove (drag move), each of which gets passed into the drag function respectively.  When an event is triggered on a single element, our `draggable` function still has a reference to the whole set, `me`, and so can transform all the elements together.  To get started with the event handlers, lets go over the drag start function.  This doesn't do much...er, anything:

```javascript
startFnc = function() {},
```

Because we have instantiated the starting transformation values to 0 we don't need to do anything on drag start.  Ok, *moving* on...the move function is the most important.  The move function gets passed the difference in x and y coordinates from the beginning of this drag (`dx`, `dy`).  These are added to the original values and then used to transform the elements.

```javascript
moveFnc = function(dx, dy) {
	lx = dx + ox;  // add the new change in x to the drag origin
	ly = dy + oy;  // do the same for y
	me.transform('t' + lx + ',' + ly);
}
```

Remember, we get passed in the change in x and y from the start position of this drag interaction.  We add the original x and y values, both zero on the first drag, to the new changes, then transform the set by the new values.  The transform is represented by the string `tx,y`, `t` meaning transform.  So we just build that string and pass it in to Raphael's `transform` method.  The `ly` and `lx` values are saved so that we can store the last value as the new original transform in the end function:

```javascript
endFnc = function() {
	ox = lx;
	oy = ly;
}
```

By saving the last transform values we ensure that the next drag preserves all previous changes.  Otherwise the set would transform right back to their original place when the new drag starts.  You can check that out if you want by editing the CodePen.

To put it all together we get:

```javascript
Raphael.st.draggable = function() {
  var me = this,
      lx = 0,
      ly = 0,
      ox = 0,
      oy = 0,
      moveFnc = function(dx, dy) {
          lx = dx + ox;
          ly = dy + oy;
          me.transform('t' + lx + ',' + ly);
      },
      startFnc = function() {},
      endFnc = function() {
          ox = lx;
          oy = ly;
      };
  
  this.drag(moveFnc, startFnc, endFnc);
};
```

Now all we have to do is setup a canvas and add a few elements to a set:

```javascript
var paper = Raphael(document.getElementById('canvas'));
var mySet = paper.set();

mySet.push(paper.circle(550, 150, 50).attr('fill', 'red'));
mySet.push(paper.circle(550, 150, 40).attr('fill', 'white'));
mySet.push(paper.circle(550, 150, 30).attr('fill', 'red'));
mySet.push(paper.circle(550, 150, 20).attr('fill', 'white'));
mySet.push(paper.circle(550, 150, 10).attr('fill', 'red'));

```

As you can see in the example at the top, the set is transformed along with your mouse as you drag it.  And even better, Raphael.js also enables touch events so that this interactions works on tablets and phones!  It even works in older IE's because of the built in VML conversion, how awesome is that?
