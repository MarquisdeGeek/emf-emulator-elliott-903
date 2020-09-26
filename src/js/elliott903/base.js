function resetElliott() {
  let emulatedMachine = new Elliott();
  //gVars.debugemf = new emf.debugemf();

  // Due to the size, this gets loaded at 8156
  var tape_contents = emulatedMachine.assembleCode(8156, [
    "0 ptr", // the ptr/index in B

    "loop:",
    "/4 8164", // load the next character (ptr + 8163)
    "7 halt", // if nul, exit
    "10 1", // inc the ptr
    "15 6148", // write a to teleprinter
    "8 loop", // jmp to start of loop
    "halt:",
    "8 halt", // spin here : could also use 15 7168 (return to lower iriority level)
    // 8163: ptr
    "ptr: db #0",
    // 8164: Data (Hello world!) - 12 characters
    "data:",
    "db #64", "db #93", "db #100", "db #100", "db #103", "db #24", // Hello
    "db #79", "db #103", "db #106", "db #100", "db #92", "db #38", // World.
    "db #0" //nul
  ]);
  var tape_binary = makeTape(emulatedMachine, tape_contents.data);
  /*
  	var bin = [ '%0101 100', '%0011 000', '%1000 000', '%0001 111', 
  				'%0101 100', '%1101 010', '%0111 111', '%0000 100', 
  				'%0101 100', '%0000 001', '%0000 000', '%0000 010',
  				'%0101 100', '%0000 001', '%0000 000', '%0000 101',
  				'%0101 100', '%1101 010', '%1111 111', '%0001 010',
  				'%0101 100', '%1110 011', '%0111 111', '%0000 010',
  				'%0101 100', '%1110 010', '%0111 111', '%0000 000',
  				];

  	tape_binary = []				
  	for(var i=0;i<bin.length;++i) {
  		tape_binary[i] = emf.utils.convertBinarytoDecimal(bin[i]);
  	}
  */
  let tape1 = new emf.device.PaperTape(tape_binary);
  emulatedMachine.attachTapeDevice1(tape1);
  emulatedMachine.attachTeleprinter1(new emf.device.Teleprinter("#lineprinter"));

  //	updateUI();
  //drawElliottUI();
  return emulatedMachine;
}