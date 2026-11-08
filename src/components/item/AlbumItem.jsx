import React from "react"
import styled from "styled-components"
import LazyImage from "../common/LazyImage"

const AlbumItem = (props) => {
  const { albumItem, onClick } = props

  return (
    <Container onClick={onClick}>
      <div className="img-view">
        <LazyImage src={albumItem.imageUrl} alt={"album image"} />
      </div>
      <p>{albumItem.title}</p>
      <div>
        <p id={"artist"}>{albumItem.artist}</p>
        <p id={"releaseDate"}>{albumItem.releaseDate}</p>
      </div>
    </Container>
  )
}

export default AlbumItem

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
  text-align: left;

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
  & > p {
    overflow: hidden;
    display: -webkit-box;
    width: 100%;
    margin-top: 10px;
    font-size: 20px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: fit-content;

    & > p#artist {
      overflow: hidden;
      flex: 1;
      margin-right: 5px;
      font-size: 15px;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & > p#releaseDate {
      font-size: 15px;
    }
  }

  @media (max-width: 1024px) {
    width: 50%;
    &:hover {
      box-shadow: 0 0 0 transparent !important;
      transition: none;
      transform: none;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`
