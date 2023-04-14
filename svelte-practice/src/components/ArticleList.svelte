<script>
  import { onMount } from 'svelte'
  import { articles, comments, currentArticlesPage } from '../stores'
  import Article from './Article.svelte';
  import ArticleLoading from './ArticleLoading.svelte';

  let component
  let element

  onMount(() => {
    articles.resetArticles()
    articles.fetchArticles()
  })

</script>

<div class="slog-list-wrap" bind:this={component} ></div>
  <ul class="slog-ul">
    {#each $articles.data.content as article, index}
      <li class="mb-5">
        <Article {article}/>
      </li>
    {/each}
  </ul>