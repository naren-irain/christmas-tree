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

        hideDialog.staggerFromTo([bubble1, bubble2, mainBubble], 0.4, {opacity: 1, scale: 1}, {opacity: 0, scale: 0}, 0.1)
            .fromTo(dialogText, 0.3, {opacity: 1}, {opacity: 0})

        console.log('in');

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

        /*home_dialog2.on('start', function(){
            var scene = new ScrollMagic.Scene()
            .setTween(carTween)
            .addTo(christmasStory.controller);
        }).addTo(christmasStory.controller);*/


        var home_donald   = christmasStory.walkDonald('#walkingTop', 'homeDonald', 38, 16);
        var homeCar = document.querySelector('.home .car'), carTween;
        var hide_home_dialog2 = christmasStory.hideDialog('#dialog_2', '#donaldTop');
        var scene = new ScrollMagic.Scene()
            .setTween(carTween)
            .addTo(christmasStory.controller);
        /*var donaldLeaving = new TimelineMax();
        donaldLeaving.to($('#homeDonald'), 0.3, { opacity: 0 })
                    .to($('.home .donaldDriving'), 0.3, { opacity: 1 })
                    .to(homeCar, 3, { x: vwUnit(-60) });*/

        home_donald.on('start', function(){
            hide_home_dialog2.addTo(christmasStory.controller);
        }).on('end', function(event){
            //donaldLeaving.addTo(christmasStory.controller);
        }).addTo(christmasStory.controller);

        // Display car running
        var scene = new ScrollMagic.Scene({triggerElement: '#carTop', duration: vwUnit(60)})
            .setTween(carTween)
            .addTo(christmasStory.controller);

        christmasStory.controller.addScene([stickBgOnKids, stickGraphicOnKids, stickBgOnCar, stickGraphicOnCar]);
    }

};

window.vwUnit = function(percent) {
    return (window.innerWidth/100) * percent;
};
window.onResize = function() {
    christmasStory.controller.update(true);
};

$(document).ready(function(){
    christmasStory.init();
});
