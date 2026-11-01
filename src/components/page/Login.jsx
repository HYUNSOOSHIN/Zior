import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { setUser } from "redux/modules/user"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { authService, firebaseInstance } from "../../fireBase"
import Toggle from "../common/Toggle"
import AdminDialog from "components/dialog/AdminDialog"
import zior from "images/zior.png"

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [adminDialog, setAdminDialog] = useState(false)

  const onClickLogin = () => {
    authService
      .signInAnonymously()
      .then((data) => {
        dispatch(setUser(data.user))
      })
      .catch((err) => console.log(err))
  }

  const onClickSocilLogin = async () => {
    const provider = new firebaseInstance.default.auth.GoogleAuthProvider()

    const data = await authService.signInWithPopup(provider)
    dispatch(setUser(data.user))
  }

  const onClickAdminButton = () => {
    setAdminDialog(true)
  }

  const onClickAdminLogin = async (id, pw) => {
    await authService
      .signInWithEmailAndPassword(id, pw)
      .then((data) => {
        dispatch(setUser(data.user))
        history.replace("/admin")
      })
      .catch((error) => alert(error))
  }

  return (
    <Container>
      <AdminDialog open={adminDialog} onClose={() => setAdminDialog(false)} onClickLogin={onClickAdminLogin} />
      <AbsoluteView>
        <Toggle />
      </AbsoluteView>

      <AdminButton onClick={onClickAdminButton}>ADMIN</AdminButton>

      <InputView>
        <Title>Zior</Title>
        <Img src={zior} alt="loginImage" />
        <Button onClick={onClickLogin}>Anonymously Login</Button>
        <Button onClick={onClickSocilLogin}>
          Continue with google <FontAwesomeIcon icon={faGoogle} />
        </Button>
      </InputView>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const AbsoluteView = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
`
const AdminButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: ${(props) => props.theme.text};
  font-size: 13px;
`
const InputView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.p`
  margin-bottom: 20px;
  font-size: 35px;
  font-weight: 700;
  letter-spacing: 1.5px;
`
const Img = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
  border-radius: 3px;
`
const Button = styled.button`
  width: 300px;
  height: 35px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.border}; ;
`

export default Login
