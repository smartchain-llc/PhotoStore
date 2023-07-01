<script lang='ts'>
  import { onMount } from "svelte";
  import { selectedFiles, Photo } from "./Files";
  import PhotoDiv from "./Photo.svelte";
  
  const photosInputId = "photos_select"
  
  let photosInputElement: HTMLInputElement

  onMount(()=>{
    photosInputElement = document.getElementById(photosInputId) as HTMLInputElement
    photosInputElement.addEventListener('change', process_photos_selected)
  })

  function process_photos_selected(event: Event) {
    $selectedFiles = new Array(photosInputElement.files!.length)

    for(let index = 0; index < photosInputElement.files!.length; index++)
      $selectedFiles[index] = new Photo(photosInputElement.files![index])
  }
</script>

<form method="post" enctype="multipart/form-data">
  <input type="file" accept="image/*,video/*" multiple id="{photosInputId}" name="{photosInputId}">
</form>
<div>Selected Files: 
</div>
<div class="file-container">
  {#each $selectedFiles as file}
    <PhotoDiv bind:file />
  {/each}
</div>
<style>
    div.file-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>