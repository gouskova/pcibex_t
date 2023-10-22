//this allows you to refer to PennController classes (e.g., newText, newTrial, etc.) directly without calling their "last name":
PennController.ResetPrefix(null)

//uncomment when ready for primetime:
//DebugOff() 

//this defines the structure of your experiment and allows you to randomize trials:

Sequence("intro", randomize("exp_trial"), "demographics", "done")


// the main experiment block

experiment_function = row=>
	newTrial("exp_trial",
		newText("question", "Which of these looks more like a Martian word?")
		.italic()
		.center()
		.print()
	newButton("word", row.item)
		.center()
		.print()
	,
		newButton("word1", row.alt2)
			.left()
			.print()
			.wait()
	,
		newButton("word2", row.alt1)
			.right()
			.print()
			.wait()
	)
	.log("group", row.group)
	.log("alt1", row.alt1)
	.log("alt2", row.alt2)
	.log("alt1voicing", row.alt1voicing)
	.log("alt2voicing", row.alt2voicing)
	.log("template", row.template)
	.log("voicing", row.voicing)
		

Template("items.txt", experiment_function)

		

// instructions 
newText('intro', 
	defaultText.left().print()
	,
	newText("Hello! <br><br> You will see some words; choose whichever one you like better by clicking its button.<br> Click on the start button to begin the experiment.")
	,
	newButton("ContinueButton", "Continue")
		.center()
		.print()
		.log()
		.wait()
)

// exit questionnnaire
newTrial("demographics",
	defaultText.left().print()
   ,
	newTextInput("Optional: favorite color?", "")
	,
	newButton("ContinueButton", "Continue to the next screen to get your $$$ number")
		.right()
		.print()
		.wait()
	,
	getTextInput("Optional: favorite color?").log() 
	)

//done with the experiment

newTrial("done",
	defaultText
	.center()
	.print()
	,
	newText("Thank you so much!")
	,
	newText("Here's your randomly generated id number")
	)

//
SendResults("send")

    
    
