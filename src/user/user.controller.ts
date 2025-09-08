import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Version([VERSION_NEUTRAL, '1']) // 添加版本号装饰器
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @Version('2') // 添加版本号装饰器
  findAll2() {
    return 'This is version 2';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // 模拟非业务异常
  @Get('error')
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return this.userService.findAll();
  }

  // 模拟业务异常
  @Get('business-error')
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('参数错误');
    }
    return this.userService.findAll();
  }
}
