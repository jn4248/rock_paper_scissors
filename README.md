# rock_paper_scissors
Simple game to play Rock Paper Scissors, using HTML and JavaScript.

The game runs in the console window of developer tools, for any browser.  

Includes a javascript operable button in the html to initiate the game.  Once initiated, the user prompts will appear over the html (to play, continue, or to choose your hand), but the game status updates (scores, etc..) will will only be visible if the console window is open.

The game considers whether the user "cancels" during the prompts, terminating either the match or the entire game, as appropriate.  

The match is decide once either the player or the computer has a number of wins necessry to be the majority of the number of rounds.  (ie: if the match is set for 5 rounds, and the player is winning 3 games to 0, then the fourth and fifth rounds will not be played).

The main game() takes a parameter to set the number of rounds in each match.  Default is currently set to 5.  This is not yet available to be changed by the user/player.
