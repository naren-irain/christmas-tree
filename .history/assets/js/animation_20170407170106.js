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

    showDialog: function(dialogElement, triggerElement)
    {
        // Create Dialog Tween
        var dialog = document.querySelector(dialogElement),
            showDialog = new TimelineMax();
        var bubble1 = dialog.querySelector('i + i'), bubble2 = dialog.querySelector('p + i'), mainBubble = dialog.querySelector('p'), dialogText = dialog.querySelector('span');

        showDialog.staggerFromTo([bubble1, bubble2, mainBubble], 0.4, {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, 0.1)
            .fromTo(dialogText, 0.3, {opacity: 0}, {opacity: 1})

        // Display Dialog
        var scene = new ScrollMagic.Scene({
            triggerElement: triggerElement
        })
        .setTween(showDialog);
        return scene;
    },

    hideDialog: function(dialogElement, triggerElement)
    {
        // Create Dialog Tween
        var dialog = document.querySelector(dialogElement),
            hideDialog = new TimelineMax();
        var bubble1 = dialog.querySelector('i + i'), bubble2 = dialog.querySelector('p + i'), mainBubble = dialog.querySelector('p'), dialogText = dialog.querySelector('span');

        hideDialog.staggerTo([bubble1, bubble2, mainBubble], 0.4, {opacity: 0, scale: 0}, 0.1)
            .to(dialogText, 0.3, {opacity: 0})

        // Display Dialog
        var scene = new ScrollMagic.Scene({
            triggerElement: triggerElement,
            triggerHook: 0
        }).setTween(hideDialog);
        return scene;
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

        var home_dialog1   = christmasStory.showDialog('#dialog_1', '#kidsTop');
        home_dialog1.addTo(christmasStory.controller);

        var home_dialog2   = christmasStory.showDialog('#dialog_2', '#donaldTop');
        home_dialog2.addTo(christmasStory.controller);

        var home_donald   = christmasStory.walkDonald('homeDonald', '#walkingTop', 38, 16),
            homeCar = document.querySelector('.home .car');
        

        home_donald.on('start', function(){
            var hide_home_dialog2 = christmasStory.hideDialog('#dialog_2', '#donaldTop');
            hide_home_dialog2.addTo(christmasStory.controller);
        }).on('end', function(event){
            var donaldLeavingTween = new TimelineMax();
            donaldLeavingTween.to($('#homeDonald'), 0.3, { opacity: 0 })
                        .to($('.home .donaldDriving'), 0.3, { opacity: 1 })
                        .to(homeCar, 4, { x: vwUnit(-96) });
        
            var donaldLeavingScene = new ScrollMagic.Scene({triggerElement: '#carTop', triggerHook: 0, duration: vwUnit(75)})
                                    .setTween(donaldLeavingTween)
                                    .addTo(christmasStory.controller); 
        }).addTo(christmasStory.controller);

        christmasStory.controller.addScene([stickBgOnKids, stickGraphicOnKids, stickBgOnCar, stickGraphicOnCar]);
    },

    runAnimationScene2: function()
    {
        var cityCarTween = new TimelineMax();
            cityCarTween.to($('.cityRoad .donaldCar'), 4, { x: vwUnit(-60) });

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
    console.log( $('.cityRoad .bg-grass').width() );
    $('.cityRoad .innerBlk').width( $('.cityRoad .bg-grass').width() + 'px' );
});
