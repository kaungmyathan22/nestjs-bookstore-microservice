import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { BookDTO } from './book-dto';

function delay(ms) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'new_book' })
  newBook(book: BookDTO): string {
    delay(10000);
    const result = this.appService.newBook(book);
    if (!result) {
      return 'Book already exists';
    } else {
      return result;
    }
  }

  @MessagePattern({ cmd: 'get_book' })
  getBook(bookID: string): BookDTO {
    return this.appService.getBookByID(bookID);
  }

  @MessagePattern({ cmd: 'get_books' })
  getBooks(): BookDTO[] {
    return this.appService.getAllBooks();
  }
}
