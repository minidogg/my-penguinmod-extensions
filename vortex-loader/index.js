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
    var overlay = document.createElement("div")
    overlay.innerHTML = `<h1 style='color:white;text-align:center'>Loading...</h1>
    <h2 style='color:blue;text-align:center'><a>${args.URL}</a></h2>`
    overlay.style.backgroundColor = "black"
    vm.renderer.addOverlay(overlay)
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


        vm.loadProject(data).then(()=>{
          overlay.remove()
        })

    }else{
        alert(`Hash check for ${args.URL} failed, expected hash: ${args.HASH} returned hash: ${hash} `)
    }
  }
}

Scratch.extensions.register(new VortexLoader());
})();
