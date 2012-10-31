/*
* fabio.tabs.js - by Fabio Costa
* Version 1.2 (Oct/31/2012)
* 
* http://fabiocanada.ca/2012/10/02/jquery-plugin-tabs-js/
*
* Copyright 2013 Fabio Costa
* Released under the GNU General Public License, version 3 (GPL-3.0)
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

                //applying the width
                if (opts.fixedWidthTabs)
                    $(this).css("width", opts.tabWidth);
                else {
                    $(this).css("padding-left", "4px");
                    $(this).css("padding-right", "4px");
                }

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

            if (isNaN(opts.defaultTabIndex))
                opts.defaultTabIndex = 0;

            //css selected class for the index tab
            var selectedTab = $(this.tabs[opts.defaultTabIndex]);
            if (!selectedTab.hasClass("tabSelected"))
                selectedTab.addClass("tabSelected");


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
                this.ajaxIcon.setAttribute('src', 'ajax.gif');
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

            var selectedDiv = $(this.divs[opts.defaultTabIndex]);
            selectedDiv.show();

        });


    };

    $.fn.tabs.defaults = { animate: true, waitTime: 500, fadeIn: 'slow', contentWidth: '100%', tabWidth: '146px', defaultTabIndex: 0, fixedWidthTabs: true };

})(jQuery);