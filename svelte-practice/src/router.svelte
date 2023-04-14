<script>
  import { Route } from 'tinro'

  import Articles from './pages/Articles.svelte';
  import Login from './pages/Login.svelte';
  import Register from './pages/Register.svelte';
  import NotFound from './pages/notFound.svelte';
</script>

<Route path="/" redirect="/articles" />
<Route path="/articles/*"><Articles /></Route> <!-- * : /articles 외 하위 주소 라우팅도 포함된다는 표시 -->
<Route path="/login"><Login /></Route>
<Route path="/register"><Register /></Route>
<Route fallback><NotFound /></Route> <!-- 이상 페이지 접근 시 -->