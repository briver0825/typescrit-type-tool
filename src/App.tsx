import { useEffect, useState } from 'react'
import './App.css'

import Editor from '@monaco-editor/react'

function App() {
    const [code, setCode] = useState(`{
  "id": 1190000041094311,
  "url": "/a/1190000041094311",
  "cover": "/img/bVcVZGA?spec=cover",
  "title": "TypeScript 之模块",
  "views": 2345,
  "real_unique_views": 2075,
  "comments": 0,
  "votes": 1,
  "excerpt": "TypeScript 的官方文档早已更新，但我能找到的中文文档都还停留在比较老的版本。所以对其中新增以及修订较多的一些章节进行了翻译整理。本篇翻译整理自 TypeScript Handbook 中 「Module」 章节。 本文并不严格按...",
  "user": {
    "name": "冴羽",
    "url": "/u/yayu",
    "avatar_url": "https://avatar-static.segmentfault.com/886/682/886682482-57dfb59658245_big64",
    "headdress_worn": null
  }
}`)
    const [resultCode, setResultCode] = useState('')

    const handleChange = (value: string | undefined) => {
        setCode(value!)
    }

    const transformType = (code: string) => {
        try {
            code = JSON.parse(code)
        } catch (e) {
            return ''
        }

        const patchArray: any[] = []

        Object.entries(code).map(([key, value]) => {
            patchArray.push({
                key,
                value: typeof value,
            })
        })

        const resultStr = `
interface Result {
	${patchArray
        .map((v) => {
            return `${v.key}: ${v.value}`
        })
        .join('\n  ')}
}
		`

        // return JSON.stringify(patchArray, null, '  ')
        return resultStr
    }

    useEffect(() => {
        const result = transformType(code)
        setResultCode(result)
    }, [code])

    return (
        <div className='tst-container'>
            <Editor
                defaultLanguage='json'
                defaultValue={code}
                theme='vs-dark'
                onChange={handleChange}
            />
            <div className='right'>
                <Editor
                    defaultLanguage='typescript'
                    defaultValue=''
                    theme='vs-dark'
                    value={resultCode}
                />
            </div>
        </div>
    )
}

export default App
