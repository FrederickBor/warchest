# Thinking process

In this document, you can find all my thoughts about deciding on everything related to this project, from why I selected the programming language, through all code decisions, to the display on the terminal.

## Developer Stack

### Programming language
For this, I have selected two main languages as they are the ones in which I have more knowledge: Python and Typescript.

The decision takes into consideration the following points: 
- Project requirements: as an initial version, the project requires to have a CLI application where we can play the game, but for further versions, I would like to extend it to have a GUI where users can see all the information in a better way.
- Language features:
- Learning curve:
- Community and support:
- Developer knowledge:
- Integration:

| Programming language | Project Requirements | Language features  | Learning curve | Community and Support | Developers Knowledge | Integration |
|:------------------|:---:|:---:|:---:|:---:|:---:|:---:|
| Python            | X | X | X | X | - | X |
| TypeScript        | X | X | X | X | X | X |

For all those reasons, the selected language will be Typescript.

### Data storage
All the data will be stored in a JSON file. This is the simplest way to store data and it is easy to read and write. 

This doesn't mean that it cannot be improved, but for the initial version, it is the best option. Then it can be replaced by a database as all of the code will be modular and it won't relay on how are we storing the data.

### Testing

As Typescript was selected as the programming language, I will use Jest as the testing framework.

### Linting

For linting the project I will be using ESLint with ts-standard rules.

