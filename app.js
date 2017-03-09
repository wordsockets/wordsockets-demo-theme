(function($){
  $(document).on('ready', function(){
    var ws = new WordSocket();
    /*
      {
        id: number
        title: string,
        author: string,
        date: string,
        content: string
      }
     */
    ws.post.onInsert(function(data){
      var $container = $('.posts');
      var html = '';
      html += '<div class="post post--new" data-wsid="'+data.id+'">';
      html +=   '<article class="post-main">';
      html +=     '<header>';
      html +=       '<h2 class="post-title">'+data.title+'</h2>';
      html +=       '<span class="post-author">'+data.author+'</span>';
      html +=       '<span class="post-date">'+data.date+'</span>';
      html +=     '</header>';
      html +=     '<div class="post-content">'+data.content+'</div>';
      html +=   '</article>';
      html +=   '<aside class="comments">';
      html +=     '<ul class="comments-list"></ul>';
      if(window.WS_USER){
        html +=     '<div class="comment-new">';
        html +=       '<textarea placeholder="Leave a comment"/>';
        html +=       '<button type="submit">Comment</button>';
        html +=     '</div>';
      }
      html +=   '</aside>';
      html += '</div>';
      $container.find('.posts-noPosts').remove();
      $container.prepend(html);
      $('body').append('<span class="alert-new">New Posts</span>');
      setTimeout(function(){
        $('.alert-new').remove();
      },4000);
    });

    $('body').on('mouseenter', '.post--new', function(){
      $(this).removeClass('post--new');
    });

    /*
      {
        id: number
        title: string,
        author: string,
        date: string,
        content: string
      }
     */
    ws.post.onUpdate(function(data){
      var $post = $('.post[data-wsid="'+data.id+'"]');
      $post.find('.post-editStatus').remove();
      $post.find('.post-dateEdit').remove();
      $post.find('.post-date').append(' <span class="post-dateEdit">(edited '+data.date+' by '+data.author+')</span>');
      $post.find('.post-title').html(data.title);
      $post.find('.post-author').html(data.author);
      $post.find('.post-content').html(data.content);
      $post.addClass('post--updated').removeClass('post--isBeingEdited');
    });

    $('body').on('mouseenter', '.post--updated', function(){
      $(this).removeClass('post--updated');
    });

    /*
      {
        id: number
        author: string
      }
     */
    ws.post.onEdit(function(data){
      var $post   = $('.post[data-wsid="'+data.id+'"]');
      var $status = $post.find('.post-editStatus');
      var html    = '<span class="post-editStatus">'+data.author+' is editing this post</span>';
      $post.addClass('post--isBeingEdited');
      if($status.length){
        $status.replaceWith(html);
      } else {
        $post.find('.post-main').append(html);
      }
    });

    /*
      {
        post_id: number,
        user: string,
        date: string,
        content: string
      }
     */
    ws.comment.onInsert(function(data){
      var $container = $('.post[data-wsid="'+data.post_id+'"] .comments-list');
      var html = '';
      html += '<li class="comment">';
      html +=   '<span class="comment-author">'+data.user+'</span> ';
      html +=   '<span class="comment-date">'+data.date+'</span>';
      html +=   '<div class="comment-body">'+data.content+'</div>';
      html += '</li>';
      $container.prepend(html);
      $container.animate({scrollTop: 0}, 250);
    });

    /*
      {
        post_id: number,
        user: string
      }
     */
    ws.comment.onUserFocus(function(data){
      var $post     = $('.post[data-wsid="'+data.post_id+'"]');
      var $comments = $post.find('.comment-new');
      var $alert    = $comments.find('.comment-alert');
      var users     = $post.data('users') || [];
      if(users.indexOf(data.user) < 0){
        users.push(data.user);
      }
      var html = '<span class="comment-alert">Writing comments: '+users.join(', ')+'</span>';
      if($alert.length){
        $alert.replaceWith(html);
      } else {
        $comments.append(html);
      }
      $post.data('users', users);
    });

    /*
      {
        post_id: number,
        user: string
      }
     */
    ws.comment.onUserBlur(function(data){
      var $post     = $('.post[data-wsid="'+data.post_id+'"]');
      var $comments = $post.find('.comment-new');
      var $alert    = $comments.find('.comment-alert');
      var users     = $post.data('users') || [];
      if(users.indexOf(data.user) >= 0){
        users.splice(users.indexOf(data.user), 1);
      }
      if(users.length == 0){
        $alert.remove();
      }
      var html = '<span class="comment-alert">Writing comments: '+users.join(', ')+'</span>';
      if($alert.length){
        $alert.replaceWith(html);
      } else {
        $comments.append(html);
      }
      $post.data('users', users);
    });

    if(window.WS_USER){
      $('body').on('focus', '.comment-new textarea', function(){
        var data = {
          post_id: $(this).closest('[data-wsid]').attr('data-wsid'),
          user: WS_USER
        };
        ws.comment.onFocus(data);
      });

      $('body').on('blur', '.comment-new textarea', function(){
        var data = {
          post_id: $(this).closest('[data-wsid]').attr('data-wsid'),
          user: WS_USER
        };
        ws.comment.onBlur(data);
      });

      $('body').on('click', '.comment-new [type="submit"]', function(){
        var field = $(this).siblings('textarea');
        var data = {
          post_id: $(this).closest('[data-wsid]').attr('data-wsid'),
          user: WS_USER,
          content: field.val()
        };
        console.log(data);
        ws.comment.onSubmit(data, function(res){
          console.log(res);
          field.val('');
        });
      });
    }
  });
})(jQuery)
