# Quick Use Guide

You should include the files of Synk, create your generator-function yielding asynchronous processes that you want to be synchronized with the function, and create a new Synk instance to handle your function.

````
<script type="text/javascript" src="synk.js">
<script type="text/javascript" src="synk.snippets.js">

function* myExample(arg1, arg2)
{
  alert('Synk code started');
  yield new Snippet.Delay(2000);
  alert('Synk code finished');
}

new Synk(myExample, [1, 2]);

````

See the [documentation](https://ezaca.github.com/synk) for details or [get started](https://ezaca.github.io/synk/sample/index.html?p=getting-started).
