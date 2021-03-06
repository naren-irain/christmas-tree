// Initiate scrollAnimate Object
var christmasStory = {

    controller: null,
    currentScene: null,
    prevScene: null,
    nextScene: null,

    init: function()
    {
        christmasStory.controller = new ScrollMagic.Controller({
            triggerHook: 0.8
        });
        christmasStory.runAnimationScene1();
        christmasStory.runAnimationScene2();

        console.info('Grass width - scene 2: ' + $('.cityRoad .bg-grass').width() );
        $('.cityRoad .innerBlk').width( $('.cityRoad .bg-grass').width() + 'px' );
    },

    pinElement: function(targetElement, triggerElement, duration)
    {
        var scene = new ScrollMagic.Scene({
            triggerElement: triggerElement,
            duration: vwUnit(duration)
        })
        .setPin(targetElement);
        return scene;
    },

    showDialog: function(dialogElement, triggerElement, newoffset = 45)
    {
        // Create Dialog Tween
        var dialog = document.querySelector(dialogElement),
            showDialog = new TimelineMax(),
            hideDialog = new TimelineMax();
        var bubble1 = dialog.querySelector('i + i'), bubble2 = dialog.querySelector('p + i'), mainBubble = dialog.querySelector('p'), dialogText = dialog.querySelector('span');

        showDialog.staggerFromTo([bubble1, bubble2, mainBubble], 0.4, {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, 0.1)
            .fromTo(dialogText, 0.3, {opacity: 0}, {opacity: 1});

        hideDialog.staggerTo([bubble1, bubble2, mainBubble], 0.4, {opacity: 0, scale: 0}, 0.1)
            .to(dialogText, 0.3, {opacity: 0});

		console.log('ab e');
		$('window').scroll(function(e){
			e.preventDefault();
			console.log('e');
		});
		setTimeout(function(){
			$('body').off("mousewheel touchmove");
		}, 4000);

        // Display Dialog
        var show_scene = new ScrollMagic.Scene({
            triggerElement: triggerElement
        })
        .setTween(showDialog);

        var hide_scene = new ScrollMagic.Scene({
            offset: vwUnit(newoffset),
            triggerElement: triggerElement
        })
        .setTween(hideDialog);

        return [show_scene, hide_scene];
    },

    walkDonald: function(donaldElement, triggerElement, xVal, yVal)
    {
        // create Tween
        var donaldElement = document.getElementById(donaldElement).firstElementChild;
        var tween = TweenMax.to(donaldElement, 3.2, {
            backgroundPosition: "100% 0",
            ease: SteppedEase.config(15),
            x: vwUnit(xVal),
            y: vwUnit(yVal)
        });

        // Display walking Donald
        var scene = new ScrollMagic.Scene({triggerElement: triggerElement, duration: vwUnit(xVal)})
            .triggerHook("onLeave")
            .setTween(tween);

        return scene;
    },

    runAnimationScene1: function()
    {
        var stickBgOnKids         = christmasStory.pinElement('#storyBlk', '#kidsTop', 50);
        var stickGraphicOnKids    = christmasStory.pinElement('#homeBg', '#kidsTop', 50);
        var stickBgOnCar          = christmasStory.pinElement('#storyBlk', '#carTop', 50);
        var stickGraphicOnCar     = christmasStory.pinElement('#homeBg', '#carTop', 50);

        var home_dialog1   = christmasStory.showDialog('#dialog_1', '#kidsTop'),
            home_dialog2   = christmasStory.showDialog('#dialog_2', '#donaldTop');

        christmasStory.controller.addScene(home_dialog1);
        christmasStory.controller.addScene(home_dialog2);

        var home_donald   = christmasStory.walkDonald('homeDonald', '#walkingTop', 38, 16),
            homeCar = document.querySelector('.home .car');


        home_donald.on('end', function(event){
            var donaldLeavingTween = new TimelineMax();
            donaldLeavingTween.fromTo($('#homeDonald'), .1, {opacity: 1}, { opacity: 0 }, 0)
                        .to($('.home .donaldDriving'), .1, { opacity: 1 })
                        .to(homeCar, 4, { x: vwUnit(-96) });

            var donaldLeavingScene = new ScrollMagic.Scene({triggerElement: '#carTop', triggerHook: 0, duration: vwUnit(75)})
                                    .setTween(donaldLeavingTween)
                                    .addTo(christmasStory.controller);
        }).addTo(christmasStory.controller);

        christmasStory.controller.addScene([stickBgOnKids, stickGraphicOnKids, stickBgOnCar, stickGraphicOnCar]);
    },

    runAnimationScene2: function()
    {

        var cc_dialog1   = christmasStory.showDialog('#cc_dialog1', '#cc_dialog1_top'),
            cc_dialog2   = christmasStory.showDialog('#cc_dialog2', '#cc_dialog2_top'),
            cc_dialog3   = christmasStory.showDialog('#cc_dialog3', '#cc_dialog3_top');

        christmasStory.controller.addScene(cc_dialog1);
        christmasStory.controller.addScene(cc_dialog2);
        christmasStory.controller.addScene(cc_dialog3);

        var cityCarTween = new TimelineMax();
            cityCarTween.to($('.cityRoad .bg-grass'), 2, { x: vwUnit(128), ease: Power2.easeOut }, 0)
                        .to($('.cityRoad .orangeCar'), 2, { x: vwUnit(176), ease: Power2.easeOut }, 0)
                        .to($('.cityRoad .roadBg'), 2, { x: vwUnit(112), ease: Power2.easeOut }, 0)
                        .to($('.cityRoad .buildingsRow'), 2, { x: vwUnit(92), ease: Power2.easeOut }, 0)
                        .to($('.skyWheel, .carouselWheel'), 2, { x: vwUnit(80), ease: Power2.easeOut }, 0)
                        .to($('.airbaloon, .cityRoadContainer .cloud'), 2, { x: vwUnit(68), ease: Power2.easeOut }, 0)
                        .to($('.cityRoad .hills.main, .cityRoad .hills.reversed'), 2, { x: vwUnit(52), ease: Power2.easeOut }, 0)
                        .to($('.cityRoad .donaldCar'), 2, { x: vwUnit(-90), ease: Power2.easeOut }, 0)
                        .to($('.cityRoad .blueCar'), 2, { x: vwUnit(216), ease: Power2.easeOut }, 0)
                        ;

        var scene = new ScrollMagic.Scene({triggerElement: ".cityRoadSpace", triggerHook: 0, duration: vwUnit(266)})
                        .setPin(".cityRoadContainer")
                        .setTween(cityCarTween)
                        .addTo(christmasStory.controller);

    }

};

window.vwUnit = function(percent) {
    return (window.innerWidth/100) * percent;
};
window.onResize = function() {
    christmasStory.controller.update(true);
    $('.cityRoad .innerBlk').width( $('.cityRoad .bg-grass').width() + 'px' );
};

$(document).ready(function(){
    christmasStory.init();
});
