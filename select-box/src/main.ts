import "./style.scss";
import SelectionArea from "@viselect/vanilla";

const app = document.querySelector<HTMLDivElement>(".container");

for (let index = 0; index < 400; index += 1) {
  app?.appendChild(document.createElement("div"));
}

const selection = new SelectionArea({
  selectables: [".container > div"],
  boundaries: [".container"],
})
  .on("start", ({ store, event }) => {
    if (!(event as MouseEvent).ctrlKey && !(event as MouseEvent).metaKey) {
      for (const el of store.stored) {
        el.classList.remove("selected");
      }

      selection.clearSelection();
    }
  })
  .on(
    "move",
    ({
      store: {
        changed: { added, removed },
      },
    }) => {
      for (const el of added) {
        el.classList.add("selected");
      }

      for (const el of removed) {
        el.classList.remove("selected");
      }
    }
  )
  .on("stop", ({ store: { stored } }) => console.log(stored.length));
