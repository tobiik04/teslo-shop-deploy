import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers'
import { diskStorage } from 'multer'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string) {

    const path = this.filesService.getStaticProductImage(imageName)

    res.sendFile(path)

  
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {

    if (!file) throw new BadRequestException('Make sure this file is an image')

    const secureUrl = `${file.filename}`

    return { secureUrl }
    
  }

}
