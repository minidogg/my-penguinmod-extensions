class BrainFuckInterperter{
    constructor(){
        this.contexts = {
            /*
                main:{
                    memoryPointer:0,
                    memory:[0]
                }
            */
        }
    }
    getInfo() {
      return {
        id: 'brainfuckinterperter',
        name: 'BrainFuck Intepreter',
        blocks: [
            {
                blockType: Scratch.BlockType.LABEL,
                text: "Context Management"
              },
          {
            opcode: 'createContext',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Create context named: [name]',
            arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:"main"
                }
              }
          },
          {
            opcode: 'getContext',
            blockType: Scratch.BlockType.REPORTER,
            text: `Get data from context named: [name]`,
            arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:"main"
                }
              }
          },
          {
            opcode: 'deleteContext',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Delete context named: [name]',
            arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:"main"
                }
              }
          },
          {
            opcode: 'deleteAllContext',
            blockType: Scratch.BlockType.COMMAND,
            text: `Delete all contexts`,
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: "Code Execution"
          },
          {
            opcode: 'runCodeReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'In context: [name] run [code]',
            arguments: {
                name: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:"main"
                },
                code: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue:">>+"
                }
              }
          },
        ]
      };
    }
  
    createContext(args) {
        this.contexts[args.name] = {
            memoryPointer:0,
            memory:[0]
        }
    }
    getContext(args){
        return JSON.stringify(this.contexts[args.name])
    }

    deleteContext(args) {
        delete this.contexts[args.name]
    }
    deleteAllContext(args) {
        this.contexts = {}
    }

    bf(code, data, input) {
        let result = ""
        let memory = data.memory
        let loc = data.memoryPointer
        let throwErr = (err, i) => {
          return ["Error: " + err + ` (Char:${i}, MemoryLocation:${loc})`, {
            memoryPointer: loc,
            memory: memory
          }]
        }
        for (let i = 0; i < code.length; i++) {
          switch (code[i]) {
            case ("+"):
              memory[loc]++
              break;
            case ("-"):
              memory[loc]--
              break;
            case (">"):
              loc++
              if (memory[loc] == undefined) memory.push(0)
              break;
            case ("<"):
              loc--
              if (memory[loc] == undefined) {
                loc++
                return throwErr(`Memory location can't go negative!`, i)
              }
              break;
            case ("["):
              if (memory[loc] == 0) {
                while (true) {
                  if (code.length < i || code[i] == "]") break
                  i++
                }
              }
              break;
            case ("]"):
              if (memory[loc] != 0) {
                while (true) {
                  if (code.length < i || code[i] == "[") break
                  i--
                }
              }
              break;
            case ("."):
              result += String.fromCharCode(memory[loc])
              break;
            case (" "):
              break;
            case (","):
              memory[loc] = input.charCodeAt(0)
              break;
            default:
              return throwErr(`Invalid command: ${code[i]}`, i)
          }
        }
        return [result, {
          memoryPointer: loc,
          memory: memory
        }]
      }


  }
  
  Scratch.extensions.register(new BrainFuckInterperter());