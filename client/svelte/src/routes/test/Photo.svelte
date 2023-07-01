<script lang='ts'>
  import { onMount } from "svelte";
  import type { Photo } from "./Files";
  
  export let file: Photo
  let loading = "yellow"
  let dataStr: string = ""

  file.bytes.then((data => {
    const bytes: Uint8Array = new Uint8Array(data as ArrayBuffer)
    loading = 'green'
    for (let i = 0; i < bytes.byteLength; i++)
      dataStr += bytes[i].toString(16).padStart(2, '0').padEnd(3, ' ')

    console.log(bytes, dataStr)
  }))
</script>

<div class="file-container">
  <div 
    class="photo-file"
    style:border-color={loading}
  >
    <div class="filename">
      {file.name}
    </div>
    <div class="filedata">
      {#if loading === 'green'}
        {dataStr}
      {/if}
    </div>
    <button class="expand-data"></button>
  </div>  
</div>


<style>
  div.photo-file {
    display: grid;
    grid-template-columns: 90% 10%;
    grid-template-rows: 25% 50% 25%;
    width: 150pt;
    height: 50pt;
    border: 2px solid lightblue;
    padding: 5pt;
    margin: 0 5pt 0 5pt;
    overflow-x: hidden;
  }
  div.filename {
    overflow-x: hidden;
    grid-column-start: 1;
    grid-column-end: 3;
    font-size: 10pt;
  }
  div.filedata {
    grid-row-start: 2;
    grid-row-end:3;
  }
  button.expand-data {
    grid-row-start: 3;
    grid-column-start: 2;
  }
</style>
