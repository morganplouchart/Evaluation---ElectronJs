/* jQuery easyDrag v1.2 / 12.2017
par Gildas P. / www.gildasp.fr
infos, tuto, dÃŠmos sur http://lab.gildasp.fr/easydrag/ */
(function($){var maxZ=0;$.fn.easyDrag=function(params){if(params=="kill"){this.each(function(){var self=$(this);var handle=self.data('handle');handle.off('mousedown',easyDrag_onMouseDown);handle.off('touchstart',easyDrag_onTouchStart);handle.css('cursor','');self.removeClass('easydrag_enabled')})}else if(params=='killall'){$('.easydrag_enabled').easyDrag('kill');}else{params=$.extend({handle:'.handle',axis:false,container:false,start:function(){},drag:function(){},stop:function(){},cursor:'move',ontop:true,clickable:true},params);this.each(function(){var self=$(this);if(!self.hasClass('easydrag_enabled')){if(params.handle=='this'||self.find(params.handle).length==0){var handle=self}else{var handle=self.find(params.handle)}if(params.cursor!=''){handle.css('cursor',params.cursor)}handle.data(params);var boulet=self;boulet.addClass('easydrag_enabled');boulet.data('handle',handle);handle.data('boulet',boulet);if(self.css('z-index')!='auto'&&params.ontop){maxZ=Math.max(maxZ,self.css('z-index'))};if(self.css('position')!='absolute'&&self.css('position')!='fixed'){if(self.css('left')=='auto'){self.css('left','0')}if(self.css('top')=='auto'){self.css('top','0')}self.css('position','relative')}handle.on('mousedown',easyDrag_onMouseDown);handle.on('touchstart',easyDrag_onTouchStart)}})}return this};var self,t,boulet,initItemX,initItemY,initEventX,initEventY,axis,container,refX,refY;function easyDrag_onMouseDown(event){event.preventDefault();t=Date.now();self=$(this);boulet=self.data('boulet');initItemX=parseInt(boulet.css('left'));initItemY=parseInt(boulet.css('top'));axis=self.data('axis');container=self.data('container');initEventX=event.pageX;initEventY=event.pageY;if(container.length){refX=self.offset().left;refY=self.offset().top}self.data('start').call(boulet);$(document).on('mousemove',easyDrag_onMouseMove);$(document).on('click',easyDrag_onMouseUp);if(self.data('ontop')){maxZ+=1;boulet.css('z-index',maxZ)}}function easyDrag_onMouseMove(e){e.preventDefault();self.data('drag').call(boulet);var nextX=initItemX+e.pageX-initEventX;var nextY=initItemY+e.pageY-initEventY;if(!axis||axis=='x'){boulet.css({'left':nextX+'px'})}if(!axis||axis=='y'){boulet.css({'top':nextY+'px'})}easyDrag_contain()}function easyDrag_onMouseUp(e){$(document).off('mousemove',easyDrag_onMouseMove);$(document).off('click',easyDrag_onMouseUp);self.data('stop').call(boulet);var d=Date.now()-t;if(d>300||!self.data('clickable')){e.preventDefault();e.stopPropagation()}}function easyDrag_onTouchStart(event){event.preventDefault();t=Date.now();self=$(this);boulet=self.data('boulet');initItemX=parseInt(boulet.css('left'));initItemY=parseInt(boulet.css('top'));axis=self.data('axis');container=self.data('container');if(container.length){refX=self.offset().left;refY=self.offset().top}var touch=event.originalEvent.changedTouches[0];initEventX=touch.pageX;initEventY=touch.pageY;self.data('start').call(boulet);$(document).on('touchmove',easyDrag_onTouchMove);$(document).on('click',easyDrag_onTouchEnd);if(self.data('ontop')){maxZ+=1;boulet.css('z-index',maxZ)}}function easyDrag_onTouchMove(e){e.preventDefault();self.data('drag').call(boulet);var touch=e.originalEvent.changedTouches[0];var nextX=initItemX+touch.pageX-initEventX;var nextY=initItemY+touch.pageY-initEventY;if(!axis||axis=='x'){boulet.css({'left':nextX+'px'})}if(!axis||axis=='y'){boulet.css({'top':nextY+'px'})}easyDrag_contain()}function easyDrag_onTouchEnd(e){$(document).off('touchmove',easyDrag_onTouchMove);$(document).off('click',easyDrag_onTouchEnd);self.data('stop').call(boulet);var d=Date.now()-t;if(d>300||!self.data('clickable')){e.preventDefault();e.stopPropagation()}}function easyDrag_contain(){if(container.length){var cur_offset=boulet.offset();var container_offset=container.offset();var limite1=container_offset.left;var limite2=limite1+container.width()-boulet.innerWidth();limite1+=parseInt(boulet.css('margin-left'));if(cur_offset.left<limite1){boulet.offset({left:limite1})}else if(cur_offset.left>limite2){boulet.offset({left:limite2})}var limite1=container_offset.top;var limite2=limite1+container.height()-boulet.innerHeight();limite1+=parseInt(boulet.css('margin-top'));if(cur_offset.top<limite1){boulet.offset({top:limite1})}else if(cur_offset.top>limite2){boulet.offset({top:limite2})}}}})(jQuery);
