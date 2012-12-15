<?php
/*
Plugin Name: Plugin For Plugins
Plugin URI: http://wesleytodd.com/wp-plugins/plugin-plugin
Description: Creates a post type for plugins with associated data. This is for plugin developers to make plugin home pages.
Author: Wes Todd
Version: 0.1
Author URI: http://wesleytodd.com
*/
//Sections Meta Box Stuff
//---------------------------------------------------------------------------------
$sec_meta_box = array(
    'id' => 'plugin-sec-metabox',
    'title' => 'Plugin Sections Information',
    'page' => 'custom-plugin',
    'context' => 'normal',
    'priority' => 'high',
    'fields' => array(
			array(
            'name' => 'Installation',
            'id' => 'installation',
            'type' => 'textarea'
        ),
        array(
            'name' => 'Frequently Asked Questions',
            'id' => 'faq',
            'type' => 'textarea'
        ),
        array(
            'name' => 'Upgrade Notice',
            'id' => 'upgrade',
            'type' => 'textarea'
        ),
        array(
            'name' => 'Screenshots',
            'id' => 'screenshots',
            'type' => 'textarea'
        ),
        array(
            'name' => 'Changelog',
            'id' => 'changelog',
            'type' => 'textarea'
        )
    )
);

add_action('admin_menu', 'plugin_sec_metabox');

// Add meta box
function plugin_sec_metabox() {
    global $sec_meta_box;
    
    add_meta_box($sec_meta_box['id'], $sec_meta_box['title'], 'plugin_show_sec_metabox', $sec_meta_box['page'], $sec_meta_box['context'], $sec_meta_box['priority']);
}

// Callback function to show fields in meta box
function plugin_show_sec_metabox() {
    global $sec_meta_box, $post;
    
    // Use nonce for verification
    echo '<input type="hidden" name="plugin_sec_metabox_nonce" value="', wp_create_nonce(basename(__FILE__)), '" />';
    
    echo '<table class="form-table">';

    foreach ($sec_meta_box['fields'] as $field) {
        // get current post meta data
        $meta = get_post_meta($post->ID, $field['id'], true);
        
        echo '<tr>',
                '<th style="width:20%"><label for="', $field['id'], '">', $field['name'], '</label></th>',
                '<td>';
        switch ($field['type']) {
            case 'text':
                echo '<input type="text" name="', $field['id'], '" id="', $field['id'], '" value="', $meta ? $meta : $field['std'], '" size="30" style="width:97%" />', '
', $field['desc'];
                break;
            case 'textarea':
                echo '<textarea name="', $field['id'], '" id="', $field['id'], '" cols="60" rows="4" style="width:97%">', $meta ? $meta : $field['std'], '</textarea>', '
', $field['desc'];
                break;
            case 'select':
                echo '<select name="', $field['id'], '" id="', $field['id'], '">';
                foreach ($field['options'] as $option) {
                    echo '<option', $meta == $option ? ' selected="selected"' : '', '>', $option, '</option>';
                }
                echo '</select>';
                break;
            case 'radio':
                foreach ($field['options'] as $option) {
                    echo '<input type="radio" name="', $field['id'], '" value="', $option['value'], '"', $meta == $option['value'] ? ' checked="checked"' : '', ' />', $option['name'];
                }
                break;
            case 'checkbox':
                echo '<input type="checkbox" name="', $field['id'], '" id="', $field['id'], '"', $meta ? ' checked="checked"' : '', ' />';
                break;
	    case 'user-dropdown':
                wp_dropdown_users(array('name' => $field['id'],'selected' => get_post_meta($post->ID, $field['id'], true)));
                break;
        }
        echo     '<td>',
            '</tr>';
    }
    
    echo '</table>';
}

add_action('save_post', 'plugin_sec_save_data');

// Save data from meta box
function plugin_sec_save_data($post_id) {
    global $sec_meta_box;
    
    // verify nonce
    if (!wp_verify_nonce($_POST['plugin_ver_metabox_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // check permissions
    if ('page' == $_POST['post_type']) {
        if (!current_user_can('edit_page', $post_id)) {
            return $post_id;
        }
    } elseif (!current_user_can('edit_post', $post_id)) {
        return $post_id;
    }
    
    foreach ($sec_meta_box['fields'] as $field) {
        $old = get_post_meta($post_id, $field['id'], true);
        $new = $_POST[$field['id']];
        if($new=='0'){
        	$new = '\0';
        }		
        
        if ($new && $new != $old) {

				$new = trim($new);
		
            update_post_meta($post_id, $field['id'], $new);
        } elseif ('' == $new && $old) {
            delete_post_meta($post_id, $field['id'], $old);
        }
    }
}
//---------------------------------------------------------------------------------
//End Sections Meta Box Stuff
//Version Meta Box Stuff
//---------------------------------------------------------------------------------
$ver_meta_box = array(
    'id' => 'plugin-ver-metabox',
    'title' => 'Plugin Version Information',
    'page' => 'custom-plugin',
    'context' => 'side',
    'priority' => 'low',
    'fields' => array(
			array(
            'name' => 'Requires At Least',
            'id' => 'min-ver-req',
            'type' => 'text'
        ),
        array(
            'name' => 'Tested Up To',
            'id' => 'tested-ver',
            'type' => 'text'
        ),
        array(
            'name' => 'Stable Tag',
            'id' => 'stable-ver',
            'type' => 'text'
        ),
        array(
            'name' => 'Version',
            'id' => 'version',
            'type' => 'text'
        )
    )
);

add_action('admin_menu', 'plugin_ver_metabox');

// Add meta box
function plugin_ver_metabox() {
    global $ver_meta_box;
    
    add_meta_box($ver_meta_box['id'], $ver_meta_box['title'], 'plugin_show_ver_metabox', $ver_meta_box['page'], $ver_meta_box['context'], $ver_meta_box['priority']);
}

// Callback function to show fields in meta box
function plugin_show_ver_metabox() {
    global $ver_meta_box, $post;
    
    // Use nonce for verification
    echo '<input type="hidden" name="plugin_ver_metabox_nonce" value="', wp_create_nonce(basename(__FILE__)), '" />';
    
    echo '<table class="form-table">';

    foreach ($ver_meta_box['fields'] as $field) {
        // get current post meta data
        $meta = get_post_meta($post->ID, $field['id'], true);
        
        echo '<tr>',
                '<th style="width:20%"><label for="', $field['id'], '">', $field['name'], '</label></th>',
                '<td>';
        switch ($field['type']) {
            case 'text':
                echo '<input type="text" name="', $field['id'], '" id="', $field['id'], '" value="', $meta ? $meta : $field['std'], '" size="30" style="width:97%" />', '
', $field['desc'];
                break;
            case 'textarea':
                echo '<textarea name="', $field['id'], '" id="', $field['id'], '" cols="60" rows="4" style="width:97%">', $meta ? $meta : $field['std'], '</textarea>', '
', $field['desc'];
                break;
            case 'select':
                echo '<select name="', $field['id'], '" id="', $field['id'], '">';
                foreach ($field['options'] as $option) {
                    echo '<option', $meta == $option ? ' selected="selected"' : '', '>', $option, '</option>';
                }
                echo '</select>';
                break;
            case 'radio':
                foreach ($field['options'] as $option) {
                    echo '<input type="radio" name="', $field['id'], '" value="', $option['value'], '"', $meta == $option['value'] ? ' checked="checked"' : '', ' />', $option['name'];
                }
                break;
            case 'checkbox':
                echo '<input type="checkbox" name="', $field['id'], '" id="', $field['id'], '"', $meta ? ' checked="checked"' : '', ' />';
                break;
	    case 'user-dropdown':
                wp_dropdown_users(array('name' => $field['id'],'selected' => get_post_meta($post->ID, $field['id'], true)));
                break;
        }
        echo     '<td>',
            '</tr>';
    }
    
    echo '</table>';
}

add_action('save_post', 'plugin_ver_save_data');

// Save data from meta box
function plugin_ver_save_data($post_id) {
    global $ver_meta_box;
    
    // verify nonce
    if (!wp_verify_nonce($_POST['plugin_ver_metabox_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // check permissions
    if ('page' == $_POST['post_type']) {
        if (!current_user_can('edit_page', $post_id)) {
            return $post_id;
        }
    } elseif (!current_user_can('edit_post', $post_id)) {
        return $post_id;
    }
    
    foreach ($ver_meta_box['fields'] as $field) {
        $old = get_post_meta($post_id, $field['id'], true);
        $new = $_POST[$field['id']];
        if($new=='0'){
        	$new = '\0';
        }		
        
        if ($new && $new != $old) {

				$new = trim($new);
		
            update_post_meta($post_id, $field['id'], $new);
        } elseif ('' == $new && $old) {
            delete_post_meta($post_id, $field['id'], $old);
        }
    }
}
//---------------------------------------------------------------------------------
//End Version Meta Box Stuff


//Create Custom Post Type
//---------------------------------------------------------------------------------
add_action('init', 'plugin_post_type');
function plugin_post_type() 
{
  $labels = array(
    'name' => _x('Plugin', 'post type general name'),
    'singular_name' => _x('Plugin', 'post type singular name'),
    'add_new' => _x('Add New', 'Plugin'),
    'add_new_item' => __('Add New Plugin'),
    'edit_item' => __('Edit Plugin'),
    'new_item' => __('New Plugin'),
    'view_item' => __('View Plugin'),
    'search_items' => __('Search Plugins'),
    'not_found' =>  __('No Plugins found'),
    'not_found_in_trash' => __('No Plugins found in Trash')
  );
  $args = array(
    'labels' => $labels,
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true, 
    'query_var' => true,
    'rewrite' => array('slug' => 'custom-plugins'),
    'has_archive' => true,
    'capability_type' => 'post',
    'hierarchical' => true,
    'menu_position' => 10,
    'supports' => array('title', 'author', 'tracbacks', 'revisions', 'comments', 'thumbnail', 'editor', 'excerpt', 'custom-fields'),
    'description' => 'Plugins made by a WordPress plugin developer'
  ); 
  register_post_type('custom-plugin',$args);
}

//add filter to insure the text Letter, or letter, is displayed when user updates a letter 
add_filter('post_updated_messages', 'plugin_updated_messages');
function plugin_updated_messages( $messages ) {

  $messages['custom-plugin'] = array(
    0 => '', // Unused. Messages start at index 1.
    1 => sprintf( __('Plugin updated. <a href="%s">View Plugin</a>'), esc_url( get_permalink($post_ID) ) ),
    2 => __('Custom field updated.'),
    3 => __('Custom field deleted.'),
    4 => __('Plugin updated.'),
    /* translators: %s: date and time of the revision */
    5 => isset($_GET['revision']) ? sprintf( __('Plugin restored to revision from %s'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
    6 => sprintf( __('Plugin published. <a href="%s">View Plugin</a>'), esc_url( get_permalink($post_ID) ) ),
    7 => __('Plugin saved.'),
    8 => sprintf( __('Plugin submitted. <a target="_blank" href="%s">Preview Plugin</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
    9 => sprintf( __('Plugin scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Plugin</a>'),
      // translators: Publish box date format, see http://php.net/date
      date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink($post_ID) ) ),
    10 => sprintf( __('Plugin draft updated. <a target="_blank" href="%s">Preview Plugin</a>'), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
  );

  return $messages;
}

//display contextual help for Letter
//add_action( 'contextual_help', 'add_plugin_help_text', 10, 3 );

function add_plugin_help_text($contextual_help, $screen_id, $screen) { 
  //$contextual_help = . var_dump($screen); // use this to help determine $screen->id
  if ('custom-plugin' == $screen->id ) {
    $contextual_help =
      '<p>' . __('Things to remember when adding or editing a letter:') . '</p>' .
      '<ul>' .
      '<li>' . __('The title is the letter code and name of the picture file.') . '</li>' .
      '<li>' . __('Remember to correctly tag the letter based on your criteria.') . '</li>' .
      '<li>' . __('Attributes->Order is the order in which this letter will appear. "1" will appear first, "2" second.  "0" means no preference.') . '</li>' .
      '</ul>' .
      '<p><strong>' . __('For more information:') . '</strong></p>' .
      '<p>' . __('<a href="http://codex.wordpress.org/Posts_Edit_SubPanel" target="_blank">Edit Posts Documentation</a>') . '</p>' .
      '<p>' . __('<a href="http://wordpress.org/support/" target="_blank">Support Forums</a>') . '</p>' ;
  } elseif ( 'edit-letter' == $screen->id ) {
    $contextual_help = 
      '<p>' . __('This is the help screen displaying the table of letters blah blah blah.') . '</p>' ;
  }
  return $contextual_help;
}
//END create custom post type
//---------------------------------------------------------------------------------
?>