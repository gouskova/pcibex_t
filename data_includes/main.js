//this allows you to refer to PennController classes (e.g., newText, newTrial, etc.) directly without calling their "last name":
PennController.ResetPrefix(null)
//uncomment when ready for primetime:
//DebugOff() 

// intro slide 
newText('intro', "Hello! <br><br> You will see some words; choose whichever one you like better by clicking its button.<br> Click on the start button to begin the experiment.")
		.settings.center()
		.print()
		.wait()
;	// semicolons separate definitions of new objects.
// the main experiment block
Template(variable => 
newTrial("testword", variable.item
     ,
     newText("word")
     ,
     getText("word")
    .print()
    .shuffle()
    .log()
    .wait()
)
)
;

// exit questionnnaire
newTrial("demographics", "what is your favorite color?"
    .print()
    .log()
    .wait()
    )
    
    
