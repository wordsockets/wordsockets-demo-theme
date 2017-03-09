<!DOCTYPE html>
<html>
  <head>
    <?php wp_head(); ?>
    <style>
      @import url('https://fonts.googleapis.com/css?family=Bevan|Nunito:200,400,700,900');
      body {
        font-family: 'Nunito', sans-serif;
        background: #EEE;
        padding: 3em 0 0;
      }
      .posts {
        max-width: 970px;
        margin: 0 auto 10em;
      }
      .post {
        padding: 4em 3em 3em;
        margin: 0 0 5em;
        border-left: 10px solid black;
        border-radius: 15px;
        box-shadow: 0 .5em 2em rgba(50,50,50,.05);
        text-align: justify;
        background: #FFF;
      }
      .post:after {
        content: '';
        width: 100%;
        display: inline-block;
      }
      .post-main {
        width: 65%;
        display: inline-block;
      }
      .comments {
        width: 30%;
        display: inline-block;
        vertical-align: top;
      }
      .post-header {
        margin: 0 0 1em;
      }
      .post-title {
        margin: 0 0 3px;
        font-family: 'Bevan', cursive;
        font-size: 32px;
        letter-spacing: 1px;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
      }
      .post-date,
      .comment-date {
        font-weight: 200;
        font-size: 12px;
        color: #555;
      }
      .post-date {
        margin-left: .5em;
      }
      .post-dateEdit {
        background: #FFF731;
        color: #777;
        line-height: 1;
      }
      .post-content {
        padding: 0 5em 0 0;
        font-size: 18px;
        line-height: 1.6;
        font-weight: 200;
      }
      .comments-list {
        max-height: 25em;
        overflow: scroll;
        margin: 0 0 2em;
        padding: 0;
        list-style: none;
        box-shadow: 0 .5em 2em rgba(50,50,50,.05);
      }
      .comment {
        margin: 0 0 1em;
        padding: 1em 1em 0;
        border-top: 1px solid #DDD;
      }
      .comment-new textarea {
        border: none;
        height: 4em;
        display: block;
        width: 100%;
        font-size: 16px;
      }
      .comment-new button {
        display: block;
        padding: .5em 0;
        margin: 0 0 1em;
        font-size: 16px;
        width: 100%;
        border: none;
        background: none;
        font-family: 'Bevan', cursive;;
      }
      .comment-body {
        font-weight: 200;
      }
      .post--new {
        border-color: #69FFBE;
      }
      .post--updated {
        border-color: #FFF731;
      }
      .post--isBeingEdited {
        border-color: #FF7A56;
      }
      .post-editStatus {
        background: #FF7A56;
        line-height: 1;
        animation: in .5s ease-in-out 1;
      }
      .alert-new {
        position: fixed;
        pointer-events: none;
        animation: dip 4s ease-in-out 1;
        left: 50%;
        transform: translateX(-50%);
        padding: .5em 1em;
        text-align: center;
        z-index: 1;
        background: #000;
        color: #FFF;
      }
      @keyframes dip {
        0%   { top: -3em; opacity: 0; }
        10%  { top: 1em; opacity: 1; }
        90%  { top: 1em; opacity: 1; }
        100% { top: -3em; opacity: 0; }
      }
      @keyframes in {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
      #wpadminbar {
        display: none;
      }
    </style>
  </head>
  <body>
    <main>
      <div class="posts">
        <?php if(have_posts()){ ?>
          <?php while(have_posts()){ the_post(); ?>
            <div class="post" data-wsid="<?php the_ID(); ?>">
              <article class="post-main">
                <header>
                  <h2 class="post-title">
                    <?php the_title(); ?>
                  </h2>
                  <span class="post-author">
                    <?php the_author(); ?>
                  </span>
                  <span class="post-date">
                    <?php echo get_the_date('g:i:sA, M j, Y'); ?>
                  </span>
                </header>
                <div class="post-content">
                  <?php the_content(); ?>
                </div>
              </article>
              <aside class="comments">
                <ul class="comments-list">
                  <?php
                    $comments_query = new WP_Comment_Query;
                    $comments = $comments_query->query(['post_id' => get_the_ID()]);
                    foreach($comments as $comment){
                  ?>
                      <li class="comment">
                       <span class="comment-author"><?php echo $comment->comment_author; ?></span>
                       <span class="comment-date"><?php echo date('g:i:sA, M j, Y', strtotime($comment->comment_date)); ?></span>
                       <div class="comment-body"><?php echo $comment->comment_content; ?></div>
                      </li>
                  <?php } ?>
                </ul>
                <?php if(is_user_logged_in()){ ?>
                  <div class="comment-new">
                    <textarea placeholder="Leave a comment"></textarea>
                    <button type="submit">Comment</button>
                  </div>
                <?php } ?>
              </aside>
            </div>
          <?php } ?>
        <?php } else { ?>
          <div class="posts-noPosts">Sorry, no posts were found.</div>
        <?php } ?>
      </div>
    </main>
    <?php wp_footer(); ?>
  </body>
</html>
