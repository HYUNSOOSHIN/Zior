import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { dbService } from "../../fireBase"
import { usePageTitle } from "utils/util"
import Layout from "../common/Layout"
import LazyImage from "../common/LazyImage"
import instagram from "./../../images/instagram.png"
import tiktok from "./../../images/tiktok.png"
import youtube from "./../../images/youtube.png"
import soundcloud from "./../../images/soundcloud.png"

const Introduce = () => {
  const [profileInfo, setProfileInfo] = useState({})
  usePageTitle("소개 | Zior")

  useEffect(() => {
    const unsubscribe = dbService.collection("introduce").onSnapshot((snapshot) => {
      setProfileInfo(snapshot.docs[0].data())
    })

    return () => unsubscribe()
  }, [])

  return (
    <Layout>
      {/* 프로필 이미지 */}
      <ProfileImgSection>
        <LazyImage eager src={profileInfo.imageUrl} alt={"profile img"} />
      </ProfileImgSection>
      {/* 프로필 */}
      <ProfileSection>
        <Title>PROFILE</Title>
        <ContentBox>
          <div className={"profile"}>
            <p>Name</p>
            <p>{profileInfo.name}</p>
          </div>
          <div className={"profile"}>
            <p>Nationality</p>
            <p>{profileInfo.nationality}</p>
          </div>
          <div className={"profile"}>
            <p>Date of birth</p>
            <p>{profileInfo.birth}</p>
          </div>
          <div className={"profile"}>
            <p>Debut</p>
            <p>{profileInfo.debut}</p>
          </div>
          <div className={"profile"}>
            <p>Crew</p>
            <p>{profileInfo.crew}</p>
          </div>
          <div className={"profile"}>
            <p>Label</p>
            <p>{profileInfo.label}</p>
          </div>
        </ContentBox>
      </ProfileSection>
      {/* SNS */}
      <SNSSection>
        <Title>SNS</Title>
        <ContentBox>
          <div className={"sns"}>
            <a target={"_blank"} rel={"noreferrer"} href={profileInfo.instaUrl}>
              <img src={instagram} alt={"instagram logo"} />
            </a>
            <a target={"_blank"} rel={"noreferrer"} href={profileInfo.tiktokUrl}>
              <img src={tiktok} alt={"soundcloud logo"} />
            </a>
            <a target={"_blank"} rel={"noreferrer"} href={profileInfo.youtubeUrl}>
              <img src={youtube} alt={"youtube logo"} />
            </a>
            <a target={"_blank"} rel={"noreferrer"} href={profileInfo.soundcloudUrl}>
              <img src={soundcloud} alt={"soundcloud logo"} />
            </a>
          </div>
        </ContentBox>
      </SNSSection>
    </Layout>
  )
}

export default Introduce

const ProfileImgSection = styled.section`
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
  @media (max-width: 768px) {
    width: 100%;
    & > img {
      width: 90%;
      max-width: 524px;
    }
  }
`
const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
const SNSSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
const Title = styled.p`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`

const ContentBox = styled.div`
  width: 350px;
  height: fit-content;
  margin-top: 20px;
  & > div.profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    & > p {
      flex: 1;
      font-size: 18px;
    }
  }
  & > div.sns {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    & > a {
      padding: 5px;
      & > img {
        width: 40px;
        object-fit: cover;
      }
    }
  }
  @media (max-width: 768px) {
    width: 90%;
    max-width: 350px;
    & > div.profile > p {
      font-size: 14px;
    }
  }
`
