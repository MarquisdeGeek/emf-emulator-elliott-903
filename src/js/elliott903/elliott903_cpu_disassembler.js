let elliott903_cpu_disassemble = (function(bus, options) {

  var DisassembleZ80 = DisassembleZ80 || {};

  var pc;

  function disassemble(addr) {
    return bus.elliott.disassemble(addr.getUnsigned ? addr.getUnsigned() : addr);
  }



  return {
    disassemble,
  }
});