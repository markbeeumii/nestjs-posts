import *as jwt from 'jsonwebtoken'

export class JwtService{
  Sign(email : string | any , key: string, duration: string){
    return jwt.sign({email }, key , { expiresIn: duration})
  }

  async ConfirmPassword(){

  }
}