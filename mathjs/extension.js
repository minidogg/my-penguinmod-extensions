
class MathJS {
    getInfo() {
      return {
        id: 'mathjs',
        name: 'Math.JS',
        color1:"#cf0700",
        color2:"#a30500",
        color3:"#400200",

        blocks: [
          {
            opcode: 'evall',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Evaluate math expression: [exp]',
            arguments: {
                exp: {
                  type: Scratch.ArgumentType.STRING
                },
            }
          }
        ]
      };
    }
  
    evall(args) {
      return math.evaluate(args.exp);
    }
  }
  
  Scratch.extensions.register(new MathJS());