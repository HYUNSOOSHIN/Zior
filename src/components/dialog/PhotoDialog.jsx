import React from "react"
import styled from "styled-components"
import LazyImage from "../common/LazyImage"

export default function PhotoDialog(props) {
  const { open, onClose, img } = props

  return (
    <Backdrop open={open} onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <LazyImage eager src={img} alt="사진" />
      </Container>
    </Backdrop>
  )
}

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
`

const Container = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.background};
  width: 768px;
  border-radius: 6px;

  &::after {
    content: "";
    padding-bottom: 100%;
    display: block;
  }

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    width: 90%;
    /* max-width: 524px; */
  }
`
