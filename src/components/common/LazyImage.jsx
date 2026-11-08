import React, { useState, useEffect } from "react"
import styled from "styled-components"

// 빌드 시 scripts/generate-placeholders.mjs(Plaiceholder)가 만든 { 이미지URL: 블러 data URL } 맵. 없으면 placeholder 없이 표시.
let placeholders
const loadPlaceholders = () => {
  if (!placeholders) {
    placeholders = fetch(`${process.env.PUBLIC_URL}/placeholders.json`)
      .then((res) => (res.ok ? res.json() : {}))
      .catch(() => ({}))
  }
  return placeholders
}

// src가 아직 없을 때(데이터 로딩 중)도 자리를 유지하도록 투명 1px 이미지를 둔다
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

// 블러는 원본이 위에 덮일 때까지 배경으로 유지한다(로드 시점에 제거하면 깜빡임). 기본은 lazy, 첫 화면 이미지는 eager 지정
const LazyImage = ({ eager = false, src, alt, ...rest }) => {
  const [blur, setBlur] = useState("")

  useEffect(() => {
    let cancelled = false
    setBlur("")
    if (src) loadPlaceholders().then((map) => !cancelled && setBlur(map[src] || ""))
    return () => {
      cancelled = true
    }
  }, [src])

  return <Img loading={eager ? "eager" : "lazy"} $blur={src ? blur : ""} src={src || BLANK} alt={src ? alt : ""} {...rest} />
}

export default LazyImage

const Img = styled.img`
  background: ${(p) => (p.$blur ? `url("${p.$blur}") center / cover no-repeat` : "none")};
`
