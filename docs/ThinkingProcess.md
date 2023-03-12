# Thinking process

In this document, you can find all my thoughts about deciding on everything related to this project, from why I selected the programming language, through all code decisions, to the display on the terminal.

## Developer Stack

### Programming language
For this, I have selected two main languages as they are the ones in which I have more knowledge: Python and Typescript.

The decision takes into consideration the following points: 
- Project requirements: as an initial version, the project requires to have a CLI application where we can play the game, but for further versions, I would like to extend it to have a GUI where users can see all the information in a better way.
- Language features: both languages have a lot of features that can be used for this project, but Typescript has a lot of features that can be used for the GUI version.
- Learning curve: both languages have a similar learning curve.
- Community and support: both languages have a lot of support and a big community.
- Developer knowledge: I have more experience with Typescript than with Python.
- Integration: both languages can be integrated with the other technologies that will be used.

| Programming language | Project Requirements | Language features  | Learning curve | Community and Support | Developers Knowledge | Integration |
|:------------------|:---:|:---:|:---:|:---:|:---:|:---:|
| Python            | X | X | X | X | - | X |
| TypeScript        | X | X | X | X | X | X |

For all those reasons, the selected language will be Typescript.

### Data storage
All the data will be stored in a JSON file, which is the simplest way to store data and is easy to read and write. 

This doesn't mean that it cannot be improved, but for the initial version, it is the best option. Then it can be replaced by a database as all of the code will be modular and it won't rely on how we are storing the data.

### Testing

As Typescript was selected as the programming language, I will use Jest as the testing framework.

### Linting

For linting the project I will be using ESLint with ts-standard rules.

As everything that will be used is now specified, we can continue to the following section that indicated my thoughts on the development process.

## Development process

I tried to start developing some classes for the units and the player, but later I realize that it was not a good idea as I couldn't correctly display them (on a board). 

I could continue with those classes, but I felt that it was going to be more difficult than if I stop and started with the board and the cell.

Then, I start creating the classes that are going to be needed for the main project: `Board` and `Cell` as they are the basis to build all the other functionality over them.

The next step is to build the `Game` class where all the game logic and rules will be checked.

On day two, I started to simplify things so I make sure I don't miss any requirements, meaning that I start with a [class diagram](WarchestLiteClassDiagram.pdf) and a [game logic flowchart](WarchestLiteGameLogicFlowchart.pdf).

This was a complicated process as I had to think where to put some values, for example, I had to decide between assigning the units a position on the board or setting the unit on a position on the board. All decisions like that took me some time to process where to store them, but once I did all those things I knew that the complicated part was already done.

After that, things started to be easy to implement as I already had a plan on how to do them.

I started with the Units. For this simplified version of the game, just five units were created:  Berserker, Cavalry, Knight, Mercenary, and of course the Royal. All of them extend from a Unit class that has all the methods that the units need to know.

Then I started with the board and its cells, basically one of the two main elements of this game, as there I was going to store the units played.

Now was time for the Player class to be created, here all the things are stored, for example, it has the current hand for that player, the units on their recruitment zone, and also the implementation of the bag where all the units are and from where they are taken.

After all that work, the game needed to be controlled, so I created the Game class where all the logic was going to be managed. Meaning that this class was going to make some comprobations to ensure the correct functioning of the game.

Finally, now that the logic has been created it was time to add a user interface for the CLI, I used @clack/prompts package to create it and to have a better user experience. 

And lastly, I just create a simple class that uses a JSON file as a database (this can be changed in the future and use a real database). The important part here is that its implementation can be changed as long as the methods maintain their contracts.

