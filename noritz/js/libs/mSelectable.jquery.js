(function($) {
    var body = $('body');

    var _triggerOnClick = function(settings, list, $selectText){
        $selectText.on('click',function(e){
            e.preventDefault();

            $selectText.parent().toggleClass('active');
            list.fadeToggle(settings.fadeSpeed);
        });
    };

    var _triggerOnClickList = function(settings, defaultSelect, list, $selectText){
        list.children().on('click',function(e){
            e.preventDefault();
            var $this = $(this);

            list.find('.selected').removeClass('selected');
            $this.addClass('selected');
            $selectText.text($this.text());
            defaultSelect.val($this.data('value'));
            list.fadeOut(settings.fadeSpeed);

            defaultSelect.trigger('mSelectable:select',[
                $this , $this.data('value'), $this.text()
            ]);

            _setFirstDisabled(settings,$this,$selectText);
            $selectText.parent().removeClass('active');
        })
    };

    var _setFirstDisabled = function(settings, elem, $selectText){
        if(settings.firstDisabled){
            if(elem.index() != 0 )
                $selectText.addClass('enabled');
            else
                $selectText.removeClass('enabled');
        }
    };


    var _hideOnFocusOut = function(settings, list){
        body.on('click',function( e ){
            var target = $(e.target);
            if (target.hasClass(settings.className) || target.parents('.' + settings.className).length > 0)
                return false;
            list.fadeOut(settings.fadeSpeed);

        });
    };

    var _buildDropdown = function(settings, $this, select){
        var list = $(settings.containerListTag)
            .addClass('mList')
            .css({display : 'none' , position : 'absolute', 'left' : -1 });

        $this.find('option').each(function(){            
            var $this = $(this),
                row = $(settings.listRowTag, {
                    text : $this.text(),
                    'class' : ($this.is(':selected')) ? 'selected' : ''
                }).data('value', $this.val());
            list.append(row);
        });

        _setFirstDisabled(settings, $this.children("option:selected"), select.find('.mText'));
        select.append(list);
        list.css({ top : select.outerHeight(), width : select.outerWidth() });
        return list;
    };

    var _setSelectedText= function($this, $selectText){
        $selectText.text(
            $this.children("option:selected").text()
        );
    };

    var methods = {
        init: function(options) {
            return this.each(function() {
                var $this = $(this),
                    settings = $this.data('mSelectable');

                if ($this.data('Selectable')) {
                    return;
                }

                if (typeof(settings) == 'undefined') {
                    var defaults = {
                        className : 'mSelectable',
                        addClassName : false,
                        baseSelectTag : '<div></div>',
                        innerTextTag : '<span></span>',
                        innerSelectTag : '<em></em>',
                        containerListTag : '<ul></ul>',
                        listRowTag : '<li></li>',
                        fadeSpeed : 100,
                        firstDisabled : true
                    };
                    settings = $.extend({}, defaults, options);
                    $this.hide().data('mSelectable', settings);
                } else {
                    settings = $.extend({}, settings, options);
                }


                var select = $(settings.baseSelectTag)
                    .addClass(settings.className)
                    .addClass($this.attr('class'))
                    .css({position : 'relative' })
                    .append($(settings.innerTextTag).addClass('mText'))
                    .append($(settings.innerSelectTag).addClass('mSelectArrow'));
                $this.removeAttr('class');

                $this.after(select);
                select.prepend($this);

                var $selectText = select.find('.mText'),
                list = _buildDropdown(settings, $this, select);
                _setSelectedText($this, $selectText);
                _triggerOnClick(settings, list, $selectText);
                _triggerOnClickList(settings, $this, list, $selectText);
                _hideOnFocusOut(settings, list);

                if(settings.addClassName) select.addClass(settings.addClassName);
                $this.data('Selectable', 'selectable');
            });
        },
        rebuild : function(){
            var $this = $(this),
                settings = $this.data('mSelectable'),
                select = $this.parents('.' + settings.className);

            select.find('ul').remove();
            var $selectText = select.find('.mText'),
                list = _buildDropdown(settings, $this, select);
            _setSelectedText($this, $selectText);
            _triggerOnClick(settings, list, $selectText);
            _triggerOnClickList(settings, $this, list, $selectText);
            _hideOnFocusOut(settings, list);
        }
    };

    $.fn.mSelectable = function() {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof(method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.mSelectable');
            return this;
        }
        return method.apply(this, arguments);
    }
})(jQuery);