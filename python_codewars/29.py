class Morse:
    @classmethod
    def encode(self, message):
        bit_str=""
        words = message.split()
        word_index = 0
        for word in words:
            word_index+=1
            letter_index = 0
            for letter in word:
                letter_index+=1
                bit_str+=Morse.alpha[letter]
                if letter_index != len(word):
                    bit_str+='000'
            if word_index != len(words):
                bit_str+='0000000'
        if len(bit_str)%32:
            padding_num = 32-len(bit_str)%32
            for i in range(padding_num):
                bit_str+='0'
        print(bit_str)
        ret = []
        for i in range(int(len(bit_str)/32)):
            #print(bit_str[i*32:(i+1)*32])
            #print(int(bit_str[i*32:(i+1)*32], 2))
            if bit_str[i*32]==1:
                ret.append(-int(bit_str[i*32+1:(i+1)*32], 2))
            else:
                ret.append(int(bit_str[i*32+1:(i+1)*32], 2))
        print(ret)
        return ret

    
    @classmethod
    def decode(self, array):
        #your code here too
        pass
    alpha={
  'A': '10111',
  'B': '111010101',
  'C': '11101011101',
  'D': '1110101',
  'E': '1',
  'F': '101011101',
  'G': '111011101',
  'H': '1010101',
  'I': '101',
  'J': '1011101110111',
  'K': '111010111',
  'L': '101110101',
  'M': '1110111',
  'N': '11101',
  'O': '11101110111',
  'P': '10111011101',
  'Q': '1110111010111',
  'R': '1011101',
  'S': '10101',
  'T': '111',
  'U': '1010111',
  'V': '101010111',
  'W': '101110111',
  'X': '11101010111',
  'Y': '1110101110111',
  'Z': '11101110101',
  '0': '1110111011101110111',
  '1': '10111011101110111',
  '2': '101011101110111',
  '3': '1010101110111',
  '4': '10101010111',
  '5': '101010101',
  '6': '11101010101',
  '7': '1110111010101',
  '8': '111011101110101',
  '9': '11101110111011101',
  '.': '10111010111010111',
  ',': '1110111010101110111',
  '?': '101011101110101',
  "'": '1011101110111011101',
  '!': '1110101110101110111',
  '/': '1110101011101',
  '(': '111010111011101',
  ')': '1110101110111010111',
  '&': '10111010101',
  ':': '11101110111010101',
  ';': '11101011101011101',
  '=': '1110101010111',
  '+': '1011101011101',
  '-': '111010101010111',
  '_': '10101110111010111',
  '"': '101110101011101',
  '$': '10101011101010111',
  '@': '10111011101011101',
  ' ': '0'}

assert(Morse.encode('HELLO WORLD')==[-1440552402,-1547992901,-1896993141,-1461059584])
assert(Morse.decode([-1440552402, -1547992901, -1896993141, -1461059584])=='HELLO WORLD')
assert(Morse.encode('EEEEEEEIE')==[-2004318070,536870912])
assert(Morse.decode([-2004318070,536870912])=='EEEEEEEIE')