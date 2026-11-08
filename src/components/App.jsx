import React, { useState, useEffect, lazy, Suspense } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { authService } from "../fireBase"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "redux/modules/user"
import { isAdmin } from "utils/util"
import { ThemeProvider } from "styled-components"
import { darkTheme, whiteTheme } from "utils/theme"
import { GlobalStyle } from "./styled/GlobalStyle"
// 사용자 페이지
const Home = lazy(() => import("./page/Home"))
const Introduce = lazy(() => import("./page/Introduce"))
const Photos = lazy(() => import("./page/photos"))
const Albums = lazy(() => import("./page/albums"))
const Album = lazy(() => import("./page/albums/Album"))
const MV = lazy(() => import("./page/albums/MV"))
// 관리자 페이지
const Admin = lazy(() => import("./page/admin"))
const AdminIntroduce = lazy(() => import("./page/admin/introduce"))
const AdminPhotos = lazy(() => import("./page/admin/photos"))
const AdminAlbums = lazy(() => import("./page/admin/albums"))
const AdminAlbumAdd = lazy(() => import("./page/admin/albums/Add"))
const AdminAlbumEdit = lazy(() => import("./page/admin/albums/Edit"))
const AdminLogin = lazy(() => import("./page/admin/Login"))

function App() {
  const dispatch = useDispatch()
  const { darkmode } = useSelector((state) => state.configReducer)
  const { user } = useSelector((state) => state.userReducer)
  const [init, setInit] = useState(false)

  useEffect(() => {
    // 관리자 로그인/로그아웃 감지 (일반 방문자는 로그인 없음)
    const unsubscribe = authService.onAuthStateChanged((user) => {
      dispatch(setUser(user ? { uid: user.uid } : {}))
      setInit(true)
    })

    return () => unsubscribe()
  }, [])

  return (
    init && (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ThemeProvider theme={darkmode ? darkTheme : whiteTheme}>
          <GlobalStyle />
          <Suspense fallback={null}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/introduce" component={Introduce} />
              <Route path="/photos" component={Photos} />
              <Route path="/albums/:albumSeq/:trackSeq" component={MV} />
              <Route path="/albums/:albumSeq" component={Album} />
              <Route path="/albums" component={Albums} />

              {/* 관리자: 비밀번호 입력 후에만 진입 */}
              {isAdmin(user) ? (
                <Route path="/admin">
                  <Switch>
                    <Route exact path="/admin" component={Admin} />
                    <Route path="/admin/introduce" component={AdminIntroduce} />
                    <Route path="/admin/photos" component={AdminPhotos} />
                    <Route path="/admin/albums" component={AdminAlbums} />
                    <Route path="/admin/album/add" component={AdminAlbumAdd} />
                    <Route path="/admin/album/edit/:albumSeq" component={AdminAlbumEdit} />
                    <Redirect to="/" />
                  </Switch>
                </Route>
              ) : (
                <Route path="/admin" component={AdminLogin} />
              )}

              <Redirect to="/" />
            </Switch>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    )
  )
}

export default App
