<script lang="ts">
    import type { PageData } from './$types';
  
    export let data: PageData;
  </script>

<div class="grid h-screen place-items-center">
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Pick up a name</h2>
          <form method="POST">
            <input type="text" placeholder="Playlist name" class="input input-bordered w-full max-w-xs" name="playlistName" />

            <p class="mt-3">A playlist with the same songs will be generated but with fair order</p>

            <div class="card-actions justify-end mt-5">
                <button type="submit" class="btn btn-success">Generate playlist!</button>
              </div>
          </form>
        </div>
      </div>
</div>