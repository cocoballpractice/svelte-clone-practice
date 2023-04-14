<script>
  export let article
  import { articles } from '../stores'
  
  let articleValue = {
    id: article.id,
    uid: article.uid,
    nickname: article.nickname,
    categoryId: article.categoryId,
    title: article.title,
    description: article.description
  }

  const onCloseEditModeArticle = () => {
    articles.closeEditModeArticle()
  }

  const onUpdateArticle = () => {
    articles.updateArticle(articleValue)
  }

</script>

<!-- slog-content-edit-form start-->
<div class="slog-content-box" >
  <div class="content-box-header">
    <div class="content-box-header-inner-left" >
      <p class="p-user" >{articleValue.nickname}</p>
      <div class="flex" >
        <p>지금 여러분의 생각을 적어주세요.</p>
        <input type="text" name="title" placeholder="제목을 입력해주세요." bind:value={articleValue.title} />
        <input type="number" name="categoryId" placeholder="카테고리 번호" bind:value={articleValue.categoryId} />
      </div>
    </div>
  </div>
  
  <div class="content-box-main">
    <textarea id="message" name="description" rows="5" class="slog-content-textarea " placeholder="내용을 입력해 주세요." bind:value={articleValue.description}></textarea>
  </div>
  
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onUpdateArticle}>완료</button>
      <button class="button-base" on:click={onCloseEditModeArticle}>취소</button>
    </div>
  </div>
</div>
<!-- slog-content-edit-form end-->    