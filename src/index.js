import { create, cssomSheet } from 'twind'

// 1. Create separate CSSStyleSheet
const sheet = cssomSheet({ target: new CSSStyleSheet() })

// 2. Use that to create an own twind instance
const { tw } = create({ sheet })

const template = document.createElement("template");
template.innerHTML = /*html*/`
  <p class="${tw`invisible`}">This uses CSSStyleSheet but<br>it's not supported in Firefox.</p> 
  <button class="${tw`rounded-lg px-7 py-4 text(white 3xl) bg-green-600`}" id="dec">-</button>
  <span class="${tw`inline-block w-14 text(3xl center)`}" id="count"></span>
  <button class="${tw`rounded-lg px-7 py-4 text(white 3xl) bg-green-600`}" id="inc">+</button>`;

class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [sheet.target];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.getElementById("inc").onclick = () => this.inc();
    this.shadowRoot.getElementById("dec").onclick = () => this.dec();
    this.update(this.count);
  }

  inc() {
    this.update(++this.count);
  }

  dec() {
    this.update(--this.count);
  }

  update(count) {
    this.shadowRoot.getElementById("count").innerHTML = count;
  }
}

customElements.define("my-counter", MyCounter);
