<script lang="ts">
    import type { PageData } from './$types';
  
    export let data: PageData;
  </script>

<div class="grid h-screen place-items-center text-center">
	<div class="overflow-x-auto">
        <h1 class="text-2xl font-semibold"> Your collaborative playlists</h1>
		Select the one you want to mix
		<table class="table w-full mt-5">
			<!-- head -->
			<tbody>
				<!-- row 1 -->
                {#each data.collabPlaylists as collabPlaylist}
				<tr class="active">
					<td>{ collabPlaylist.name }</td>
                    <td><a href="/playlists/{ collabPlaylist.id }" class="btn btn-success">Fair mix</a></td>
				</tr>
                {/each}
			</tbody>
		</table>
	</div>
</div>
