import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import configuration from '../config/config';
import { User } from './modules/users/entities/user.entity';
import { UserRole } from './modules/users/entities/user-role.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederService } from './modules/seeders/seeder/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([User, UserRole]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 3306) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, UserRole],
      synchronize: true,
      logging: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
