<script>
  import { articles } from '../stores'

  let values = {
    formTitle: '',
    formDescription: '',
    formCategoryId: 0
  }


  const onAddArticle = async () => {

    try {
      await articles.addArticle(values.formTitle, values.formDescription, values.formCategoryId)
      onCancelAddArticle()
    }
    catch(error) {
      alert(error)
    }

  }

  const onCancelAddArticle = () => {
    values.formTitle = ''
    values.formDescription = ''
    values.formCategoryId = 0
  }

</script>

<!-- slog-addForm start -->
<div class="slog-add-content-box" >
  <div class="content-box-header ">
    <div class="flex" >
      <p>지금 여러분의 생각을 적어주세요.</p>
      <input type="text" name="title" placeholder="제목을 입력해주세요." bind:value={values.formTitle} />
      <input type="number" name="categoryId" placeholder="카테고리 번호" bind:value={values.formCategoryId} />
    </div>
  </div>
  <div class="content-box-main">
    <textarea id="message" name="description" rows="5" class="slog-content-textarea " placeholder="내용을 입력해 주세요." bind:value={values.formDescription}></textarea>
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onAddArticle}>입력</button>
      <button class="button-base" on:click={onCancelAddArticle}>취소</button>
    </div>
  </div>
</div>
<!-- slog-addForm end -->