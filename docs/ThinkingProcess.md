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
### First approach
I tried to start developing some classes for the units and the player, but later I realize that it was not a good idea as I couldn't correctly display them (on a board). 

I could continue with those classes, but I felt that it was going to be more difficult than if I stop and started with the board and the cell.

Then, I start creating the classes that are going to be needed for the main project: `Board` and `Cell` as they are the basis to build all the other functionality over them.

The next step is to build the `Game` class where all the game logic and rules will be checked.

I will also test everything that I have been creating so the coverage of the code keeps up to at least 90%, as I consider that it is a good coverage percentage.
