var smAnimate = {
    scenePin: function(triggerElement, duration, pinElement)
    {
        var scenePin = new ScrollMagic.Scene({
            triggerElement: triggerElement,
            duration: duration
        })
        .setPin(pinElement);
        return scenePin;
    },

    sceneDialog: function(triggerElement, dialogElement)
    {
        // Tween
        var dialog = document.querySelector(dialogElement),
            showDialog = new TimelineMax();
        var bubble1 = dialog.querySelector('i + i'), bubble2 = dialog.querySelector('p + i'), mainBubble = dialog.querySelector('p'), dialogText = dialog.querySelector('span');

        showDialog.staggerFromTo([bubble1, bubble2, mainBubble], 0.4, {opacity: 0, scale: 0}, {opacity: 1, scale: 1}, 0.1)
            .fromTo(dialogText, 0.3, {opacity: 0}, {opacity: 1})

        var sceneDialog = new ScrollMagic.Scene({
            triggerElement: triggerElement
        })
        .setTween(showDialog);
        return sceneDialog;
    },

    walkDonald: function(triggerElement, donaldElement)
    {
        // create Tween
        var donaldElement = document.getElementById(donaldElement).firstElementChild;
        var tween = TweenMax.to(donaldElement, 3.2, {
            backgroundPosition: "100% 0",
            ease: SteppedEase.config(15),
            x: 600,
            y: 300
        });

        // build scene
        var scene = new ScrollMagic.Scene({triggerElement: triggerElement, duration: 600})
            .triggerHook("onLeave")
            .setTween(tween);

        return scene;
    }
};

$(document).ready(function(){

    //jQuery.scrollSpeed(80, 800);

    var controller = new ScrollMagic.Controller({
        triggerHook: 0.8
    });

    var homeBgScene     = smAnimate.scenePin('#kidsTop', '80%', '#storyBlk');
    var storyBlkScene   = smAnimate.scenePin('#kidsTop', '80%', '#homeBg');

    var home_dialog1   = smAnimate.sceneDialog('#kidsTop', '#dialog_1');
    home_dialog1.addTo(controller);

    var home_dialog2   = smAnimate.sceneDialog('#donaldTop', '#dialog_2');
    home_dialog2.on('start', function(){
        TweenMax.to('#dialog_2', 0.3, {
            opacity: 1
        });
    }).addTo(controller);

    var home_donald   = smAnimate.walkDonald('#donaldTop', 'homeDonald');
    home_donald.on('start', function(){
        TweenMax.to('#dialog_2', 0.3, {
            opacity: 0
        });
    }).addTo(controller);

    controller.addScene([homeBgScene, storyBlkScene]);

});
