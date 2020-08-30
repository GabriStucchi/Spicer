class Player{ 

    play(track){
        track.forEach(note => {
            instrumentNoteOn(note)
        });

    }

    stop(){

    }

    loop() {
        
    }

}