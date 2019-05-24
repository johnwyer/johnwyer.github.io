/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: JA (Japanese; 日本語)
 */
$.extend($.validator.messages, {
    required: "このフィールドは必須です。",
    remote: "このフィールドを修正してください。",
    email: "有効なEメールアドレスを入力してください。",
    url: "有効なURLを入力してください。",
    date: "有効な日付を入力してください。",
    dateISO: "有効な日付（ISO）を入力してください。",
    number: "有効な数字を入力してください。",
    digits: "数字のみを入力してください。",
    creditcard: "有効なクレジットカード番号を入力してください。",
    equalTo: "同じ値をもう一度入力してください。",
    extension: "有効な拡張子を含む値を入力してください。",
    maxlength: $.validator.format("{0} 文字以内で入力してください。"),
    minlength: $.validator.format("{0} 文字以上で入力してください。"),
    rangelength: $.validator.format("{0} 文字から {1} 文字までの値を入力してください。"),
    range: $.validator.format("{0} から {1} までの値を入力してください。"),
    step: $.validator.format("{0} の倍数を入力してください。"),
    max: $.validator.format("{0} 以下の値を入力してください。"),
    min: $.validator.format("{0} 以上の値を入力してください。")
});

$(function () {
    $.datepicker.setDefaults($.datepicker.regional["ja"]);
    $(".form-datepicker").datepicker({
        dateFormat: "dd/mm/y"
    });

    if ($('#card_date').length) {
        $('#card_date').datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'MM/yy',

            onClose: function() {
                var iMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                var iYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
            }
        });
    }

    var hideTimer;
    $('#select-shipping-address').on('click', '.select-address', function () {
        var _this = $(this);
        var _this_val = _this.val();

        clearTimeout(hideTimer);
        if (_this_val == "1") {
            $('.form-shipping-2').removeClass('in');
            hideTimer = setTimeout(function () {
                $('.form-shipping-2').hide();
            }, 170);
        } else {
            $('.form-shipping-2').show();
            setTimeout(function () {
                $('.form-shipping-2').addClass('in');
            }, 5);
        }
    });

    $("#shipping-form").validate({
        submitHandler: function (form) {
            form.submit();
        }
    });
});