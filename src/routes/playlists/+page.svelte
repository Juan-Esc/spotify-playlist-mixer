<script lang="ts">
    import type { PageData } from './$types';
  
    export let data: PageData;
  </script>

<div class="grid h-screen place-items-center">
	<div class="overflow-x-auto">
        <h2>Your collaborative playlists</h2>
		<table class="table w-full">
			<!-- head -->
			<tbody>
				<!-- row 1 -->
                {#each data.collabPlaylists as collabPlaylist}
				<tr class="active">
					<td>{ collabPlaylist.name }</td>
                    <td><a href="/playlists/id" class="btn btn-success">Fair mix</a></td>
				</tr>
                {/each}
			</tbody>
		</table>
	</div>
</div>
