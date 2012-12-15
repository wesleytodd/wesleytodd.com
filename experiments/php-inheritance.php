<?php 
class a {

	public $var1;
	public $var2;
	
	function __construct(){
		$this->var1 = "Hello";
		$this->var2 = "World";
	}
	
	function printVars(){
		echo $this->var1." ".$this->var2.".<br />";
	}
	
}

class b extends a {
	
	function __construct(){
		parent::__construct();
	}
	
	function printVars(){
		echo $this->var1.' '.$this->var2."!<br />";
	}
	
}

class c extends a {
	
	function __construct(){
		//No Parent constructor
	}
	
}

class d extends a {
	//Not even overriding the constructor makes the exactly the same as a
}

$a = new a;
$b = new b;
$c = new c;
$d = new d;
$b->var2 = "People";

?>
<!DOCTYPE html>
<html>
<head>
<title>PHP Class Inheritance | Wesley Todd</title>
</head>
<body>
<div style="background: #444; color:#fff; padding: 15px;margin-bottom: 15px;">
<h3 style="margin-top:0;" >Output:</h3>
<?php 
$a->printVars();
$b->printVars();
$c->printVars();
$d->printVars();
?>
</div>
<div>
<pre><code>&lt;?php 
class a {

	public $var1;
	public $var2;
	
	function __construct(){
		$this->var1 = "Hello";
		$this->var2 = "World";
	}
	
	function printVars(){
		echo $this->var1." ".$this->var2.".&lt;br />";
	}
	
}

class b extends a {
	
	function __construct(){
		parent::__construct();
	}
	
	function printVars(){
		echo $this->var1.' '.$this->var2."!&lt;br />";
	}
	
}
class c extends a {
	
	function __construct(){
		//No Parent constructor
	}
	
}

class d extends a {
	//Not even overriding the constructor makes the exactly the same as a
}

$a = new a;
$b = new b;
$b->var2 = "People";
$a->printVars();
$b->printVars();
$c->printVars();
$d->printVars();

?></code></pre>

</div>

</body>
</html>