<?php 
header("Content-type: text/css");
$base_url = "http://dev.wesleytodd.com/wp-content/themes/template/";
$css_dir = $base_url."inc/css/";

$out = file_get_contents($base_url."style.css");
$out .= file_get_contents($css_dir."reset.css");


if($_GET['single']){
	if($content = file_get_contents($css_dir."single.css"))
		$out .= $content;
	if($content = file_get_contents($css_dir."post-".$_GET['postname'].".css"))
		$out .= $content;
	if($content = file_get_contents($css_dir."post-".$_GET['pid'].".css"))
		$out .= $content;
}
if($_GET['page']){
	if($content = file_get_contents($css_dir."page.css"))
		$out .= $content;
	if($content = file_get_contents($css_dir."page-".$_GET['postname'].".css"))
		$out .= $content;
	if($content = file_get_contents($css_dir."page-".$_GET['pid'].".css"))
		$out .= $content;
}
if($_GET['archive']){
	if($content = file_get_contents($css_dir."archive.css"))
		$out .= $content;
}
if($_GET['month']){
	if($content = file_get_contents($css_dir."month.css"))
		$out .= $content;
}
if($_GET['time']){
	if($content = file_get_contents($css_dir."time.css"))
		$out .= $content;
}
if($_GET['author']){
	if($content = file_get_contents($css_dir."author.css"))
		$out .= $content;
}
if($_GET['category']){
	if($content = file_get_contents($css_dir."category.css"))
		$out .= $content;
}
if($_GET['tag']){
	if($content = file_get_contents($css_dir."tag.css"))
		$out .= $content;
}
if($_GET['tax']){
	if($content = file_get_contents($css_dir."tax.css"))
		$out .= $content;
}
if($_GET['search']){
	if($content = file_get_contents($css_dir."search.css"))
		$out .= $content;
}
if($_GET['home']){
	if($content = file_get_contents($css_dir."home.css"))
		$out .= $content;
}
if($_GET['404']){
	if($content = file_get_contents($css_dir."404.css"))
		$out .= $content;
}
echo "/*";
var_dump($_GET);
echo "*/";
echo $out;
?>