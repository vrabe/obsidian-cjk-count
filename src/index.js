import { MarkdownView, Plugin, getLanguage } from "obsidian";
import { lettersRegExp } from "cjk-regex-compact";
import translation from "./i18n";

const translatedText = translation[getLanguage()] ?? translation["en"];

export default class CJKCountPlugin extends Plugin {
  #statusBarItemEl;

  async onload() {
    this.#statusBarItemEl = this.addStatusBarItem();
    this.#statusBarItemEl.setText(`0 ${translatedText.characters}`);

    this.registerEvent(
      this.app.workspace.on("file-open", () => {
        window.setTimeout(() => this.#updateCount(), 100);
      })
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

    this.#statusBarItemEl.setText(`${characterCount} ${translatedText.characters}`);
  }
}
