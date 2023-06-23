import * as bcrypt from 'bcrypt';

export class Hash {
  static make(password) {
    const salt = bcrypt.genSaltSync(12, 'b');
    return bcrypt.hashSync(password, salt);
  }

  static async compare(plainText, hash) {
    return bcrypt.compareSync(plainText, hash);
  }
  
}