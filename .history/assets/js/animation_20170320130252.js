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

    pinElement: function(triggerElement, duration, targetElement)
    {
        var scene = new ScrollMagic.Scene({
            triggerElement: triggerElement,
            duration: vwUnit(duration)
        })
        .setPin(targetElement);
        return scene;
    },

    showDialog: function(triggerElement, dialogElement)
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

    walkDonald: function(triggerElement, donaldElement, xVal, yVal)
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
        var stickBgOnKids         = christmasStory.pinElement('#kidsTop', 50, '#storyBlk');
        var stickGraphicOnKids    = christmasStory.pinElement('#kidsTop', 50, '#homeBg');
        var stickBgOnCar          = christmasStory.pinElement('#carTop', 50, '#storyBlk');
        var stickGraphicOnCar     = christmasStory.pinElement('#carTop', 50, '#homeBg');

        var home_dialog1   = christmasStory.showDialog('#kidsTop', '#dialog_1');
        home_dialog1.addTo(christmasStory.controller);

        var home_dialog2   = christmasStory.showDialog('#donaldTop', '#dialog_2');
        home_dialog2.on('start', function(){
            TweenMax.to('#dialog_2', 0.3, { opacity: 1 });
        }).addTo(christmasStory.controller);

        var home_donald   = christmasStory.walkDonald('#walkingTop', 'homeDonald', 38, 16);
        var homeCar = document.querySelector('.home .car'), carTween;
        home_donald.on('start', function(){
            TweenMax.to('#dialog_2', 0.3, {opacity: 0});
        }).on('end', function(event){
            console.log('ended');
            TweenMax.to($('#homeDonald'), 0.3, { opacity: 0 });
            TweenMax.to($('.home .donaldDriving'), 0.3, { opacity: 1 });
            carTween = TweenMax.to(homeCar, 3, {
                x: vwUnit(-60)
            });
        }).addTo(christmasStory.controller);

        // Display Car running
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
