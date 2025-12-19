import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../src/user.service";
import { TokenPayload } from "../interfaces/Token-Payload-interface";

export class JwtStrategy extends PassportStrategy(Strategy){

    constructor( configService:ConfigService,
                private readonly userService:UserService
    ){
        const secret = configService.get<string>('JWT_SECRET_KEY')
        if (!secret){
            throw new Error('JWT_SECRET is not set in environment variables');
        }
        super({
            secretOrKey:secret,
            jwtFromRequest:ExtractJwt.fromExtractors([
            (request:any)=>request?.cookies?.Authentication || request.Authentication
            ])
        });
    }
    validate({userId}:TokenPayload){
      this.userService.getUser(userId)
    }
    
}