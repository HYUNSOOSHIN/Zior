import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { usePageTitle } from "utils/util"
import { dbService } from "../../../fireBase"
import Layout from "../../common/Layout"
import LazyImage from "../../common/LazyImage"
import LyricsDialog from "../../dialog/LyricsDialog"
import { IconButton } from "@material-ui/core"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import YouTubeIcon from "@material-ui/icons/YouTube"

const Album = (props) => {
  usePageTitle("앨범 | Zior")
  const history = useHistory()
  const { albumSeq } = props.match.params
  const [album, setAlbum] = useState({})
  const [trackList, setTrackList] = useState([])
  const [lyricsDialog, setLyricsDialog] = useState({ open: false, track: {} })

  useEffect(() => {
    let cancelled = false
    const initData = async () => {
      const pro1 = dbService.collection("albums").doc(albumSeq).get()
      const pro2 = dbService.collection("tracks").where("albumSeq", "==", albumSeq).get()
      Promise.all([pro1, pro2]).then((res) => {
        if (cancelled) return
        setAlbum(res[0].data())
        setTrackList(res[1].docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }

    initData()

    return () => {
      cancelled = true
    }
  }, [albumSeq])

  return (
    <Layout>
      <LyricsDialog open={lyricsDialog.open} onClose={() => setLyricsDialog({ open: false, track: {} })} track={lyricsDialog.track} />
      <Section>
        <div className="img-view">
          <LazyImage eager src={album.imageUrl} alt={"앨범 이미지"} />
        </div>
        <UL>
          <LI>
            <p>NO.</p>
            <p>TITLE</p>
            <p>LYRICS</p>
            <p>MV</p>
          </LI>

          {trackList
            .sort((a, b) => a.trackNo - b.trackNo)
            .map((i, idx) => (
              <LI key={idx}>
                <p>{idx + 1}</p>
                <p>{i.title}</p>
                <p>
                  {i.lyrics === "" ? null : (
                    <IconButton style={{ padding: "0px", borderRadius: "0px" }} onClick={() => setLyricsDialog({ open: true, track: i })}>
                      <LibraryBooksIcon />
                    </IconButton>
                  )}
                </p>
                <p>
                  {i.mv === "" ? null : (
                    <IconButton style={{ padding: "0px", borderRadius: "0px" }} onClick={() => history.push(`/albums/${albumSeq}/${i.id}`)}>
                      <YouTubeIcon />
                    </IconButton>
                  )}
                </p>
              </LI>
            ))}
        </UL>
      </Section>
    </Layout>
  )
}

export default Album

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > .img-view {
    position: relative;
    width: 524px;

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
  & svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    & > .img-view {
      width: 90%;
      max-width: 524px;
    }
    & svg {
      width: 20px;
      height: 20px;
    }
  }
`
const UL = styled.ul`
  width: 524px;
  height: fit-content;
  margin-top: 20px;
  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 524px;
  }
`
const LI = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  & > p {
    width: 50px;
    padding: 0;
    font-size: 15px;
    text-align: center;
    &:nth-child(2) {
      flex: 1;
      font-size: 15px;
      text-align: left;
    }
  }
`
