let elliott903_display = (function(bus, options) {
  let ledOn;
  let texture;
  let mainSurface;

  (function ctor() {
    sgxskeleton.init(576, 380);
    mainSurface = sgx.graphics.DrawSurfaceManager.get().getDisplaySurface();

    ledOn = sgx.graphics.TextureManager.get().registerScenarioTexture("res/led");

    texture = sgx.graphics.TextureManager.get().registerScenarioTexture("res/panel");

    setInterval(() => {
      render();
    }, 50);
  })();


  function drawMachine(surface) {
    surface.setFillColor(sgxColorRGBA.white);
    surface.setFillTexture(texture);
    surface.fillRect();
  }

  function drawState(surface, state) {
    //
    surface.setFillTexture(ledOn);
    drawRegisterState(surface, 123, 55, state.a)
    drawRegisterState(surface, 123, 84, state.q)
    // TODO: is SCR really 'program counter' (given PC is 12 bits, and SCR is 13)?
    let pc12 = new emf.Number(12, 2, state.scr);
    drawRegisterState(surface, 247, 280, pc12)

  }

  function drawRegisterState(surface, x, y, reg) {
    var value = reg.getUnsigned();
    for (var i = reg.getBitWidth() - 1; i >= 0; --i) {
      if (value & (1 << i)) {
        surface.fillPoint(x, y, sgx.graphics.DrawSurface.eFromTopLeft);
      }
      x += 21;
    }
  }


  function render() {
    let state = bus.elliott.getState();
    drawMachine(mainSurface);
    drawState(mainSurface, state);
  }

  return {
    render,
  }
});