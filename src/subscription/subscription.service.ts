import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>
  ) {
  }

  add(email: string): Promise<Subscription> {
    const subscription = new Subscription();
    subscription.email = email;
    return this.subscriptionRepository.save(subscription);
  }

  findByEmail(email: string): Promise<Subscription> {
    return this.subscriptionRepository.findOne({ email });
  }

}
