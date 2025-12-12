import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from '@infra/infra.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), InfraModule, UserModule],
})
export class AppModule {}
