import React from "react"
import styled from "styled-components"
import LazyImage from "../common/LazyImage"

const PhotoItem = (props) => {
  const { img, onClick } = props

  return (
    <Container onClick={onClick}>
      <div className="img-view">
        <LazyImage src={img} alt={"photo image"} />
      </div>
    </Container>
  )
}

export default PhotoItem

const Container = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 33.3%;
  height: auto;
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1) !important;
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    transform: translateY(-8px);
  }

  & > .img-view {
    position: relative;
    width: 100%;

    &::after {
      content: "";
      padding-bottom: 100%;
      display: block;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 1024px) {
    padding: 5px;
    &:hover {
      box-shadow: 0 0 0 transparent !important;
      transition: none;
      transform: none;
    }
  }

  @media (max-width: 768px) {
    padding: 3px;
  }
`
