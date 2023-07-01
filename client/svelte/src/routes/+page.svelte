<script lang="ts">
  import { writable } from "svelte/store";
  const connected = writable(false)
  const msgText = writable('')
  const msgDialogText = writable('')
  let socket: WebSocket
  const receivedMsgs = writable(new Array<any>)

  function get_socket(): WebSocket {
    return new WebSocket('ws://localhost:9001')
  }
  function connect(_: Event) {
    if($connected) {
      socket.close()
      $msgDialogText = ''
      $connected = false
      return
    }
    socket = get_socket()
    socket.addEventListener('open', (event) => {
      $connected = true
    })
    socket.addEventListener('error', () => {
      $connected = false
    })
    socket.addEventListener('message', msg => {
      update_msgBox(msg)
    })
    console.log(socket)
  }
  function sendMsg() {
    socket.send($msgText)
  }
  function update_msgBox(msg: MessageEvent) {
    const msgData = msg.data as Blob
    $msgDialogText += msgData.toString() + "</br>"
  }
</script>

<h1>WebSocket Test</h1>
<button on:click={connect}>{$connected ? "Disconnect" : "Connect"}</button>
{#if $connected}
  <div class="chat">
    <div class="msgs">
      {@html $msgDialogText}
    </div>
    <div class="input">
      <input type="text" bind:value={$msgText}/>
      <button on:click={sendMsg} disabled={$msgText.length === 0}>Send</button>
    </div>
  </div>
{/if}

<style>
  input {
    width: 100%;
    border-radius: 5pt;
  }
  div {
    padding: 0;
    margin: 0;
  }
  div.chat {
    width: 300pt;
    height: 200pt;
    display: flex;
    flex-direction: column;
  }
  div.msgs {
    border-radius: 5pt;
    border-width: 2pt;
    border-style: solid;
    height: 100%;
    overflow-y: scroll;
  }
  div.input {
    display: flex;
  }
</style>