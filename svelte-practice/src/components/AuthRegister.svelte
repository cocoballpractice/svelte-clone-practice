<script>
  import { auth } from '../stores'

  let values = {
    formEmail: '',
    formNickname: '',
    formPassword: '',
    formPasswordConfirm: '',
  }

  const onRegister = async() => {
    try {
      await auth.register(values.formEmail, values.formPassword, values.formNickname)
    }
    catch(error) {
      alert('회원 가입에 실패했습니다. 다시 시도해주세요')
    }
  }
</script>

<!-- register-box start-->
<div class="auth-content-box" >        
  <div class="auth-box-main">
    <div class="auth-input-box">
      <input type="email" name="floating_email" id="floating_email" class="auth-input-text peer" placeholder=" " 
      bind:value={values.formEmail} />
      <label for="floating_email" class="auth-input-label">이메일</label>
    </div>
    <div class="auth-input-box">
      <input type="text" name="floating_email" id="floating_email" class="auth-input-text peer" placeholder=" " 
      bind:value={values.formNickname} />
      <label for="floating_email" class="auth-input-label">닉네임</label>
    </div>           
    <div class="auth-input-box">
      <input type="password" name="floating_email" id="floating_email" class="auth-input-text peer" placeholder=" "
      bind:value={values.formPassword} />
      <label for="floating_email" class="auth-input-label">비밀번호</label>
    </div>      
    <div class="auth-input-box">
      <input type="password" name="floating_email" id="floating_email" class="auth-input-text peer" placeholder=" "
      bind:value={values.formPasswordConfirm} />
      <label for="floating_email" class="auth-input-label">비밀번호 확인</label>
    </div>                              
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onRegister}>회원가입</button>
    </div>
  </div>
</div>
<!-- register-box end-->