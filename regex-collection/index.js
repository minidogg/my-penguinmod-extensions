class regexCollection {
    constructor(){
        this.basic = [
            ["Valid password (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:)","/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/"]
        ]

        this.basicRegexConstructed = []
        this.basic.forEach(e => {
            this.basicRegexConstructed.push({
                text: e[0],
                value: e[1]
              })
        });
    }
    getInfo() {
      return {
        id: 'regexCollection',
        name: 'Regex Collection',
        color1:"#00691c",
        color2:"#00611a",
        color3:"#014012",
        blocks: [
          {
            opcode: 'exec',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Execute regex: [regex] on string: [string]',
            arguments: {
                regex: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue:"/(abc)/gi"
                  },
                  string: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue:"__abc__"
                  },
            }
          },
          {
            opcode: 'test',
            blockType: Scratch.BlockType.REPORTER,
            text: 'test regex: [regex] on string: [string]',
            arguments: {
                regex: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:"/abc/gi"
                },
                string: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue:"__abc__"
                },

            },
          },
          {
            opcode: 'basicRegex',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get basic regex [regex]',
            arguments: {
                regex: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'BASIC_REGEX'
                }

            },
          },
          
        ],
        menus: {
            BASIC_REGEX: {
              acceptReporters: true,
              items: this.basicRegexConstructed
            }
          }
      };
    }
  
    exec(args) {
var parts = /\/(.*)\/(.*)/.exec(args.regex);
var restoredRegex = new RegExp(parts[1], parts[2]);

      let result = restoredRegex.exec(args.string)
      return typeof(result)=="object"?JSON.stringify(result):[result]
    }
    test(args) {
        var parts = /\/(.*)\/(.*)/.exec(args.regex);
        var restoredRegex = new RegExp(parts[1], parts[2]);
        

        let result = restoredRegex.test(args.string)
        return result
      }

      basicRegex(args){
        return args.regex
      }
  }
  
  Scratch.extensions.register(new regexCollection());
