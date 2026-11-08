import React, { useEffect, useCallback } from "react"
import styled from "styled-components"
import { Link, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { authService } from "../../fireBase"
import MenuIcon from "@material-ui/icons/Menu"
import Toggle from "./Toggle"
import { isAdmin, ADMIN_FLAG } from "utils/util"

const Header = (props) => {
  const history = useHistory()
  const { hamberger, setHamberger } = props
  const { user } = useSelector((state) => state.userReducer)
  const admin = isAdmin(user)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) {
        setHamberger(false)
      }
    }
    window.addEventListener("resize", onResize)

    return () => window.removeEventListener("resize", onResize)
  }, [])

  const onClickLogout = useCallback(() => {
    localStorage.removeItem(ADMIN_FLAG)
    authService.signOut()
    history.replace("/")
  }, [])

  return (
    <Container>
      <LogoLink to={admin ? "/admin" : "/"}>ZIOR PARK</LogoLink>
      <OpacityView hamberger={hamberger} onClick={() => setHamberger(false)} />
      <NaviView id={"navi"} hamberger={hamberger} onClick={(e) => e.stopPropagation()}>
        <AbsoluteView>
          <ToggleView hamberger={hamberger}>
            <Toggle />
          </ToggleView>
          {admin && (
            <UserView>
              <UserName>Admin</UserName>
              <LogoutButton onClick={onClickLogout}>logout</LogoutButton>
            </UserView>
          )}
        </AbsoluteView>

        <LogoLink className={history.location.pathname.includes("introduce") ? "active" : ""} to={admin ? "/admin/introduce" : "/introduce"}>
          Introduce
        </LogoLink>
        <LogoLink className={history.location.pathname.includes("photo") ? "active" : ""} to={admin ? "/admin/photos" : "/photos"}>
          Photos
        </LogoLink>
        <LogoLink className={history.location.pathname.includes("album") ? "active" : ""} to={admin ? "/admin/albums" : "/albums"}>
          Albums
        </LogoLink>
      </NaviView>

      <Hamberger
        onClick={(e) => {
          e.stopPropagation()
          setHamberger(!hamberger)
        }}
      >
        <MenuIcon />
      </Hamberger>
    </Container>
  )
}

export default Header

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;

  @media (max-width: 1024px) {
    padding: 40px 10px 0px;
  }

  @media (max-width: 768px) {
    padding: 25px 10px 0px;
  }
`
const LogoLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme.text};
  font-size: 30px;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;

  &.active {
    color: #4351af;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`
const NaviView = styled.div`
  background-color: ${(props) => props.theme.background};
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  margin-left: 30px;
  z-index: 100;
  & > a {
    color: ${(props) => props.theme.text};
    font-size: 20px;
    font-family: "Times New Roman", Times, serif;
  }
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: ${(props) => (props.hamberger ? "0" : "-999")}px;
    display: block;
    width: 250px;
    height: 100%;
    margin-left: 0;
    padding-top: 50px;
    padding-left: 10px;
    & > a {
      height: 45px;
    }
  }
  @media (max-width: 360px) {
    width: 70%;
  }
`
const OpacityView = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.hamberger ? "flex" : "none")};
  width: 100%;
  height: 100%;
  z-index: 99;
`
const AbsoluteView = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    position: initial;
    flex-direction: column;
  }
`
const ToggleView = styled.div`
  @media (max-width: 1024px) {
    position: absolute;
    top: 15px;
    right: 20px;
  }
`
const UserView = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
    padding-right: 20px;
  }
`
const UserName = styled.p`
  margin: 0 10px;
  color: ${(props) => props.theme.text};
  font-size: 14px;
  font-weight: bold;
  @media (max-width: 1024px) {
    margin: 0;
  }
`
const LogoutButton = styled.button`
  background-color: #4351af;
  padding: 2px 5px;
  color: #ffffff;
  font-size: 13px;
`
const Hamberger = styled.button`
  display: none;
  width: 30px;
  height: 30px;
  & svg {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 1024px) {
    display: block;
  }
`
