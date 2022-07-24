import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  exports: [],
  controllers: [],
})
export class ClientModule {}
