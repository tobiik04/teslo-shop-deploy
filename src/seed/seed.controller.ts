import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth, GetUser } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'
import { User } from 'src/auth/entities/user.entity'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}


  @Get()
  //@Auth(ValidRoles.superUser)
  executedSeed(
    //@GetUser() user: User
  ) {
    return this.seedService.runSeed()
  }
} 
