import './style.css'
import { setupEditor } from './view.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h3>This is is first ProseMirror</h3>
  <div id="editorContainer"/>
  </div>
`

setupEditor(document.querySelector("#editorContainer"))
