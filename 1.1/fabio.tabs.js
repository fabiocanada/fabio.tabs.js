﻿/*
* Tabs - by Fabio Costa
* Version 1.1 (Oct/11/2012)
* 
* 
* How to use:
*   1) Create a div where you want to place the tabs.
*   2) Create divs for each tab/button and apply class="tab"
*   3) Create divs for each data content, apply class="data" make sure the order of them in the DOM is the same as the tabs
* 
* 
* Check user guide at: http://fabiocanada.ca/2012/10/02/jquery-plugin-tabs-js/
* 
*/

(function ($) {

    $.fn.tabs = function (options) {

        var opts = $.extend({}, $.fn.tabs.defaults, options);

        return this.each(function () {

            if (!$(this).hasClass("Tabs"))
                $(this).addClass("Tabs");

            //selecting the tabs
            this.tabs = $(this).children(".tab");

            var n = $(this.tabs).size();

            $(this.tabs).each(function (i) {

                //applying the middleLayer for each tab
                if (i < n - 1) {
                    $("<div class='middleLayer'></div>").insertAfter($(this));
                }

                //css unselected class for each tab
                if (i > 0) {
                    if (!$(this).hasClass("tabUnselected"))
                        $(this).addClass("tabUnselected");
                }

                //apply the click event
                $(this).bind('click', function () {
                    if ($(this).hasClass("tabSelected"))
                        return;

                    var parent = $(this).parent().get(0);
                    $(parent).children(".tabSelected").removeClass("tabSelected").addClass("tabUnselected");

                    $(this).addClass("tabSelected").removeClass("tabUnselected");

                    $(parent.divs).hide();

                    if (opts.animate) {
                        $(parent.ajaxIcon).show();
                        setTimeout(function () { $(parent.divs[i]).fadeIn('slow'); $(parent.ajaxIcon).hide(); }, opts.waitTime);
                    } else {
                        $(parent.divs[i]).fadeIn(opts.fadeIn);
                    }

                    //$(img).remove();

                    return false;
                });
            });

            //css selected class for 1st tab
            if (!$(this.tabs).first().hasClass("tabSelected"))
                $(this.tabs).first().addClass("tabSelected");


            //create the clear div
            this.clearDiv = document.createElement('div');
            this.clearDiv.setAttribute('style', 'clear:both');
            this.clearDiv = $(this.clearDiv);
            this.clearDiv.insertAfter($(this.tabs).last());

            //create the content div
            this.content = document.createElement('div');
            this.content.setAttribute('class', 'content');
            this.content.setAttribute('style', "width:" + opts.contentWidth);
            $(this.content).insertAfter(this.clearDiv);

            if (opts.animate) {
                this.ajaxIcon = document.createElement('img')
                this.ajaxIcon.setAttribute('src', '/Content/images/ajax.gif');
                this.ajaxIcon.setAttribute('style', 'text-align:center');
                $(this.ajaxIcon).hide();
                $(this.content).append($(this.ajaxIcon));
            }

            //select the data divs
            this.divs = $(this).children(".data");

            $(this.divs).appendTo($(this.content));

            //hide them all except first one
            $(this.divs).each(function () {
                $(this).hide();
            });
            $(this.divs).first().show();

        });


    };

    $.fn.tabs.defaults = { animate: true, waitTime: 500, fadeIn: 'slow', contentWidth: '100%' };

})(jQuery);