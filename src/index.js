import { MarkdownView, Plugin } from "obsidian";
import { lettersRegExp } from "cjk-regex-compact";

export default class CJKCountPlugin extends Plugin {
  #statusBarItemEl;

  async onload() {
    this.#statusBarItemEl = this.addStatusBarItem();
    this.#statusBarItemEl.setText("0 字");

    this.registerEvent(
      this.app.workspace.on("file-open", () => setTimeout(() => this.#updateCount(), 100))
    );

    this.registerEvent(this.app.workspace.on("editor-change", () => this.#updateCount()));

    this.#updateCount();
  }

  #updateCount() {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    let characterCount = 0;

    if (activeView) {
      const content = activeView.editor.getValue();
      const characters = content.match(lettersRegExp("g"));
      characterCount = characters ? characters.length : 0;
    }

    this.#statusBarItemEl.setText(`${characterCount} 字`);
  }
}
