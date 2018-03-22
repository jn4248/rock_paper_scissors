# rock_paper_scissors
Simple game to play Rock Paper Scissors, using HTML and JavaScript.

Main intent was to convert console-only version of the game into one with a functional graphic interface.  While perhaps not always necessary, I forced the use of flexbox, as a matter of practice.  

Features:

* Selection of number of rounds per match.
* Game updates (scores, who wins, etc...) are appended to the gameLog container as the game progresses, and removed upon the start of a new game.
* GameLog container has a maximum size, with a scrolling display of updates, enabling player to always see both the game controls and the most recent update.
* Game winner is decided as a true "best-of", such that all games in a match might not be played, if one player has already won a majority.
* Hidden instruction panel.
