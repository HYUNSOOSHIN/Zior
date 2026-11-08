import React, { useState } from "react"
import styled from "styled-components"
import { usePageTitle, sha256, ADMIN_FLAG } from "utils/util"
import { authService } from "../../../fireBase"
import Toggle from "../../common/Toggle"

// /admin 접근 시 비밀번호 입력 화면. 이메일은 환경변수로 고정하고 비밀번호만 입력받는다.
const AdminLogin = () => {
  const [pw, setPw] = useState("")
  usePageTitle("Admin")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!pw) return setError("비밀번호를 입력해주세요.")
    setLoading(true)
    setError("")
    try {
      if ((await sha256(pw)) !== process.env.REACT_APP_ADMIN_PW_HASH) throw new Error("invalid")
      localStorage.setItem(ADMIN_FLAG, "1")
      await authService.signInAnonymously() // 쓰기 규칙(로그인 필요) 통과용
      window.location.reload()
    } catch (err) {
      setError("비밀번호가 올바르지 않습니다.")
      setLoading(false)
    }
  }

  return (
    <Container>
      <AbsoluteView>
        <Toggle />
      </AbsoluteView>
      <Form onSubmit={onSubmit}>
        <Title>ADMIN</Title>
        <Input type="password" placeholder="PASSWORD" autoFocus autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} />
        {error && <Error role="alert">{error}</Error>}
        <Button type="submit" disabled={loading}>
          {loading ? "..." : "LOGIN"}
        </Button>
      </Form>
    </Container>
  )
}

export default AdminLogin

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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`
const Title = styled.p`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-align: center;
`
const Input = styled.input`
  height: 40px;
  margin-bottom: 10px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.border};
`
const Error = styled.p`
  margin-bottom: 10px;
  color: #d93025;
  font-size: 13px;
`
const Button = styled.button`
  background-color: #4351af;
  height: 40px;
  color: #ffffff;
  font-size: 18px;
`
