<div id="sub-header">
	<?php if( is_home() ){ echo '<h1 id="site-title">'; }else{ echo '<h2 id="site-title">';} 
	bloginfo('name'); 
	if(is_home()){ echo '</h1>'; }else{ echo '</h2>';} ?>
	<?php wt_tagline(); 
	wt_page_description();?>
</div>