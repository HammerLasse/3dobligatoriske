
export function setupCamera(app) {

    const camera = app.camera;

    // Movement settings
    const moveSpeed = 0.12;

    const keys = { w: false, a: false, s: false, d: false};

    window.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();

        if (keys.hasOwnProperty(key)) {
            keys[key] = true;
        }
    });

    window.addEventListener("keyup", (event) => {
        const key = event.key.toLowerCase();

        if (keys.hasOwnProperty(key)) {
            keys[key] = false;
        }
    });

    // Movement vectors
    const forward = new v3d.Vector3();
    const right = new v3d.Vector3();
    const movement = new v3d.Vector3();

    // Update camera every frame
    app.addEventListener("tick", () => {

        // Get camera forward direction
        camera.getWorldDirection(forward);

        // Keep movement horizontal
        forward.y = 0;
        forward.normalize();

        // Calculate right direction
        right.crossVectors(
            forward,
            new v3d.Vector3(0, 1, 0)
        ).normalize();

        movement.set(0, 0, 0);

        // WASD movement
        if (keys.w) movement.add(forward);
        if (keys.s) movement.sub(forward);

        if (keys.d) movement.add(right);
        if (keys.a) movement.sub(right);

        // Normalize diagonal movement
        if (movement.lengthSq() > 0) {
            movement.normalize();
            camera.position.addScaledVector(
                movement,
                moveSpeed
            );
        }

                if (Math.abs(scrollMovement) > 0.001) {

            camera.getWorldDirection(forward);

            camera.position.addScaledVector(
                forward,
                scrollMovement * scrollSpeed
            );

            scrollMovement = 0;
        }

    });

}
