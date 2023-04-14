import { writable, get, derived } from "svelte/store";
import { getApi, postApi, putApi, delApi } from "../service/api.js";
import { router } from "tinro";


// 페이지 카운트 관련 store
function setCurrentArticlesPage() {

  const {subscribe, update, set} = writable(0) // Spring Data JPA Pageable 특성상 초기값 0

  const resetPage = () => set(0)
  const increPage = () => {
    update(data => data = data + 1)
    articles.fetchArticles() // 페이지에 맞는 글 목록 출력
  }

  return {
    subscribe,
    resetPage,
    increPage
  }

}

// 게시글 조회, 생성, 수정, 삭제 관련 store
function setArticles() {

  let initValues = {
    totalPages: 0,
    totalElements: 0,
    data : {
      content: [],
    },
    menuPopup: '',
    editMode: '',
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchArticles = async () => {
    const currentPage = get(currentArticlesPage)
    let path = `/api/v1/questions?page=${currentPage}`

    try {

      const access_token = get(auth).Authorization

      const options = {
        path: path,
        access_token: access_token
      }

      const getDatas = await getApi(options)

      const newData = {
        content: getDatas.data.content,
        totalPages: getDatas.totalPages,
      }

      update(datas => {

        if(currentPage === 1) {
          datas.data.content = newData.content
          datas.totalPages = newData.totalPages
        }
        else {
          const newContents = [...datas.data.content, ...newData.content]
          datas.data.content = newContents
          datas.totalPages = newData.totalPages
        }

        return datas
      })

    }
    catch(error) {
      throw error
    }

  }

  const resetArticles = () => {
    set({...initValues})
    currentArticlesPage.resetPage()
  }

  const addArticle = async (title, description, categoryId) => {
    const access_token = get(auth).Authorization

    try {

      const options = {
        path: "/api/v1/questions",
        data: {
          title: title,
          description: description,
          categoryId: categoryId
        },
        access_token: access_token
      }

      const newArticle = await postApi(options)
      console.log(newArticle)

      update(datas => {
        datas.data.content = [newArticle.data, ...datas.data.content]
        return datas
      })

      // 일단 임시로 artices.resetArticles() 호출, 백엔드 API 쪽 리턴값 변경 후 삭제
      articles.resetArticles()

      return

    }
    catch(error) {
      throw error
    }

  }

  // 팝업 관련
  // 선택 받은 객체의 id 값을 해당 스토어의 menuPopup에 저장
  const openMenuPopup = (id) => {
    update(datas => {
      datas.menuPopup = id
      return datas
    })
  }

  // 해당 스토어의 menuPopup 초기화
  const closeMenuPopup = () => {
    update(datas => {
      datas.menuPopup = ''
      return datas
    })
  }

  // 수정 폼 관련
  const openEditModeArticle = (id) => {
    articles.closeMenuPopup()

    // 수정된 데이터 업데이트
    update(datas => {
      datas.editMode = id
      return datas
    })
  }

  const closeEditModeArticle = () => {
    update(datas => {
      datas.editMode = ''
      return datas
    })
  }

  // 수정 기능
  const updateArticle = async(article) => {

    const access_token = get(auth).Authorization

    try {
      const updateData = {
        id: article.id,
        categoryId: article.categoryId,
        title: article.title,
        description: article.description,
      }

      const options = {
        path: `/api/v1/questions/${updateData.id}`,
        data: {
          categoryId: updateData.categoryId,
          title: updateData.title,
          description: updateData.description
        },
        access_token: access_token,
      }

      const updateArticle = await putApi(options)
      console.log(updateArticle)

      update(datas => {
        const newArticleList = datas.data.content.map(article => {
          if(article.id === updateArticle.data.id) {
            article = updateArticle.data
          }
          return article
        })
        datas.data.content = newArticleList
        return datas
      })

      articles.closeEditModeArticle()
      alert('수정 완료')
    }
    catch(error) {
      alert('수정 중에 오류가 발생하였습니다.')
    }

  }

  const deleteArticle = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/questions/${id}`,
        access_token: access_token
      }

      await delApi(options)

      update(datas => {
        const newArticleList = datas.data.content.filter(article => article.id !== id)
        datas.data.content = newArticleList
        return datas
      })

    }
    catch(error) {
      alert('삭제 중에 오류가 발생하였습니다.')
    }

  }


  return {
    subscribe,
    fetchArticles,
    resetArticles,
    addArticle,
    openMenuPopup,
    closeMenuPopup,
    openEditModeArticle,
    closeEditModeArticle,
    updateArticle,
    deleteArticle,
  }
}


function setLoadingArticle() {}


// 세부 페이지
function setArticleContent() {

  let initValues = {
    data: {
      id: '',
      uid: '',
      nickname: '',
      email: '',
      categoryName: '',
      categoryId: '',
      title: '',
      description: '',
      answers: [],
      createdAt: '',
      modifiedAt: '',
    }
  }

  const { subscribe, set } = writable({...initValues})

  const getArticle = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/questions/${id}`,
        access_token: access_token
      }

      const getData = await getApi(options)
      set(getData)

    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  return {
    subscribe,
    getArticle
  }

}


// 덧글 관련 
function setComments() {
  const { subscribe, update, set } = writable([])

  const fetchComments = async (id) => {

    const access_token = get(auth).Authorization

    try {

      const options = {
        path: `/api/v1/questions/${id}`, // API 변경 필요, /api/v1/answers/list/${question_id}
        access_token: access_token
      }

      const getDatas = await getApi(options)
      set(getDatas.comments)

    }
    catch(error) {
      alert('오류가 발생했습니다.')
    }

  }


  const addComment = async (articleId, description) => {

    const access_token = get(auth).Authorization

    try {

      const options = {
        path: '/api/v1/answers',
        data: {
          qid: articleId,
          description: description
        },
        access_token: access_token
      }

      const newData = await postApi(options)
      update(datas => [...datas, newData.data])

    }
    catch(error) {
      alert('오류가 발생했습니다.')
    }

  }

  // 원래는 삭제 기능 없으나 레퍼런스용으로 작성함
  const deleteComment = async (id) => {

    const access_token = get(auth).Authorization

    try {

      const options = {
        path: `/api/v1/answers/${id}`,
        access_token: access_token
      }

      await delApi(options)
      update(datas => datas.filter(comment => comment.id !== id))
      alert('답글이 삭제되었습니다.')

    }
    catch(error) {
      alert('오류가 발생했습니다.')
    }

  }


  return {
    subscribe,
    fetchComments,
    addComment,
    deleteComment,
  }

}


// 인증 관련 store
function setAuth() {

  let initValues = {
    uid: "",
    email: "",
    Authorization: "",
  }

  const { subscribe, set, update } = writable({ ...initValues }); // 스프레드 이용 이유 : initValues가 참조되지 않고 복제되므로

  // 사용자 정의 메서드

  // refresh_token을 통해 access_token을 요청
  const refresh = async () => {
    try {
      const authenticationUser = await postApi({path: '/api/v1/refresh'});
      set(authenticationUser);
      isRefresh.set(true)
    } catch (err) {
      auth.resetUserInfo();
      isRefresh.set(false)
    }
  };

  // 해당 스토어를 초기화
  const resetUserInfo = () => set({ ...initValues });

  const login = async (email, password) => {
    try {
      const options = {
        path: "/api/v1/login",
        data: {
          email: email,
          password: password,
        },
      };
      const result = await postApi(options);
      set(result);
      isRefresh.set(true);
      router.goto("/articles");
    } catch (error) {
      alert("오류가 발생하였습니다. 로그인을 다시 시도해주세요");
    }
  };

  const logout = async () => {};

  const register = async (email, password, nickname) => {
    try {
      const options = {
        path: "/api/v1/join",
        data: {
          email: email,
          password: password,
          nickname: nickname,
        },
      };

      await postApi(options);
      alert("회원 가입이 완료되었습니다");
      router.goto("/login");
    } catch (error) {
      alert("오류가 발생하였습니다. 로그인을 다시 시도해주세요");
    }
  };

  return {
    subscribe,
    refresh,
    login,
    logout,
    resetUserInfo,
    register,
  };
}

function setArticlesMode() {}

// 로그인 판별 store
function setIsLogin() {
  const checkLogin = derived(auth, $auth => $auth.Authorization ? true : false);
  return checkLogin;
}

export const currentArticlesPage = setCurrentArticlesPage();
export const articles = setArticles();
export const loadingArticle = setLoadingArticle();
export const articleContent = setArticleContent();
export const comments = setComments();
export const auth = setAuth();
export const articlesMode = setArticlesMode();
export const isLogin = setIsLogin();
export const isRefresh = writable(false);
