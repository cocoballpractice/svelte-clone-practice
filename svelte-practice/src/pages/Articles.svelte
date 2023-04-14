<script>
  import ArticleHeader from "../components/ArticleHeader.svelte";
  import ArticleList from "../components/ArticleList.svelte";
  import ArticleAddForm from "../components/ArticleAddForm.svelte";
  import Comments from "./Comments.svelte";
  import { isLogin } from "../stores"
  import { Route } from 'tinro'
</script>

<ArticleHeader />
<main class="slog-main">
  {#if $isLogin}
    <ArticleAddForm />
  {/if}
  <ArticleList />

  <!--/articles/comments/id-->
  <!-- 하위 라우트를 컴포넌트에 배치하는 이유는 Comments 컴포넌트가 디자인 상의 이유로 main 내부 돔 안에 있어야 하므로 -->
  <!-- 특정 컴포넌트 아래에 라우팅 된 컴포넌트가 배치되는 경우는 이러한 방식을 이용하는 것을 기억! -->
  <Route path="/comments/:id" >
    <Comments />
  </Route>
</main>
