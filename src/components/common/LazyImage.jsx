import React, { useState, useRef, useEffect } from "react"
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

// 기본은 lazy, 첫 화면 이미지는 eager 지정
const LazyImage = ({ eager = false, onLoad, src, alt, ...rest }) => {
  const [loaded, setLoaded] = useState(false)
  const [blur, setBlur] = useState("")
  const ref = useRef()

  useEffect(() => {
    let cancelled = false
    setBlur("")
    if (src) loadPlaceholders().then((map) => !cancelled && setBlur(map[src] || ""))
    // 캐시된 이미지는 onLoad가 붙기 전에 이미 완료될 수 있음
    setLoaded(!!ref.current?.complete && ref.current.naturalWidth > 0)
    return () => {
      cancelled = true
    }
  }, [src])

  return (
    <Img
      ref={ref}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      $blur={src && !loaded ? blur : ""}
      src={src || BLANK}
      alt={src ? alt : ""}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
      onError={() => setLoaded(true)}
      {...rest}
    />
  )
}

export default LazyImage

const Img = styled.img`
  background: ${(p) => (p.$blur ? `url("${p.$blur}") center / cover no-repeat` : "none")};
`
