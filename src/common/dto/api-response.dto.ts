import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Response' })
export class ApiResponseDto<T> {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'OK' })
  message: string;

  @ApiProperty()
  data: T;
}
