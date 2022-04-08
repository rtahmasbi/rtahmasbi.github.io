const colorPickerUI = document.querySelector("#colorpicker-ui");
const scene = document.querySelector("a-scene");

// Check if the user has a VR headset, because this application won't work without one.
window.addEventListener('enter-vr', e => colorPickerUI.setAttribute("scale", "0.5 0.5"));
window.addEventListener('exit-vr', e => colorPickerUI.setAttribute("scale", "0 0"));

const cpSwatchBtns = document.querySelectorAll(
    "#colorpicker-container > #swatches-panel > div:not(.tool)"
);

const cpCloseBtn = document.querySelector(
    "#colorpicker-container > #swatches-panel > div.tool#close"
);

const cpDeleteBtn = document.querySelector(
    "#colorpicker-container > #swatches-panel > div.tool#delete"
);

const cpResetBtn = document.querySelector(
    "#colorpicker-container > #delete-confirmation-panel > #reset-button"
);

const cpCancelBtn = document.querySelector(
    "#colorpicker-container > #delete-confirmation-panel > #cancel-button"
);

cpSwatchBtns.forEach(swatchBtn => {
    swatchBtn.addEventListener("click", event => {
        cpSwatchBtns.forEach(el => {
            el.innerHTML = "";
            el.removeAttribute("id");
        });
        event.target.innerHTML = '<svg fill="white" style="margin: 5px" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
        event.target.setAttribute("id", "active-swatch");
    });
});

cpCloseBtn.addEventListener("click", event => {
    colorPickerUI.setAttribute(
        "animation",
        "property: scale; to: 0 0 0; dur: 750;"
    );
});

cpDeleteBtn.addEventListener("click", event => {
    document
        .querySelector("#colorpicker-container > #swatches-panel")
        .classList.add("hide-panel");
    document
        .querySelector("#colorpicker-container > #delete-confirmation-panel")
        .classList.remove("hide-panel");
});

cpCancelBtn.addEventListener("click", event => {
    document
        .querySelector("#colorpicker-container > #delete-confirmation-panel")
        .classList.add("hide-panel");
    document
        .querySelector("#colorpicker-container > #swatches-panel")
        .classList.remove("hide-panel");
});

cpResetBtn.addEventListener("click", event => {
    document.querySelectorAll(".brush-point").forEach(element => element.remove());

    document
        .querySelector("#colorpicker-container > #delete-confirmation-panel")
        .classList.add("hide-panel");
    document
        .querySelector("#colorpicker-container > #swatches-panel")
        .classList.remove("hide-panel");
});


document.addEventListener("keydown", event => {
    if (event.key !== "l") return;
  
    const scaleToValue = colorPickerUI.getAttribute("scale").x < 0.5 ? "0.5 0.5" : "0 0";
    
    colorPickerUI.setAttribute("animation", `property: scale; to: ${scaleToValue} 0; dur: 650;`);
  
  });
  
  
  