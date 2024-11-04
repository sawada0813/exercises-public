customElements.define(
  "inline-circle",
  class InlineCircle extends HTMLElement {
    connectedCallback() {
      this.style.display = "inline-block";
      this.style.transform = "translateY(10%)";
      this.style.border = "solid black 1px";

      if (!this.style.width) {
        this.style.width = "0.8em";
        this.style.height = "0.8em";
      }

      if (!this.style.borderRadius) {
        this.style.borderRadius = "50%";
      }
    }

    static get observedAttributes() {
      return ["diameter", "color", "border-radius"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "diameter":
          this.style.width = newValue;
          this.style.height = newValue;
          break;
        case "color":
          this.style.backgroundColor = newValue;
          break;
        case "border-radius":
          this.style.borderRadius = newValue;
          break;
      }
    }

    get diameter() {
      return this.getAttribute("diameter");
    }
    set diameter(diameter) {
      this.setAttribute("diameter", diameter);
    }
    get color() {
      return this.getAttribute("color");
    }
    set color(color) {
      this.setAttribute("color", color);
    }
  },
);
