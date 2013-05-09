----BEGIN META----
title: HTML5 Login
date: Sun, 15 May 2011 17:13:03 GMT
----END META----

<pre class="codepen" data-height="300" data-type="result" data-href="Foner" data-user="wesleytodd" data-safe="true"><code></code><a href="http://codepen.io/wesleytodd/pen/Foner">Check out this Pen!</a></pre>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

HTML5 brings a lot of great possibilities for simple and semantic solutions to problems that used to take hours of work to achieve. The challenge is to implement those new features while maintaining backward compatibility (graceful degradation). This article goes over a solution to the problem of placeholder text using modern markup yet which gracefully degrades with older browsers.

This came about while at work, our IT Director created a product called [AutoResponder Max](http://www.autorespondermax.com/) which integrates automatic emails into the Volusion e-commerce system. The [login screen](https://dashboard.autorespondermax.com/) for this is pretty straight forward. It has placeholder text in the fields to prompt the user for correct input. The problem is that the placeholder text is an image. The reasoning for that is that in IE you cannot dynamically change the input type. Why does that matter? Placeholder text in the password field would appear as: •••. Which doesn't really tell you much about what goes there. So there has got to be a better way, right?

## The HTML5 Solution

Get ready for the HTML5 part of this demo: the placeholder attribute. Its pretty simple really:

```html
<div id="login-holder">
    <input type="text" placeholder="Username" name="user" />
	<input type="password" placeholder="Password" name="pass" />
</div>
```

Semantic and simple right? So now the bad news: No support for IE, or less than FF3.7 or Android. The actual percentage of browser usage that doesn't support placeholder text is 69.21%. So we clearly need a fall back that will support all of those unfortunate people who don't know how to upgrade their browser (or can't).

## The Fallback

This is probably the most interesting part of this article, even if it is less semantic. I will use a couple of tools for this because it is what I am comfortable with:

- [jQuery](http://jquery.com/) - My preference of JavaScript libraries for its easy learning curve and features.
- [Modernizr](http://www.modernizr.com/) - A feature detection script that also fills in support for new HTML5 tags (header, section, etc...).

So be sure to include them:

```html
<script src="jquery.js"></script>
<script src="modernizr.js"></script>
```

The goal here is to have the placeholder text used whenever possible and then to fall back to the jQuery method when necessary. So to kick it off lets write a Modernizr conditional statement to see if we don't support the placeholder attribute:

```javascript
if (!Modernizr.input.placeholder){
	    //Our fallback function
}
```

Now that we know that this code will only execute if the browser does not support the placeholder attribute, we can start with the actual fallback code. We want to mimic the disappearing text but we can't use the value attribute on a password field to achieve the effect. First we will need a little extra markup to style it how we want:

```javascript
if (!Modernizr.input.placeholder){
    $(function(){
        $('#login-holder input')
            .wrap('<div class="input-wrap" />')
            .each(function(){
                $(this).before('<label for="'+$(this).attr('name')+'">'+$(this).attr('placeholder')+'</label>');
            });
    });
}
```

Now we have a nicely labeled input field wrapped in a holder div. This doesn't much look like our placeholder text yet, so let's use some CSS to push it into line and add some general styling.

```css
#login-holder {
    margin: 30px auto;
    width: 250px;
    padding: 15px;
    border: 1px solid #444;
}
#login-holder h1 {
    text-align: center;
    font: 22px/26px "Lucida Grande", Arial, Helvetica, sans-serif;
    margin: 0 0 15px;
}
#login-holder label,
#login-holder input {
    margin: 5px 0;
    font: 12px/16px Arial, Helvetica, sans-serif;
    color: #444;
}
#login-holder input {
    padding: 3px;
    width: 100%;
    background: none;
    display: block;
}
#login-holder label {
    padding: 4px 7px;
}
.input-wrap {
    position: relative;
}
.input-wrap label {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}
.input-wrap input {
    position: relative;
    z-index: 2;
}
```

The important part is the last three rules. Here we make the labels position absolute and z-index them under the inputs. Also notice that the inputs have "backgound: none;" so that the labels show through from underneath. I added in a few other things just to make it look a little more presentable.


And lastly, the jQuery that powers the disappearing placeholder text. We will need three listeners for this functionality:

- focus - to handle then the input receives focus
- blur - to handle when the input looses focus
- keyup - to figure out if the input has text in it

Here is the final Javascript:

```javascript
if (!Modernizr.input.placeholder){
    $(function(){
        $('#login-holder input')
            .wrap('<div class="input-wrap" />')
            .each(function(){
                $(this).before('<label for="'+$(this).attr('name')+'">'+$(this).attr('placeholder')+'</label>');
            })
            .focus(function(){
                $('label[for='+$(this).attr('name')+']').addClass('focus');
            })
            .blur(function(){
                $('label[for='+$(this).attr('name')+']').removeClass('focus');
            })
            .keyup(function(){
                if($(this).val() != ''){
                    $('label[for='+$(this).attr('name')+']').addClass('hide');
                }else {
                    $('label[for='+$(this).attr('name')+']').removeClass('hide');
                }
            });
    });
}
```

When the input gets focus we want to select the label for that input which we get by finding the 'name' attribute of the input and selecting a label with a matching 'for' attribute. All we do is add a class of 'focus' to that label which will have some css to change its look. When the input looses focus (blur) we want to be sure and remove that class from the label.

The final event listener is the 'keyup' event. It is important to use the 'keyup' event because this is triggered after any change to the input. So when the event is triggered we can check the value of the input and see if it has anything in it. If something is in the input field we will add a class of 'hide' to the label. If there is nothing in the input we will remove that 'hide' class.

