import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { usePageTitle } from "utils/util"
import { dbService } from "../../fireBase"
import Layout from "../common/Layout"
import LazyImage from "../common/LazyImage"

const Home = () => {
  usePageTitle("Zior")
  const [mainImage, setMainImage] = useState("")

  useEffect(() => {
    const unsubscribe = dbService.collection("main").onSnapshot((snapshot) => {
      setMainImage(snapshot.docs[0].data().mainImage)
    })

    return () => unsubscribe()
  }, [])

  return (
    <Layout>
      <MainSection>
        <LazyImage eager src={mainImage} alt={"home img"} />
      </MainSection>
    </Layout>
  )
}

export default Home

const MainSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 524px;
  height: 524px;
  margin: 0 auto;
  & > img {
    width: 524px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    width: 100%;
    & > img {
      width: 90%;
      max-width: 524px;
    }
  }
`
