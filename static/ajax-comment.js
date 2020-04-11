(function ($) {
    $(document).ready(function () {
        $('.infos .donate,.infos .share').unbind("click").click(function () {
            if ($(this).attr('class') == 'donate') {
                $('.infos').removeClass('share-close');
                $('.infos').toggleClass('donate-close');
            } else {
                $('.infos').removeClass('donate-close');
                $('.infos').toggleClass('share-close');
                if ($(this).find('img').length == 0) {
                    $(this).append('<div class="qrcode"><img src="' + $(this).find('a').data('qrcode') + '" /> <i>移动设备上继续阅读</i></div>');
                }
            }
        });
    });

    $(".dot-good").click(function () {
        if ($(this).hasClass('done')) {
            alert('点多了伤身体~');
            return false;
        } else {
            $(this).addClass('done');
            var id = $(this).data("id"),
                action = $(this).data('action'),
                rateHolder = $(this).children('.count');
            var ajax_data = {
                action: "dotGood",
                um_id: id,
                um_action: action
            };
            $.post(themeAdminAjax.url, ajax_data, function (data) {
                $(rateHolder).html(data);
            });
            return false;
        }
    });

    //Zepto & jQuery AjaxComments
    $(document).ready(function () {
        var __cancel = $('#cancel-comment-reply-link'),
            __cancel_text = __cancel.text(),
            __list = 'commentlist';//your comment wrapprer
        $(document).off().on("submit", "#commentform", function () {
            $.ajax({
                url: ajaxcomment.ajax_url,
                data: $(this).serialize() + "&action=ajax_comment",
                type: $(this).attr('method'),
                beforeSend: bijiAjax.createButterbar("提交中...."),
                error: function (request) {
                    var t = bijiAjax;
                    t.createButterbar(request.responseText);
                },
                success: function (data) {
                    $('textarea').each(function () {
                        this.value = ''
                    });
                    var t = bijiAjax,
                        cancel = t.I('cancel-comment-reply-link'),
                        temp = t.I('wp-temp-form-div'),
                        respond = t.I(t.respondId),
                        post = t.I('comment_post_ID').value,
                        parent = t.I('comment_parent').value;
                    if (parent != '0') {
                        $('#respond').before('<ol class="children">' + data + '</ol>');
                    } else if (!$('.' + __list).length) {
                        if (ajaxcomment.formpostion == 'bottom') {
                            $('#respond').before('<ol class="' + __list + '">' + data + '</ol>');
                        } else {
                            $('#respond').after('<ol class="' + __list + '">' + data + '</ol>');
                        }

                    } else {
                        if (ajaxcomment.order == 'asc') {
                            $('.' + __list).append(data);
                        } else {
                            $('.' + __list).prepend(data);
                        }
                    }
                    t.createButterbar("提交成功");
                    cancel.style.display = 'none';
                    cancel.onclick = null;
                    t.I('comment_parent').value = '0';
                    if (temp && respond) {
                        temp.parentNode.insertBefore(respond, temp);
                        temp.parentNode.removeChild(temp)
                    }
                }
            });
            return false;
        });
        bijiAjax = {
            respondId: "respond",
            I: function (e) {
                return document.getElementById(e);
            },
            clearButterbar: function (e) {
                if ($(".butterBar").length > 0) {
                    $(".butterBar").remove();
                }
            },
            createButterbar: function (message) {
                var t = this;
                t.clearButterbar();
                $("body").append('<div class="butterBar butterBar--center"><p class="butterBar-message">' + message + '</p></div>');
                setTimeout("$('.butterBar').remove()", 3000);
            }
        };
    });
})(jQuery);
