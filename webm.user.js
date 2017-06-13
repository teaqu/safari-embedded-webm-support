// ==UserScript==
// @name         Safari Embedded WebM Support
// @namespace    safari-embedded-webm-support
// @version      1.0.1
// @description  Uses the VLC webplugin to play embeded webM videos.
// @author       C9HDN
// @match        *://boards.4chan.org/*
// @match        *://8ch.net/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @require      https://raw.githubusercontent.com/uzairfarooq/arrive/master/minified/arrive.min.js
// @updateURL    https://github.com/b50/safari-embedded-webm-support/raw/master/webm.user.js
// @downloadURL  https://github.com/b50/safari-embedded-webm-support/raw/master/webm.user.js
// ==/UserScript==

(function() {

    function embedVLC(video) {

        // 4chan
        if (document.URL.indexOf("//boards.4chan") > -1) {
            insert4chan(video);
        } else if (document.URL.indexOf("//8ch") > -1) { // 8chan
            insert8chan(video);
        }
    }

    // 4chan insert
    function insert4chan(video) {

        // Add vlc
        var vlc = createVLC(video);
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

    // 8chan insert
    function insert8chan(video) {

        // Create video
        var vlc = createVLC(video);
        video.before(vlc);

        // Hide video
        video.attr('style', 'width: 0; opacity: 0; height: 0;');
    }

    // Create vlc video to insert
    function createVLC(video) {
        var vlc = $('<embed loop="true">');
        vlc.attr({
            type: "application/x-vlc-plugin",
            pluginspage: "http://www.videolan.org",
            width: "640",
            height: "360",
            target: video.attr("src"),
        });
        return vlc;
    }

    // Convert new
    $(document).arrive('video[src$=".webm"]', function() {
        embedVLC($(this));
    });

})(this);
