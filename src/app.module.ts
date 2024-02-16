import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './modules/room.module';
import { ProcedureModule } from './modules/procedure.module';
import { HospitalModule } from './modules/hospital.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
    }),
    RoomModule,
    ProcedureModule,
    HospitalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
