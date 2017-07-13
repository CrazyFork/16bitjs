const {
  INSTRUCTION_MAP,
  REGISTERS,

  SYSTEM_CALL_SHIFT,

  DESTINATION_SHIFT,
  SOURCE_SHIFT,
  LONG_ADDRESS_SHIFT,

  ARITHMETIC_MODE_SHIFT,
  OPERATION_SHIFT,
  BITWISE_SHIFT_SHIFT,

  OS
} = require('../../constants');

const opcodes = INSTRUCTION_MAP
  .reduce((acc, instructionName, opcode) => {
    acc[instructionName] = opcode;
    return acc;
  }, {});

const reg = REGISTERS
  .reduce((acc, registerName, bitValue) => {
    acc[registerName] = bitValue;
    return acc;
  }, {});

module.exports = {
  MOV: (args) => opcodes.MOV | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT),
  LDV: (args) => opcodes.LDV | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  LDR: (args) => opcodes.LDR | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  LDM: (args) => opcodes.LDM | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  ATH: (args) => opcodes.ATH | (reg[args[0]] << DESTINATION_SHIFT) | (reg[args[1]] << SOURCE_SHIFT) | (args[2] << OPERATION_SHIFT) | (args[3] << ARITHMETIC_MODE_SHIFT) | (args[4] << BITWISE_SHIFT_SHIFT),
  CAL: (args) => opcodes.CAL | (args[0] << LONG_ADDRESS_SHIFT),
  JLT: (args) => opcodes.JLT | (reg[args[0]] << DESTINATION_SHIFT) | (args[1] << LONG_ADDRESS_SHIFT),
  RET: () => opcodes.RET,
  PSH: (args) => opcodes.PSH | (reg[args[0]] << SOURCE_SHIFT),
  POP: (args) => opcodes.POP | (reg[args[0]] << DESTINATION_SHIFT),
  SYS: (args) => opcodes.SYS | (args[0] << SYSTEM_CALL_SHIFT) | (reg[args[1]] << OS.REGISTER_SHIFT) | (args[2] << OS.MODE_SHIFT),
  HLT: () => opcodes.HLT
};