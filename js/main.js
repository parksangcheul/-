$(function ($) {
    'use strict';

    var _sd = _sd || {}

    // Document Ready
    $(function () {
        _init();
        _initEvent();
    });

    //정의
    function _init() {
        _sd.blob = $('#blob');
        _sd.blobPath = $('#blob-path');
        _sd.hamburger = $('.hamburger');
        _sd.height = window.innerHeight;
        _sd.x= 0;
        _sd.y= $(window).height() / 2;
        _sd.curveX = 10;
        _sd.curveY = 0;
        _sd.targetX = 0;
        _sd.xitteration = 0;
        _sd.yitteration = 0;
        _sd.menuExpanded = false;
        _sd.hoverZone = 150;
        _sd.expandAmount = 20;

    }

    //실행
    function _initEvent() {
        startWindow();
    }

function startWindow() {
    $(window).load(function(){

        $(this).on('mousemove', function(e){
            _sd.x = e.pageX;

            _sd.y = e.pageY;
        });

        $('.hamburger, .menu-inner').on('mouseenter', function(){
            $(this).parent().addClass('expanded');
            _sd.menuExpanded = true;
        });

        $('.menu-inner').on('mouseleave', function(){
            _sd.menuExpanded = false;
            $(this).parent().removeClass('expanded');
        });

        function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
        }


        function svgCurve() {
            if ((_sd.curveX > _sd.x-1) && (_sd.curveX < _sd.x+1)) {
                _sd.xitteration = 0;
            } else {
                if (_sd.menuExpanded) {
                    _sd.targetX = 0;
                } else {
                    _sd.xitteration = 0;
                    if (_sd.x > _sd.hoverZone) {
                        _sd.targetX = 0;
                    } else {
                        _sd.targetX = -(((60+_sd.expandAmount)/100)*(_sd.x-_sd.hoverZone));
                    }
                }
                _sd.xitteration++;
            }

            if ((_sd.curveY > _sd.y-1) && (_sd.curveY < _sd.y+1)) {
                _sd.yitteration = 0;
            } else {
                _sd.yitteration = 0;
                _sd.yitteration++;
            }

            _sd.curveX = easeOutExpo(_sd.xitteration, _sd.curveX, _sd.targetX-_sd.curveX, 100);
            _sd.curveY = easeOutExpo(_sd.yitteration, _sd.curveY, _sd.y-_sd.curveY, 100);

            _sd.anchorDistance = 200;
            _sd.curviness = _sd.anchorDistance - 40;

            _sd.newCurve2 = "M60,"+_sd.height+"H0V0h60v"+(_sd.curveY-_sd.anchorDistance)+"c0,"+_sd.curviness+","+_sd.curveX+","+_sd.curviness+","+_sd.curveX+","+_sd.anchorDistance+"S60,"+(_sd.curveY)+",60,"+(_sd.curveY+(_sd.anchorDistance*2))+"V"+_sd.height+"z";

            _sd.blobPath.attr('d', _sd.newCurve2);

            _sd.blob.width(_sd.curveX+60);

            _sd.hamburger.css('transform', 'translate('+_sd.curveX+'px, '+_sd.curveY+'px)');

            $('h2').css('transform', 'translateY('+_sd.curveY+'px)');
            window.requestAnimationFrame(svgCurve);
        }

        window.requestAnimationFrame(svgCurve);

    });

}

}(jQuery));

