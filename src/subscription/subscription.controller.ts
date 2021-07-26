import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SubscribeDto } from './dtos/subscribe.dto';
import { SuccessResponseDto } from './dtos/success-response.dto';
import { SubscriptionService } from './subscription.service';

@ApiTags('Subscription')
@Controller('api/subscription')
export class SubscriptionController {

  constructor(
    private readonly subscriptionService: SubscriptionService
  ) {
  }

  @Post('subscribe')
  async subscribeUser(@Body() body: SubscribeDto): Promise<SuccessResponseDto> {
    const existing = await this.subscriptionService.findByEmail(body.email);
    if (existing) {
      throw new BadRequestException(`${body.email} is already subscribed.`);
    } else {
      await this.subscriptionService.add(body.email);
    }
    return new SuccessResponseDto();
  }

}
