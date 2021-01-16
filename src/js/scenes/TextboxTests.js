class TextboxTests extends Phaser.Scene {
    constructor() {
        super("tests");
    }

    preload() {
        console.log("LOADING");

        this.load.html('nameform', '././nickform.html');
    }

    create() {
        var text = this.add.text(300, 10, 'Please enter your name', { color: 'white', fontSize: '20px'});
        
        var element = this.add.dom(400, 0).createFromCache('nameform');

        
        console.log(element.getChildByName('nameField'));
        

        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'playButton') {
                var inputText = this.getChildByName('nameField');

                //  Have they entered anything?
                if (inputText.value !== '') {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Hide the login element
                    this.setVisible(false);

                    

                    //  Populate the text with whatever they typed in
                    text.setText('Welcome ' + inputText.value);

                    // Si te lo quieres cargar
                    //this.destroy();
                }
                else {
                    //  Flash the prompt
                    this.scene.tweens.add({
                        targets: text,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                    });
                }
            }

        });

        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });
    
    }
    
}