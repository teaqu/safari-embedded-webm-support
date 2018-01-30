// ==UserScript==
// @name         Safari Embedded WebM Support
// @namespace    safari-embedded-webm-support
// @version      1.1
// @description  Uses the VLC webplugin to play embeded webM videos.
// @author       C9HDN
// @match        *://boards.4chan.org/*
// @match        *://8ch.net/*
// @match        *://gelbooru.com/index.php?page=post&*
// @match        *://danbooru.donmai.us/posts/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @require      https://raw.githubusercontent.com/uzairfarooq/arrive/master/minified/arrive.min.js
// @updateURL    https://github.com/b50/safari-embedded-webm-support/raw/master/webm.user.js
// @downloadURL  https://github.com/b50/safari-embedded-webm-support/raw/master/webm.user.js
// ==/UserScript==

(function() {

    function embedVLC(video, src) {
        // 4chan
        if (document.URL.indexOf("//boards.4chan") > -1) {
            insert4chan(video, src);
        // Other
        } else {
             // Create video
             var vlc = createVLC(video, src);
             video.before(vlc);

             // Hide video
             video.attr('style', 'width: 0; opacity: 0; height: 0;');
        }
    }

    // Create vlc video to insert
    function createVLC(video, src) {
        // Get source
        var vlc = $('<embed loop="' + video.prop("loop") + '">');
        vlc.attr({
            type: "application/x-vlc-plugin",
            pluginspage: "http://www.videolan.org",
            width: "855",
            height: "481",
            target: src,
        });
        return vlc;
    }

    // 4chan insert
    function insert4chan(video, src) {

        // Add vlc
        var vlc = createVLC(video, src);
        video.parent().before(vlc);
        vlc.attr("style", "margin: 5px 20px");

        // Hide thumb
        var thumb = video.parent().find('img');
        thumb.hide();

        // click to stop loading again
        thumb.click();

        // Create close button
        var closeSpan = $("<span class='collapseWebm'>-[<a>close</a>]</span>");
        var closeLink = $("a", closeSpan) ;
        vlc.prev().append(closeSpan);
        closeLink.click(function() {
            closeSpan.remove();
            vlc.remove();
            thumb.show();
        });
    }

    // Convert html5
    $(document).arrive('video[src$=".webm"]', function() {
        embedVLC($(this), $(this).attr("src"));
    });
    $('video[src$=".webm"]').each(function() {
        embedVLC($(this), $(this).attr("src"));
    });
     $(document).arrive('video source[src$=".webm"]', function() {
        embedVLC($(this).closest('video'), $(this).attr("src"));
    });
    $('video source[src$=".webm"]', $(this).src).each(function() {
        embedVLC($(this).closest('video'), $(this).attr("src"));
    });

})(this);
