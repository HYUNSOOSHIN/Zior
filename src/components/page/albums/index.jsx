import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { dbService } from "../../../fireBase"
import { usePageTitle } from "utils/util"
import Layout from "../../common/Layout"
import AlbumItem from "../../item/AlbumItem"

const Albums = () => {
  usePageTitle("앨범 | Zior")
  const history = useHistory()
  const [albumList, setAlbumList] = useState([])

  useEffect(() => {
    const unsubscribe = dbService.collection("albums").onSnapshot((snapshot) => {
      setAlbumList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return () => unsubscribe()
  }, [])

  return (
    <Layout>
      <Section>
        {albumList
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((albumItem, albumIndex) => (
            <AlbumItem key={albumIndex} albumItem={albumItem} onClick={() => history.push(`/albums/${albumItem.id}`)} />
          ))}
      </Section>
    </Layout>
  )
}

export default Albums

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
`
