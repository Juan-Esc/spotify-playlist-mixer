<script lang="ts">
    import type { PageData } from './$types';
  
    export let data: PageData;
  </script>

<div class="grid h-screen place-items-center">
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Congrats! Your new fair-mixed playlist is now in your library</h2>

            <div class="card-actions justify-end mt-5">
                <a href="/playlists" class="btn btn-success">Go back</a>
              </div>
        </div>
      </div>
</div>