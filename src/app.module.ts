import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { AuthRoleModule } from './module/auth-role/auth-role.module';

@Module({
  imports: [UserModule, AuthRoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
