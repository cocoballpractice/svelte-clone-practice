<script>
  import { onMount } from 'svelte'
  import { auth, isRefresh } from './stores'
  import Router from "./router.svelte";

  const refresh_time = 1000 * 60 * 14
  
  onMount(() => {
    const onRefresh = setInterval(() => {
      if($isRefresh) {
        auth.refresh()
      }
      else {
        clearInterval(onRefresh)
      }
    }, refresh_time)
  })

</script>

<div class="main-container">
  <Router />
</div>