/* ============= NOTES =============

To use this for an experiment, you should…
	- …edit the consent.html
	- …edit the completion screen to have the right final details (e.g. any URL to validate completion with e.g. Prolific)

Some customized CSS for this experiment has…
	- …made PCIbex better at being mobile-responsive (global_main.css)
	- …customized slider bars (global_main.css)

Other file dependencies…
	- consent.html (the consent form)
	- targetItems.csv (target sentences, with different groups seeing different lists)
	- controlItems.csv (controls used by all participant groups)

*/


// =============
// Custom javascript, for unique participant IDs that get used in linking outside of this Prolific experiment
// =============
// for creating a unique code for the participant, based on the number of ms since Dec 1 2022, 0:00 at the time this is loaded up
var ts = String(new Date().getTime() - 1669852800000), i = 0, out = '';
for (i = 0; i < ts.length; i +=4) {out += Number(ts.substr(i, 4)).toString(36);}
var uniqueCode = out;

// js functions for popups from https://codepen.io/chabzz/pen/mVYVpY
var showPopup1 = function() {document.getElementById("popup1").style.display ='block';}
var hidePopup1 = function() {document.getElementById("popup1").style.display ='none';}

// html for the popup that shows the unique code
var popupHTML = "<div style='display: none; position: fixed; padding: 0vmin; width: 84vmin; left: 50%; margin-left: -42vmin; height: 56vmin; top: 50%; margin-top: -28vmin; background: #FFF; z-index: 20; -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5); box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);' id='popup1'><div style='text-align: center; width:80vmin; padding: 2vmin; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);'><p>Please click <a href='««ADD LINK»»' target='_blank'>««HERE»»</a>. When asked for a unique ID code, please input <span style='font-size: larger; font-weight: bold;'>"+uniqueCode+"</span>.</p><p><a href='#' onclick='hidePopup1()'>(close this pop-up)</a></p></div></div>"



// =============
// Preamble
// =============
// Remove command prefix:
PennController.ResetPrefix(null)

// Turn off debugger
DebugOff()

// for getting Prolific id from the URL and log it to the results file
Header().log("PROLIFIC_PID", GetURLParameter("PROLIFIC_PID"));
// for logging the uniqueCode to the results file
Header().log("UNIQUE_ID", uniqueCode);

// set the Sequence, depending on whether the participant has come from Prolific (i.e. with PROLIFIC_PID defined as a URL paramter)
if (GetURLParameter("PROLIFIC_PID") == null){	
	Sequence("instructions", "consent", "demo1", "demo2", randomize("experimental-trial"), "freeform", "send", "completion_screen")
} else {
	Sequence("instructions", "consent", "demo1", "demo2", randomize("experimental-trial"), "freeform", "send", "completion_screen_Prolific")
}



// =============
// Instructions
// =============

newTrial("instructions",
	defaultText
		.left()
		.print()
	,
	newText("This questionnaire ««ADD DESCRIPTION»», and should take around <b>««TIME ESTIMATE»»</b> to complete.")
	,
	newText("<h3>Your task is to <u>rate how natural these sentences sound</u>, using a slider bar.</h3><ul><li>When rating these sentences, <b>use your intuition</b> of whether it feels natural.</li><li>You can do so even for sentences that <b>might not</b> be something you would say yourself, in your normal speech.</li></ul>")
	,
	newText("<p>Before continuing on to the survey, the next page will ask you to provide your consent.</p>")
	,
	newButton("ContinueButton", "Continue")
		.right()
		.print()
		.log()
		.wait()
)



// =============
// Consent form
// =============

newTrial("consent",
	newText("prompt", "<b>Read the following consent form</b>; in order to continue, agree to the terms and click \'continue\'.")
		.cssContainer({"font-size":"14pt", "color": "red"})
		.center()
		.print()
	,
	newHtml("consent_form", "consent.html")
		.cssContainer({"width":"100%"})
		.checkboxWarning("You must consent before continuing.")
		.print()
	,
	newButton("ContinueButton", "Continue")
		.center()
		.print()
		.wait(getHtml("consent_form").test.complete()
				  .failure(getHtml("consent_form").warn())
		)
)



// =============
// Demos
// =============

newTrial("demo1",
	newVar("name", "demo")
		.log()
	,
	newText("example", "<p><u>EXAMPLE QUESTION</u>: Start by reading the sentence in the gray box <b>carefully</b>.<br/><br/>Next, indicate how natural the sentences sound by moving the slider bar below the sentence, where the lower end represents \'<span style='color:rgb(255, 30, 30); font-weight:bold;'>very unnatural</span>\', the center represents \'<span style='font-weight:bold;'>neutral</span>\', the higher end represents \'<span style='color:rgb(0, 105, 255); font-weight:bold;'>very natural</span>\'.<br/><br/>You will probably feel that this one is <u>rather unnatural</u> — even though you can probably guess what the speaker means, it feels strange.<br/>To signal this rating, move the slider towards the very bottom.</p>")
		.left()
		.print()
	,
	newText("question", "How natural or unnatural does this sentence sound?")
		.italic()
		.center()
		.print()
	,
	newText("sentence", "I think that that that is nice.")
		.center()
		.settings.cssContainer({
				"anchor": "top",
				"background-color": "lightgrey",
				"border-radius": "5px",
				"margin-top": ".5em",
				"margin-bottom": "1em",
				"align": "center",
				"padding": "5px",
				})
		.print()
	,
	newScale("MainSliderV",   100)
		.size("30vh", "30vh")
		.center()
		.slider()
		.log()
	,
	newCanvas("sliderCanvas", "20em", "32vh")
		.add("center at 50%", 0, getScale("MainSliderV"))
		.add("left at 55%", "middle at 0vh", newText("<span style=\"color:rgb(0, 105, 255)\">very natural</span>"))
		.add("left at 55%", "middle at 15vh", newText("neutral"))
		.add("left at 55%", "middle at 30vh", newText("<span style=\"color:rgb(255, 30, 30)\">very unnatural</span>"))
		.center()
		.print()
	,
	newText("<p>When you click the \'continue\' button below, your answer will be saved and the question will disappear.</p>")
		.center()
		.print()
	,
	newButton("ContinueButton", "Continue")
		.center()
		.print()
		.wait(getScale("MainSliderV").test.selected())
)

newTrial("demo2",
	newVar("name", "demo")
		.log()
	,
	newText("example", "<p><u>EXAMPLE QUESTION</u>: Start by reading the sentence in the gray box <b>carefully</b>.<br/><br/>Next, indicate how natural the sentences sound by moving the slider bar below the sentence, where the lower end represents \'<span style='color:rgb(255, 30, 30); font-weight:bold;'>very unnatural</span>\', the center represents \'<span style='font-weight:bold;'>neutral</span>\', the higher end represents \'<span style='color:rgb(0, 105, 255); font-weight:bold;'>very natural</span>\'.<br/><br/>You will probably feel that this one is <u>rather natural</u> — the words and their order are unremarkable.<br/>To signal this rating, move the slider towards the very top.</p>")
		.left()
		.print()
	,
	newText("question", "How natural or unnatural does this sentence sound?")
		.italic()
		.center()
		.print()
	,
	newText("sentence", "I know whether that is allowed.")
		.center()
		.settings.cssContainer({
				"anchor": "top",
				"background-color": "lightgrey",
				"border-radius": "5px",
				"margin-top": ".5em",
				"margin-bottom": "1em",
				"align": "center",
				"padding": "5px",
				})
		.print()
	,
	newScale("MainSliderV",   100)
		.size("30vh", "30vh")
		.center()
		.slider()
		.log()
	,
	newCanvas("sliderCanvas", "20em", "32vh")
		.add("center at 50%", 0, getScale("MainSliderV"))
		.add("left at 55%", "middle at 0vh", newText("<span style=\"color:rgb(0, 105, 255)\">very natural</span>"))
		.add("left at 55%", "middle at 15vh", newText("neutral"))
		.add("left at 55%", "middle at 30vh", newText("<span style=\"color:rgb(255, 30, 30)\">very unnatural</span>"))
		.center()
		.print()
	,
	newText("<p>When you click the \'continue\' button below, your answer will be saved and the question will disappear.</p>")
		.center()
		.print()
	,
	newButton("ContinueButton", "Continue")
		.center()
		.print()
		.wait(getScale("MainSliderV").test.selected())
)



// =============
// Rating Task
// =============

// first we define a function that serves as a template to build each trial (all of which are a newTrial called "experimental-trial"):
function_for_template = row => 
	newTrial("experimental-trial",
		newText("question", "How natural or unnatural does this sentence sound?")
			.italic()
			.center()
			.print()
		,
		newText("sentence", row.sentence)
			.settings.css({
				"font-size": "125%",
				"margin": "auto",
				"width": "100%"
				})
			.settings.cssContainer({
				"anchor": "top",
				"background-color": "lightgrey",
				"border-radius": "5px",
				"margin-top": ".5em",
				"margin-bottom": "1em",
				"align": "center",
				"padding": "5px",
				})
			.center()
			.print()
		,
		newScale("MainSliderV",   100)
			.size("30vh", "30vh")
			.center()
			.slider()
			.log()
		,
		newCanvas("sliderCanvas", "20em", "32vh")
			.add("center at 50%", 0, getScale("MainSliderV"))
		.add("left at 55%", "middle at 0vh", newText("<span style=\"color:rgb(0, 105, 255)\">very natural</span>"))
		.add("left at 55%", "middle at 15vh", newText("neutral"))
		.add("left at 55%", "middle at 30vh", newText("<span style=\"color:rgb(255, 30, 30)\">very unnatural</span>"))			.center()
			.print()
		,
		newButton("ContinueButton", "Continue")
			.center()
			.print()
			.wait(getScale("MainSliderV").test.selected())
	)
	.log("group", row.group)
	.log("itemsetNum", row.itemsetNum)
	.log("conditionA", row.conditionA)
	.log("conditionB", row.conditionB)
	.log("sentence", row.sentence)

// then we pass this function defined above as the 2nd argument to the PCIbex Template function
Template("targetItems.csv", function_for_template)
Template("controlItems.csv", function_for_template)
// NOTE that having multiple of these Template functions in a row, plus randomize("experimental-trial") in the Sequence, will *INTERMINGLE* the rows from targetItems.csv and rows from controlItems.csv


newTrial("freeform",
	newText("almostdone", "<h3>Great work! You've finished the task.</h3>")
	,
	newText("freeResponsePrompt", "<p><b><i>Optional:</i></b> Do you have any additional information you'd like to share, or any comments on this task? Feel free to share your thoughts on <u>anything</u>. (<i>Leave blank if you have no comments!</i>)</p>")
		.print()
	,
	newTextInput("freeResponse", "")
		.settings.cssContainer({
			"margin-left": "1em"
			})
		.lines(0)
		.size("80vw", "12em")
		.print()
	,
	newButton("ContinueButton", "Complete the Task")
		.center()
		.print()
		.wait()
	,
	getTextInput("freeResponse").log()
)


// =============
// Send results
// =============

SendResults("send")



// =============
// Completion Screen
// =============

// This is the completion screen for participants who don't have a Prolific ID
newTrial("completion_screen",
	newText("thanks", "<h2 style='text-align: center;padding: 10px; margin: 0px;'>Thank you for completing our survey!</h2>")
		.center()
		.print()
	,
	newText("Your responses have been logged.<br/><br/><br/>")
		.center()
		.print()
	,
	newText("<h3 style='text-align: center;padding: 10px; margin: 0px;'>Are you willing to complete <u>an additional (10min) survey</u> about yourself?</h3>")
		.center()
		.print()
	,
	newVar("popupCode", "asdf")
	,
	getVar("popupCode")
		.set( v => popupHTML ) // sets a PCIbex variable to be the value of a javascript variable
	,
	newText("thePopup", "")
		.center()
		.text( getVar("popupCode")) // inserts the code for the popup defined in the file's header (as popupHTML)
		.print()
	,
	newText("If so, <a href='#' onclick='showPopup1()'>please click here</a>.")
		.center()
		.print()
	,
	newButton("void")
	   .wait()
)

// This is the completion screen for participants who DO have a Prolific ID
newTrial("completion_screen_Prolific",
	newText("thanks", "Thank you for completing our survey!")
		.center()
		.print()
	,
	newText("Your responses have been logged.<br/><br/><br/>")
		.center()
		.print()
	,
	newText("<h3 style='text-align: center;padding: 10px; margin: 0px;'>To confirm your participation…</h3>")
		.center()
		.print()
	,
	// UPDATE THIS newText below with the CORRECT COMPLETION URL
	newText("…you <b>must</b> <a href='««COMPLETION URL»»' target='_blank'>click here to confirm your participation.</a><p>(<i>This is a <b>necessary step</b> in order for you to receive participation credit!</i>)</p>")
		.center()
		.print()
	,
	newButton("void")
	   .wait()
)