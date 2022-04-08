// Custom component that handles the controller trigger, which will be used for activating the paint brush.
AFRAME.registerComponent('trigger-listener', {
    init: function () {
        const scene = document.querySelector("a-scene");
        const colorPickerUI = document.querySelector("#colorpicker-ui");
        let brushPointInterval;

        this.el.addEventListener('triggerdown', () => {

            if (colorPickerUI.getAttribute("scale").x > 0.1) return;

            const colorSwatch = document.querySelector(
                "#colorpicker-container > #swatches-panel > #active-swatch"
            );

            const color = colorSwatch.style.backgroundColor || "white";

            let previousPointElement = createBrushPoint(color);

            let brushPointInterval = setInterval(() => {
                if (previousPointElement.getAttribute("position").distanceTo(this.el.getAttribute("position")) > 0.05) {
                    previousPointElement = createBrushPoint(color);
                }
            }, 30);

            this.el.addEventListener('triggerup', () => clearInterval(brushPointInterval), {once: true});
        });

        this.el.addEventListener("bbuttondown", () => {
            const scaleToValue = colorPickerUI.getAttribute("scale").x < 0.5 ? "0.5 0.5" : "0 0";

            colorPickerUI.setAttribute("animation", `property: scale; to: ${scaleToValue} 0; dur: 650;`);
        })

        const createBrushPoint = (color) => {
            const brushPoint = document.createElement("a-sphere");
            // const controllerRotation = this.el.getAttribute("rotation");
            const controllerPos = this.el.getAttribute("position");
            //brushPoint.setAttribute("geometry", "primitive: sphere");
            brushPoint.setAttribute("color", color);
            //brushPoint.setAttribute("geometry", "height: 0.05; width: 0.05");
            brushPoint.setAttribute("geometry", "radius: 0.05");
            brushPoint.setAttribute("position", controllerPos);
            brushPoint.setAttribute("class", "brush-point");
            //brushPoint.setAttribute("rotation", controllerRotation);
            scene.appendChild(brushPoint);

            return brushPoint;
        }
    },
});
