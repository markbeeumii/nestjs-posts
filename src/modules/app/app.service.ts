import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <div style='
      margin-top:10px;
      '>
        <h1 style='
        align-item:center;
        justify-content: center;
        display:flex;'> I'm Mark A web developer</h1>
        <h3
        style='
        align-item:center;
        justify-content: center;
        display:flex;
        color: red;
        '>Start API with NestJS !</h3>
        <div 
        style='
        align-item:center;
        justify-content: center;
        display:flex;
        '>
        <img 
        src="https://res.cloudinary.com/drosy6q2y/image/upload/v1687673294/samples/nestjs_qxznxz.png" 
        width="150px"
        alt="mark">
        </div>
        
        <a 
        style='
        align-item:center;
        justify-content: center;
        display:flex;
        font-size: 19px;
        font-weight:400;
        margin-top: 40px;
        '
        href="https://t.me/phuoy_makara"> Telegram </a>
      </div>
    `;
  }
}
