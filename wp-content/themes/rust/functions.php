<?php

add_action('wp_print_styles', 'theme_stylesheet');
function theme_stylesheet() {
	
	wp_register_style('theme-stylesheet', get_bloginfo('stylesheet_url') );
	wp_enqueue_style('theme-stylesheet');
}

add_action('wp_enqueue_scripts', 'wt_enqueue_scripts');
function wt_enqueue_scripts(){
	//wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js', null, '1.6', true);
	wp_enqueue_script( 'jquery' );
	
	wp_deregister_script( 'modernizr' );
	wp_register_script( 'modernizr', get_bloginfo('template_url').'/inc/js/modernizr-2.0.6-custom.min.js', null, '2.0.6', false);
	wp_enqueue_script( 'modernizr' );
	
	wp_deregister_script( 'wt_global' );
	wp_register_script( 'wt_global', get_bloginfo('template_url').'/inc/js/global.min.js', array('jquery'), '1.0', true);
	wp_enqueue_script( 'wt_global' );
	
	if(is_page('websites')){
		wp_deregister_script( 'wt_websites' );
		wp_register_script( 'wt_websites', get_bloginfo('template_url').'/inc/js/websites.min.js', array('jquery'), '1.0', true);
		wp_enqueue_script( 'wt_websites' );
	}
	
	if(is_page('contact')){
		wp_enqueue_script( 'contact-form-7', wpcf7_plugin_url( 'scripts.js' ), array( 'jquery', 'jquery-form' ), WPCF7_VERSION, true );
		
		wp_deregister_script( 'jquery-form' );
		wp_register_script( 'jquery-form', wpcf7_plugin_url( 'jquery.form.js' ), array( 'jquery' ), '2.52', true );
		
		do_action( 'wpcf7_enqueue_scripts' );
	}
	
}

function wt_tagline(){
	
	$codepages = array(
		'plugins',
		'web-development',
		'websites'
	);
	$claypages = array(
		'ceramics'
	);
	$pixelpages = array(
		'websites'
	);
	$pagetype = array();
	global $post;
	if(is_page()){
		if(in_array($post->post_name, $codepages))
			array_push($pagetype, 'code');
		if(in_array($post->post_name, $claypages))
			array_push($pagetype, 'clay');
		if(in_array($post->post_name, $pixelpages))
			array_push($pagetype, 'pixels');
	}
	if(is_single()){
		$cats = get_the_category();
		$slug = 'other';
		if($cats != null)
			$slug = $cats[0]->slug;
		if(in_array($slug, $codepages) || $post->post_type == 'custom-plugin')
			array_push($pagetype, 'code');
		if(in_array($slug, $claypages))
			array_push($pagetype, 'clay');
		if(in_array($slug, $pixelpages))
			array_push($pagetype, 'pixels');
	}

	echo '<div id="tag-line" >';
	if(empty($pagetype)) {
		echo '<em>C</em>ode, <em>C</em>lay &amp; <em>P</em>ixels';
	} else {
		if(in_array('code', $pagetype))
			echo '<em>C</em>ode, ';
		else
			echo 'Code, ';
		if(in_array('clay', $pagetype))
			echo '<em>C</em>lay &amp; ';
		else
			echo 'Clay &amp; ';
		if(in_array('pixels', $pagetype))
			echo '<em>P</em>ixels';
		else
			echo 'Pixels';
	}
	echo '</div>';
} 
function wt_page_description(){
	$out = "I am an artist and these are my media.<br />
Some of the things I make are useful {Websites, Mugs}.<br />
Others are beautiful {Vases, Pictures, Sculptures}.<br />
Hopefully a few fit into both categories.";
	

	global $post;
	if(get_post_meta($post->ID, 'Sub Heading Text', true))
		$out = get_post_meta($post->ID, 'Sub Heading Text', true);

	echo "<div id='page-description'>$out</div>";
}

//Disable Auto Formatting
remove_filter('the_content', 'wpautop');
remove_filter('the_content', 'wptexturize');

//Add Featured Image Support
add_theme_support('post-thumbnails');

function register_menus() {
	register_nav_menus(
		array(
			'main-nav' => 'Main Navigation',
			'secondary-nav' => 'Secondary Navigation',
			'sidebar-menu' => 'Sidebar Menu'
		)
	);
}
add_action( 'init', 'register_menus' );

function register_widgets(){

	register_sidebar( array(
		'name' => __( 'Sidebar' ),
		'id' => 'main-sidebar',
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

}//end register_widgets()
add_action( 'widgets_init', 'register_widgets' );

//Development Stuff
function dump_table($var, $title=false, $level=0)
{
    if($level==0)
    {
    		echo "<style>
td, th {text-align:left; padding:5px;}

table.dump {border: 2px solid #000; margin:5px;display:none;}
table.dump td {border: 1px solid #444;}
table.dump td table {border: 1px solid #888;}
table.dump td table td {border: 1px solid #bbb;}
table.dump td table td table {border: 1px solid #bbb;}
</style>";
        echo '<table width="400" border="0" cellspacing="1" cellpadding="3" class="dump">';
       
        if($title)
              echo '<tr>
                     <th align="left" colspan="2">'.$title.'</th>
                   </tr>';
         
        echo '
          <tr>
            <th align="left">VAR NAME</th>
            <th align="left">VALUE</th>
          </tr>';
    }
    else
    {
        echo '<table width="100%" border="0" cellspacing="3" cellpadding="3" class="dump_b">';
    }
   
    foreach($var as $i=>$value)
    {
        if(is_array($value) or is_object($value))
        {
        	echo '<tr>
        		<td align="left" width="50%" >'.$i.'</td>
        		<td align="left" width="50%" >';
            dump_table($value, true, ($level +1));
            echo '</td>
            </tr>';
        }
        else
        {
                echo '<tr>
                        <td align="left" width="50%" >'.$i.'</td>
                        <td align="left" width="50%" >'.$value.'</td>
                       </tr>';
        }
    }
    echo '</table>';
} ?>