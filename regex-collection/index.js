class regexCollection {
    constructor(){
        this.basic = [
            ["Valid password (Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:)","/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/"],
            ["Email (Allows executing and testing)","/^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\.([a-z\\.]{2,6})$/"]
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
            blockType: Scratch.BlockType.LABEL,
            text: "Blocks for using RegExp"
          },
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
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Test regex: [regex] on string: [string]',
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
            blockType: Scratch.BlockType.LABEL,
            text: "Basic RegExp collection"
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
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Template RegExp Builders"
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "RegExp Building Blocks"
          },
          {
            opcode: 'join',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Join [a] [b] [c] [e] [f] [g]',
            arguments: {
                a: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue:"/"
                },
                b: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:""
                },
                c: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:""
                },
                d: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:""
                },
                e: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:""
                },
                f: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:""
                },
                g: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue:"/gi"
                },
                

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

      getCaptureGroup(args){
        
      }

      basicRegex(args){
        return args.regex
      }

      join(args){
        let result = ""
        Object.keys(args).forEach((e)=>{
          result += (args[e]!=undefined?args[e]:"")
        })
        return result
      }


  }
  
  Scratch.extensions.register(new regexCollection());
