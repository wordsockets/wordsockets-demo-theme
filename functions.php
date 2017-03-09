<?php

add_action('wp_enqueue_scripts', function(){
  wp_enqueue_script( 'ws-app', get_stylesheet_directory_uri() . '/app.js', ['jquery'], null, true );
});
