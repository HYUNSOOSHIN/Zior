// 빌드 전에 Firestore의 이미지 URL마다 Plaiceholder로 블러 data URL을 만들어 public/placeholders.json에 저장한다.
// 실패해도 빌드는 계속된다(이미지는 placeholder 없이 표시됨). Firestore 읽기가 공개 규칙이어야 동작한다.
import fs from "fs"
import { getPlaiceholder } from "plaiceholder"

const project = process.env.REACT_APP_PROJECT_ID
const targets = { main: "mainImage", introduce: "imageUrl", albums: "imageUrl", photos: "imageUrl" }
const out = new URL("../public/placeholders.json", import.meta.url)
const map = {}

const listUrls = async (collection, field) => {
  const urls = []
  let token = ""
  do {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents/${collection}?pageSize=300${token ? "&pageToken=" + token : ""}`
    )
    if (!res.ok) throw new Error(`${collection} ${res.status}`)
    const json = await res.json()
    for (const doc of json.documents || []) {
      const v = doc.fields?.[field]?.stringValue
      if (v) urls.push(v)
    }
    token = json.nextPageToken
  } while (token)
  return urls
}

try {
  if (!project) throw new Error("REACT_APP_PROJECT_ID 없음")
  const urls = (await Promise.all(Object.entries(targets).map(([c, f]) => listUrls(c, f)))).flat()
  await Promise.all(
    [...new Set(urls)].map(async (url) => {
      try {
        const buf = Buffer.from(await (await fetch(url)).arrayBuffer())
        map[url] = (await getPlaiceholder(buf, { size: 16 })).base64
      } catch (e) {
        console.warn("placeholder skip:", url.slice(0, 80), e.message)
      }
    })
  )
  console.log(`placeholders: ${Object.keys(map).length} generated`)
} catch (e) {
  console.warn("placeholders skipped:", e.message)
}
fs.writeFileSync(out, JSON.stringify(map))
