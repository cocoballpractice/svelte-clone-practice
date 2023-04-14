<script>
  import Comment from "./Comment.svelte";

  import { onMount } from 'svelte'
  import { router, meta } from 'tinro'
  import { articleContent, comments, isLogin } from '../stores'

  const route = meta()
  const articleId = Number(route.params.id) // 형변환

  let values = {
    formDescription: ''
  }

  onMount(() => {
    // 마운트 시 게시글 단건 조회 정보 가져오기
    articleContent.getArticle(articleId)
    comments.fetchComments(articleId)
  })

  const goArticles = () => router.goto(`/articles`)

  const onAddComment = async() => {
    await comments.addComment(articleId, values.formDescription)
    values.formDescription = ''
  }

</script>

<!-- slog-comment-wrap start-->
<div class="slog-comment-wrap">    
  <!-- slog-comment-box start-->
  <div class="slog-comment-box" >
    <div class="comment-box-header ">
      <div class="content-box-header-inner-left" >
        <p class="p-user" >{$articleContent.data.title}</p>
        <p class="p-date" >{$articleContent.data.categoryName}</p>
        <p class="p-date" >{$articleContent.data.nickname}</p>
      </div>
    </div>
    
    <div class="comment-box-main ">
      <p class="whitespace-pre-line">{$articleContent.data.description}</p>
      <div class="inner-button-box ">
        <button class="button-base" on:click={goArticles}>글 목록 보기</button>
      </div>
    </div>
    
    <!--
    <div class="commnet-list-box ">
      <h1 class="comment-title">Comments(컴포넌트)</h1>
      <ul class="my-5">
        {#each $comments as comment, index}
          <Comment {comment} {articleId} />
        {/each}
      </ul>
    </div>
    -->

    <div class="commnet-list-box ">
      <h1 class="comment-title">Comments(컴포넌트)</h1>
      <ul class="my-5">
        {#each $articleContent.data.answers as answer, index }
          <Comment {answer}/>
        {/each}
      </ul>
    </div>

    {#if $isLogin}
      <div class="comment-box-bottom ">
        <textarea id="message" rows="5" class="slog-content-textarea " placeholder="내용을 입력해 주세요." bind:value={values.formDescription}></textarea>
        <div class="button-box-full">
          <button class="button-base" on:click={onAddComment}>입력</button>
        </div>
      </div>
    {/if}
  </div><!-- slog-comment-box end -->

</div><!-- slog-comment-wrap end-->