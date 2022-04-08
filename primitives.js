AFRAME.registerPrimitive('a-grid', {
    defaultComponents: {
        geometry: {
            primitive: 'plane',
            width: 75,
            height: 75
        },
        rotation: {x: -90, y: 0, z: 0},
        material: {
            src: 'grid.png',
            repeat: '75 75'
        }
    },
    mappings: {
        width: 'geometry.width',
        height: 'geometry.height',
        src: 'material.src'
    }
});