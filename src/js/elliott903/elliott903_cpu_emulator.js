// elliott903_cpu_emulator
let elliott903_cpu_emulator = (function(bus, options) {

  function reset() {
    bus.elliott = resetElliott();
  }

  function update(how) {
    // emf.control ensures only 1 step is executed
    return step();
  }

  function step() {
    let duration = bus.elliott.step();
    return duration.useconds / 1000000;
  }

  function getState() {
    let s = bus.elliott.getState();

    return {
      registers: {
        //pc: s.scr,
        scr: s.scr,
        a: s.a,
        b: s.b,
        q: s.q,
      },
      flags: {

      },
      state: {
        priority: s.priority
      }

    }
  }

  function getRegisterValuePC() {
    return bus.elliott.getState().scr.getUnsigned();
  }

  function setState() {
    // TODO
  }

  return {
    reset,
    update,
    getState,
    setState,
    //
    getRegisterValuePC
  }
});