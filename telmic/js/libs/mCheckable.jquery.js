(function($) {

    function renderCurrentStatusRadio(){
        $('input[type="radio"]').each(function(i,element){
            $(element).next().toggleClass('checked', $(element).is(':checked'));
        });
    }

    function _triggerChange($this, element) {
        $this.on('change', function(e) {
            $this.trigger('mCheckable:change');

            element.toggleClass('checked', $this.is(':checked'));
            if($this.attr('type') == 'radio'){
                renderCurrentStatusRadio();
            }
        });
    }

    var methods = {
        init: function(options) {
            return this.each(function() {
                var $this = $(this),
                    settings = $this.data('mCheckable');

                if ($this.data('checkable')) {
                    return;
                }

                if (typeof(settings) == 'undefined') {
                    var defaults = {
                        className : 'mCheckable',
                        classNameRadioButton : 'radiobutton',
                        classNameCheckbox : 'checkbox',
                        baseTag : '<span></span>',
                        innerTags : '<em></em>'
                    };
                    settings = $.extend({}, defaults, options);
                    $this.data('mCheckable', settings);
                } else {
                    settings = $.extend({}, settings, options);
                }

                var element = $(settings.baseTag)
                    .prepend(settings.innerTags)
                    .addClass(settings.className)
                    .toggleClass('checked', $this.is(':checked'));

                if($this.attr('type') == 'checkbox'){
                    element.addClass(settings.classNameCheckbox)
                } else {
                    element.addClass(settings.classNameRadioButton)
                }

                $this.hide().after(element);

               // _triggerClick(settings,$this, element);
                _triggerChange($this, element);

                $this.data('checkable', 'checkable');
            });
        },
        check: function() {
            return this.each(function() {
                var $this = $(this),
                    element = $this.next();

                $this.prop('checked', true);
                element.addClass('checked');
            });
        },
        unCheck: function() {
            return this.each(function() {
                var $this = $(this),
                    element = $this.next();

                $this.prop('checked', false);
                element.removeClass('checked')
            });
        }
    };

    $.fn.mCheckable = function() {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof(method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.pluginName');
            return this;
        }
        return method.apply(this, arguments);
    }
})(jQuery);