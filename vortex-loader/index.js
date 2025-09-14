;(async()=>{
class VortexLoader {
  getInfo() {
    return {
      id: 'vortexloader',
      name: 'Vortex Loader',
      blocks: [
        {
          opcode: 'loadproject',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Load Project from [URL] with sha256 hash [HASH]',
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING
            },
            HASH: {
              type: Scratch.ArgumentType.STRING
            }
          }
        }
      ]
    };
  }

  async loadproject(args) {
    let data = await (await fetch(args.URL)).arrayBuffer()
    async function hashArrayBuffer(buffer, algorithm = 'SHA-256') {
        const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    let hash = await hashArrayBuffer(data)
    if(hash===args.HASH){
        alert("Hash check succeeded!")
        vm.loadProject(data)
    }else{
        alert(`Hash check for ${args.URL} failed, expected hash: ${args.HASH} returned hash: ${hash} `)
    }
  }
}

Scratch.extensions.register(new VortexLoader());
})();
