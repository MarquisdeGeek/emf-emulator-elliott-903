const elliott903_memory = (function(bus, options) {

  function read8(addr) {
    return bus.elliott.getWordAsUnsigned(addr);
  }


  function write8(addr, data, forceWrite) {
    addr = addr.getUnsigned ? addr.getUnsigned() : addr;
    addr &= 0xffff;
    data = data.getUnsigned ? data.getUnsigned() : data;
    data &= 0xff;
  }


  function read16(addr) {
    addr = addr.getUnsigned ? addr.getUnsigned() : addr;
    return read8(addr + 1) * 256 + read8(addr);
  }

  function isValidAddress(addr) {
    return bus.elliott.isValidAddress(addr);
  }

  function getAddressRanges(addr) {
    let ranges = [];
    ranges.push({
      name: 'RAM',
      start: 0,
      size: 0x2000,
      read: true,
      write: true,
      enabled: true,
      shadow: false
    });
    return ranges;
  }

  function getLabel() {
    // undefined
    return '';
  }


  return {
    isValidAddress,
    getAddressRanges,
    getLabel,
    read8,
    read16,
    write8,
    //write16,
    //enableBlock,
    //disableBlock,
  };
});