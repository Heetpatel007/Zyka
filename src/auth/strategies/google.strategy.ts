import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  validate(...args: any[]): unknown {
    throw new Error('Method not implemented.');
  }
  // constructor(private usersService: UsersService) {
  //   super({
  //     clientID: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     callbackURL: process.env.GOOGLE_CALLBACK_URL,
  //     scope: ['email', 'profile'],
  //   });
  // }

  // async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
  //   const user = await this.usersService.findOrCreateOAuthUser(profile);
  //   done(null, user);
  // }
}
