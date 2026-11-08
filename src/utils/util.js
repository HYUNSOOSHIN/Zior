import { useEffect } from "react"

export const timeForToday = (value) => {
  const today = new Date()
  const timeValue = new Date(value)

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60)
  if (betweenTime < 1) return "방금전"
  if (betweenTime < 60) {
    return `${betweenTime}분전`
  }

  const betweenTimeHour = Math.floor(betweenTime / 60)
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`
  }

  return `${timeValue.getFullYear()}.${timeValue.getMonth() + 1}.${timeValue.getDate()}`

  //   const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
  //   if (betweenTimeDay < 365) {
  //     return `${betweenTimeDay}일전`
  //   }

  //   return `${Math.floor(betweenTimeDay / 365)}년전`
}

// trim
export const trim = (text) => {
  if (typeof text != "string") return text
  return text.replace(/ /gi, "")
}

// shortcut: 관리자 비밀번호를 클라이언트에서 해시 비교함, 서버 검증이 필요해지면 Firebase Auth 계정 방식으로 되돌릴 것
export const ADMIN_FLAG = "adminUnlocked"
export const isAdmin = (user) => !!user && localStorage.getItem(ADMIN_FLAG) === "1"

// 입력한 비밀번호의 SHA-256 hex
export const sha256 = async (text) => {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

// 페이지별 document.title 설정 (클라이언트 렌더링 앱이라 라우트마다 직접 지정)
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title
  }, [title])
}
