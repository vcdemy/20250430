// 初始化 WorldWind
window.onload = function() {
    // 創建 WorldWindow
    const wwd = new WorldWind.WorldWindow("globe");

    // 添加圖層
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

    // 添加大氣層
    const atmosphereLayer = new WorldWind.AtmosphereLayer();
    wwd.addLayer(atmosphereLayer);

    // 設置初始視角
    wwd.navigator.lookAtLocation.latitude = 0;
    wwd.navigator.lookAtLocation.longitude = 0;
    wwd.navigator.range = 40e6;
    wwd.redraw();

    // 重置視角按鈕
    document.getElementById('resetView').addEventListener('click', function() {
        wwd.navigator.lookAtLocation.latitude = 0;
        wwd.navigator.lookAtLocation.longitude = 0;
        wwd.navigator.range = 40e6;
        wwd.redraw();
    });

    // 切換大氣層按鈕
    document.getElementById('toggleAtmosphere').addEventListener('click', function() {
        atmosphereLayer.enabled = !atmosphereLayer.enabled;
        wwd.redraw();
    });

    // 添加滑鼠控制
    wwd.addEventListener('mousedown', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        const pickList = wwd.pick(wwd.canvasCoordinates(x, y));
        if (pickList.objects.length > 0) {
            const pickedObject = pickList.objects[0];
            if (pickedObject.isTerrain) {
                const position = pickedObject.position;
                wwd.navigator.lookAtLocation.latitude = position.latitude;
                wwd.navigator.lookAtLocation.longitude = position.longitude;
                wwd.redraw();
            }
        }
    });

    // 添加縮放控制
    wwd.addEventListener('wheel', function(event) {
        const delta = event.deltaY;
        if (delta > 0) {
            wwd.navigator.range *= 1.1;
        } else {
            wwd.navigator.range /= 1.1;
        }
        wwd.redraw();
    });
}; 